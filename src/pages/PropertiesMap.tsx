import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LoadingSpinner from "@/components/property/LoadingSpinner";
import { ArrowUpRight, Layers, LocateFixed, Maximize2, Minimize2, Minus, Plus } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
import apartmentImage from "@/assets/photos/fallback-property.webp";
import { Property } from "@/types/property";

// Price-pill marker: the home's price in a small white pill that turns solid
// black when the home is hovered in the list or its popup is open. Styles
// live in index.css (.voi-price-pin).
const compactPrice = (n: number) =>
  "$" + new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 }).format(n);

const priceIcon = (price: number, active: boolean) =>
  L.divIcon({
    className: `voi-price-pin${active ? " is-active" : ""}`,
    html: `<span>${compactPrice(price)}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -44],
  });

// Basemap styles. Light and dark are OpenFreeMap vector styles (free, no API
// key) drawn by MapLibre inside Leaflet, so streets and labels stay sharp at
// every zoom. Satellite is Esri imagery with Esri's place-name overlay.
type MapStyle = "light" | "dark" | "satellite";
const OSM_ATTR = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';
const VECTOR_STYLES: Record<Exclude<MapStyle, "satellite">, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};
const MAP_STYLES: Record<MapStyle, true> = { light: true, dark: true, satellite: true };

// Adds the MapLibre vector basemap as a Leaflet layer and swaps its style
// when the user switches between light and dark.
const VectorBasemap = ({ style }: { style: Exclude<MapStyle, "satellite"> }) => {
  const map = useMap();
  const layerRef = useRef<L.MaplibreGL | null>(null);

  useEffect(() => {
    const layer = L.maplibreGL({ style: VECTOR_STYLES[style], attribution: OSM_ATTR } as L.LeafletMaplibreGLOptions);
    layer.addTo(map);
    layerRef.current = layer;
    return () => {
      map.removeLayer(layer);
      layerRef.current = null;
    };
    // Create once; style changes are applied below without rebuilding the GL context.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    layerRef.current?.getMaplibreMap()?.setStyle(VECTOR_STYLES[style]);
  }, [style]);

  return null;
};

const STYLE_KEY = "voi-map-style";

const groupIcon = (label: string) =>
  L.divIcon({
    className: "voi-price-pin voi-price-pin--group",
    html: `<span>${label}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

// Markers whose pills would overlap at the current zoom merge into one
// "2 homes" pill; clicking it zooms in until they separate. Grouping uses
// layer pixels, so it only needs recomputing when the zoom changes.
interface MarkerLayerProps {
  items: Property[];
  activeId: string | null;
  setActiveId: (id: string) => void;
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>;
  pendingOpen: string | null;
  clearPendingOpen: () => void;
  groupLabel: (count: number) => string;
  renderPopup: (p: Property) => ReactNode;
}

const MarkerLayer = ({
  items,
  activeId,
  setActiveId,
  markerRefs,
  pendingOpen,
  clearPendingOpen,
  groupLabel,
  renderPopup,
}: MarkerLayerProps) => {
  const map = useMap();
  const [groups, setGroups] = useState<Property[][]>([]);

  const regroup = useCallback(() => {
    const placed: { pt: L.Point; members: Property[] }[] = [];
    for (const p of items) {
      const pt = map.latLngToLayerPoint([Number(p.latitude), Number(p.longitude)]);
      const hit = placed.find((g) => Math.abs(g.pt.x - pt.x) < 78 && Math.abs(g.pt.y - pt.y) < 36);
      if (hit) hit.members.push(p);
      else placed.push({ pt, members: [p] });
    }
    setGroups(placed.map((g) => g.members));
  }, [items, map]);

  useEffect(regroup, [regroup]);
  useMapEvents({ zoomend: regroup });

  // A list click flies to a home; once it is its own marker again, open it.
  useEffect(() => {
    if (!pendingOpen) return;
    const marker = markerRefs.current[pendingOpen];
    if (marker) {
      marker.openPopup();
      clearPendingOpen();
    }
  }, [groups, pendingOpen, markerRefs, clearPendingOpen]);

  return (
    <>
      {groups.map((members) => {
        if (members.length > 1) {
          const bounds = L.latLngBounds(members.map((m) => [Number(m.latitude), Number(m.longitude)]));
          return (
            <Marker
              key={members.map((m) => m.id).join("|")}
              position={bounds.getCenter()}
              icon={groupIcon(groupLabel(members.length))}
              eventHandlers={{
                click: () => map.fitBounds(bounds, { padding: [90, 90], maxZoom: 15 }),
              }}
            />
          );
        }
        const p = members[0];
        return (
          <Marker
            key={p.id}
            position={[Number(p.latitude), Number(p.longitude)]}
            icon={priceIcon(p.price, activeId === p.id)}
            zIndexOffset={activeId === p.id ? 1000 : 0}
            ref={(m) => {
              markerRefs.current[p.id] = m;
            }}
            eventHandlers={{
              mouseover: () => setActiveId(p.id),
              popupopen: () => setActiveId(p.id),
            }}
          >
            <Popup className="voi-popup" autoPanPadding={[40, 40]}>
              {renderPopup(p)}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

interface FitBoundsProps {
  positions: [number, number][];
}

const FitBounds = ({ positions }: FitBoundsProps) => {
  const map = useMap();
  useEffect(() => {
    if (!positions.length) return;
    if (positions.length === 1) {
      map.setView(positions[0], 12);
      return;
    }
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
  }, [positions, map]);
  return null;
};

const PropertiesMap = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { properties, loading } = useProperties();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingOpen, setPendingOpen] = useState<string | null>(null);
  const clearPendingOpen = useCallback(() => setPendingOpen(null), []);
  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const [mapStyle, setMapStyle] = useState<MapStyle>(() => {
    try {
      const saved = localStorage.getItem(STYLE_KEY) as MapStyle | null;
      return saved && saved in MAP_STYLES ? saved : "light";
    } catch {
      return "light";
    }
  });
  const chooseStyle = (style: MapStyle) => {
    setMapStyle(style);
    try {
      localStorage.setItem(STYLE_KEY, style);
    } catch {
      /* storage unavailable - style just won't persist */
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Invalidate Leaflet size when toggling fullscreen so tiles fill the container
    const t = setTimeout(() => mapRef.current?.invalidateSize(), 350);
    document.body.style.overflow = isExpanded ? "hidden" : "";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const withCoords = useMemo(
    () =>
      properties.filter(
        (p) =>
          p.latitude != null &&
          p.longitude != null &&
          !isNaN(Number(p.latitude)) &&
          !isNaN(Number(p.longitude))
      ),
    [properties]
  );

  const positions = useMemo<[number, number][]>(
    () => withCoords.map((p) => [Number(p.latitude), Number(p.longitude)]),
    [withCoords]
  );

  // Default center (Istanbul) when no markers
  const defaultCenter: [number, number] = [41.0082, 28.9784];

  const focus = (p: Property) => {
    if (!mapRef.current) return;
    setActiveId(p.id);
    mapRef.current.flyTo([Number(p.latitude), Number(p.longitude)], 14, { duration: 1.1 });
    mapRef.current.once("moveend", () => setPendingOpen(p.id));
  };

  const zoom = (delta: number) => mapRef.current?.setZoom(mapRef.current.getZoom() + delta);

  const recenter = () => {
    const map = mapRef.current;
    if (!map || !positions.length) return;
    map.closePopup();
    if (positions.length === 1) map.flyTo(positions[0], 12, { duration: 0.9 });
    else map.flyToBounds(L.latLngBounds(positions), { padding: [50, 50], maxZoom: 13, duration: 0.9 });
  };

  const styleLabels: Record<MapStyle, string> = {
    light: t("propertiesMap.styleLight", "Map"),
    dark: t("propertiesMap.styleDark", "Dark"),
    satellite: t("propertiesMap.styleSatellite", "Satellite"),
  };

  const glass =
    "bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.25)] text-[#1b1a18]";
  const controlBtn =
    "h-10 w-10 flex items-center justify-center hover:bg-black/[0.06] transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Map of Our Homes in Istanbul & Bodrum"
        description="See where each Voi Home property sits in Istanbul and Bodrum: its street, its neighborhood, its distance to the water."
        path="/properties-map"
      />
      <Header />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div className="max-w-xl">
              <div className="text-xs font-medium uppercase tracking-[1.5px] mb-4 text-muted-foreground">
                {t("properties.title")}
              </div>
              <h1
                className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-3 text-foreground ${
                  isRTL ? "font-arabic" : "font-serif"
                }`}
              >
                {t("propertiesMap.title", "The map")}
              </h1>
              <p className="text-base leading-[1.7] text-muted-foreground">
                {t(
                  "propertiesMap.subtitle",
                  "Where each home sits: its street, its neighbors, its distance to the water. Select a pin to step inside."
                )}
              </p>
            </div>
            {!loading && withCoords.length > 0 && (
              <div className="text-sm text-muted-foreground tabular-nums">
                {withCoords.length} {t("propertiesMap.listings", "Listings").toLowerCase()}
              </div>
            )}
          </div>

          {loading ? (
            <LoadingSpinner message={t("properties.loading", "Loading properties...")} />
          ) : (
            <div className={isExpanded ? "" : "grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8"}>
              {/* List - hovering a home highlights its marker; clicking flies to it */}
              <aside
                className={`${isExpanded ? "hidden" : ""} order-2 lg:order-1 lg:max-h-[calc(100vh-240px)] lg:min-h-[560px] lg:overflow-y-auto lg:pe-2`}
              >
                {withCoords.length === 0 ? (
                  <p className="text-sm py-8 text-muted-foreground">
                    {t("propertiesMap.noProperties", "No properties with location data.")}
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {withCoords.map((p) => {
                      const active = activeId === p.id;
                      return (
                        <li
                          key={p.id}
                          onMouseEnter={() => setActiveId(p.id)}
                          onClick={() => focus(p)}
                          className={`group cursor-pointer rounded-[18px] p-3 flex gap-4 transition-colors ${
                            active ? "bg-card shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : "hover:bg-card"
                          }`}
                        >
                          <div className="h-[88px] w-[112px] shrink-0 rounded-xl overflow-hidden bg-muted">
                            <OptimizedImage
                              src={p.images?.[0] || apartmentImage}
                              alt={p.title}
                              containerClassName="w-full h-full"
                            />
                          </div>
                          <div className="min-w-0 flex-1 flex flex-col justify-center">
                            <div className="text-[11px] font-medium uppercase tracking-[1.2px] text-muted-foreground mb-1.5 line-clamp-1">
                              {p.district || p.location}
                            </div>
                            <h3
                              className={`text-[17px] leading-[1.25] text-foreground line-clamp-2 mb-1.5 ${
                                isRTL ? "font-arabic" : "font-serif"
                              }`}
                            >
                              {getTranslatedContent(p, "title", i18n.language)}
                            </h3>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium text-foreground tabular-nums">
                                ${p.price.toLocaleString()}
                              </span>
                              <Link
                                to={`/property/${p.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                              >
                                {t("propertiesMap.view", "View")}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </aside>

              {/* Map */}
              <div
                dir="ltr"
                data-style={mapStyle}
                className={`voi-map order-1 lg:order-2 [&_.leaflet-pane]:!z-[1] [&_.leaflet-top]:!z-[2] [&_.leaflet-bottom]:!z-[2] [&_.leaflet-control]:!z-[2] ${
                  isExpanded
                    ? "fixed inset-0 w-screen h-screen z-[9999]"
                    : "relative w-full h-[60vh] lg:h-[calc(100vh-240px)] min-h-[460px] lg:min-h-[560px] rounded-[20px] overflow-hidden isolate z-0"
                }`}
              >
                {/* Count chip, top-left */}
                <div className={`absolute top-4 left-4 z-[3] rounded-full px-3.5 h-10 flex items-center gap-2 text-sm font-medium ${glass}`}>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  <span className="tabular-nums">{withCoords.length}</span>
                  <span className="text-black/55 font-normal">{t("propertiesMap.listings", "Listings").toLowerCase()}</span>
                </div>

                {/* Controls stack top-right, clear of the WhatsApp bubble bottom-right. */}
                <div className="absolute top-4 right-4 z-[3] flex flex-col gap-2">
                  <div className={`rounded-2xl overflow-hidden flex flex-col divide-y divide-black/[0.06] ${glass}`}>
                    <button
                      type="button"
                      onClick={() => setIsExpanded((v) => !v)}
                      aria-label={isExpanded ? t("propertiesMap.collapse", "Collapse map") : t("propertiesMap.expand", "Expand map")}
                      className={controlBtn}
                    >
                      {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                    <button type="button" onClick={recenter} aria-label={t("propertiesMap.recenter", "Show all homes")} className={controlBtn}>
                      <LocateFixed className="h-4 w-4" />
                    </button>
                  </div>
                  <div className={`rounded-2xl overflow-hidden flex flex-col divide-y divide-black/[0.06] ${glass}`}>
                    <button type="button" onClick={() => zoom(1)} aria-label="Zoom in" className={controlBtn}>
                      <Plus className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => zoom(-1)} aria-label="Zoom out" className={controlBtn}>
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Style switcher, bottom-left */}
                <div className={`absolute bottom-4 left-4 z-[3] rounded-full p-1 flex items-center gap-0.5 ${glass}`}>
                  <Layers className="h-4 w-4 mx-2 text-black/50" aria-hidden="true" />
                  {(Object.keys(MAP_STYLES) as MapStyle[]).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => chooseStyle(style)}
                      aria-pressed={mapStyle === style}
                      className={`h-8 px-3.5 rounded-full text-[13px] font-medium transition-colors ${
                        mapStyle === style ? "bg-[#1b1a18] text-white" : "text-black/65 hover:text-black hover:bg-black/[0.06]"
                      }`}
                    >
                      {styleLabels[style]}
                    </button>
                  ))}
                </div>

                <MapContainer
                  center={defaultCenter}
                  zoom={6}
                  attributionControl
                  zoomSnap={0.5}
                  scrollWheelZoom
                  zoomControl={false}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef as any}
                >
                  {mapStyle === "satellite" ? (
                    <>
                      <TileLayer
                        attribution="Imagery &copy; Esri, Maxar, Earthstar Geographics"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        maxZoom={19}
                      />
                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        maxZoom={19}
                      />
                    </>
                  ) : (
                    <VectorBasemap style={mapStyle} />
                  )}
                  <FitBounds positions={positions} />
                  <MarkerLayer
                    items={withCoords}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    markerRefs={markerRefs}
                    pendingOpen={pendingOpen}
                    clearPendingOpen={clearPendingOpen}
                    groupLabel={(count) => t("propertiesMap.homesCount", { count })}
                    renderPopup={(p) => (
                      <Link to={`/property/${p.slug}`} className="block !text-foreground">
                        <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                          <img
                            src={p.images?.[0] || apartmentImage}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4" dir={isRTL ? "rtl" : "ltr"}>
                          <div className="text-[11px] font-medium uppercase tracking-[1.2px] text-muted-foreground mb-1.5">
                            {p.district || p.location}
                          </div>
                          <div
                            className={`text-[17px] leading-[1.25] text-foreground mb-3 line-clamp-2 ${
                              isRTL ? "font-arabic" : "font-serif"
                            }`}
                          >
                            {getTranslatedContent(p, "title", i18n.language)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium tabular-nums">${p.price.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                              {t("propertiesMap.view", "View")}
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}
                  />
                </MapContainer>
              </div>
            </div>
          )}

          {!loading && withCoords.length === 0 && (
            <p className="text-center text-sm mt-6 text-muted-foreground">
              {t(
                "propertiesMap.noCoords",
                "The map is still being drawn. In the meantime, every home can be viewed in the list."
              )}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesMap;
