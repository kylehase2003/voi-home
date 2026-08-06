import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LoadingSpinner from "@/components/property/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize2, Minimize2 } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
import apartmentImage from "@/assets/apartment-modern.jpg";
import mapPinIcon from "@/assets/map-pin.png";
import { Property } from "@/types/property";

// Branded MR. Property pin
const goldIcon = L.icon({
  iconUrl: mapPinIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 38],
  popupAnchor: [0, -34],
});

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
  const { properties, loading } = useProperties();
  const [region, setRegion] = useState<"all" | "turkey" | "dubai">("turkey");
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

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

  const filtered = useMemo(() => {
    if (region === "all") return withCoords;
    return withCoords.filter((p) => {
      const r = (p.region || "").toLowerCase();
      if (region === "turkey") return r.includes("turkey") || r.includes("turk");
      if (region === "dubai") return r.includes("dubai") || r.includes("uae");
      return true;
    });
  }, [withCoords, region]);

  const positions = useMemo<[number, number][]>(
    () => filtered.map((p) => [Number(p.latitude), Number(p.longitude)]),
    [filtered]
  );

  // Default center (Istanbul) when no markers
  const defaultCenter: [number, number] = [41.0082, 28.9784];

  const flyTo = (p: Property) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo([Number(p.latitude), Number(p.longitude)], 14, {
      duration: 1.2,
    });
  };

  const isDubaiTheme = region === "dubai";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
      <SEOHead
        title="Properties Map - Explore Listings on the Map"
        description="Explore our properties for sale and rent on an interactive map covering Istanbul, Bodrum, and Dubai. Click pins to view property details."
        path="/properties-map"
      />
      <Header />

      <main className="pt-24">
        <section className={`py-8 transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h1
                className={`text-3xl md:text-4xl mb-2 ${isDubaiTheme ? "text-white" : "text-primary"} ${
                  i18n.language === "ar" ? "font-arabic" : "font-serif"
                }`}
              >
                {t("propertiesMap.title", "Properties Map")}
              </h1>
              <p className={`max-w-2xl mx-auto ${isDubaiTheme ? "text-white/70" : "text-muted-foreground"}`}>
                {t(
                  "propertiesMap.subtitle",
                  "Explore our listings on an interactive map. Click any pin to see details."
                )}
              </p>
            </div>

            {/* Region tabs */}
            <div className="mb-6 flex justify-center gap-3 flex-wrap">
              <Button
                variant={region === "all" ? "default" : "outline"}
                onClick={() => setRegion("all")}
                className={region === "all" ? "bg-gold hover:bg-gold/90 text-primary" : isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}
              >
                {t("properties.viewAll", "View All")}
              </Button>
              <Button
                variant={region === "turkey" ? "default" : "outline"}
                onClick={() => setRegion("turkey")}
                className={region === "turkey" ? "bg-gold hover:bg-gold/90 text-primary" : isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}
              >
                {t("properties.turkey", "Türkiye")}
              </Button>
              <Button
                variant={region === "dubai" ? "default" : "outline"}
                onClick={() => setRegion("dubai")}
                className={region === "dubai" ? "bg-gold hover:bg-gold/90 text-primary" : isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}
              >
                {t("properties.dubai", "Dubai")}
              </Button>
            </div>

            {loading ? (
              <LoadingSpinner message={t("properties.loading", "Loading properties...")} />
            ) : (
              <div className={isExpanded ? "block" : "grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"}>
                {/* Map */}
                <div className={`shadow-lg [&_.leaflet-pane]:!z-[1] [&_.leaflet-top]:!z-[2] [&_.leaflet-bottom]:!z-[2] [&_.leaflet-control]:!z-[2] ${
                  isExpanded
                    ? "fixed top-0 left-0 right-0 bottom-0 w-screen h-screen rounded-none z-[9999]"
                    : "relative w-full h-[70vh] min-h-[500px] rounded-xl overflow-hidden isolate z-0"
                } ${isDubaiTheme ? "border border-white/10" : "border border-border"}`}>
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => setIsExpanded((v) => !v)}
                    aria-label={isExpanded ? t("propertiesMap.collapse", "Collapse map") : t("propertiesMap.expand", "Expand map")}
                    className="absolute top-3 right-3 z-[3] bg-gold hover:bg-gold/90 text-primary shadow-md"
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <MapContainer
                    center={defaultCenter}
                    zoom={6}
                    scrollWheelZoom
                    style={{ height: "100%", width: "100%" }}
                    ref={mapRef as any}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitBounds positions={positions} />
                    {filtered.map((p) => (
                      <Marker
                        key={p.id}
                        position={[Number(p.latitude), Number(p.longitude)]}
                        icon={goldIcon}
                      >
                        <Popup>
                          <div className="w-[220px]">
                            <Link to={`/property/${p.slug}`} className="block">
                              <div className="h-28 w-full overflow-hidden rounded-md mb-2 bg-muted">
                                <img
                                  src={p.images?.[0] || apartmentImage}
                                  alt={p.title}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <h3 className="text-sm font-semibold line-clamp-1 text-foreground mb-1">
                                {getTranslatedContent(p, "title", i18n.language)}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {p.district || p.location}
                                </span>
                                <span className="text-sm font-bold text-gold">
                                  ${p.price.toLocaleString()}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                {/* Side list */}
                <aside className={`${isExpanded ? "hidden" : ""} rounded-xl p-4 max-h-[70vh] overflow-y-auto transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,15%)] border border-white/10" : "bg-card border border-border"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className={`text-lg font-semibold ${isDubaiTheme ? "text-white" : "text-foreground"}`}>
                      {t("propertiesMap.listings", "Listings")}
                    </h2>
                    <Badge variant="secondary">{filtered.length}</Badge>
                  </div>

                  {filtered.length === 0 ? (
                    <p className={`text-sm text-center py-8 ${isDubaiTheme ? "text-white/80" : "text-muted-foreground"}`}>
                      {t(
                        "propertiesMap.noProperties",
                        "No properties with location data."
                      )}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {filtered.map((p) => (
                        <li
                          key={p.id}
                          className={`group rounded-lg transition-colors overflow-hidden cursor-pointer ${isDubaiTheme ? "border border-white/10 hover:border-gold/60 bg-[hsl(0,0%,12%)]" : "border border-border hover:border-gold/60"}`}
                          onClick={() => flyTo(p)}
                        >
                          <div className="flex gap-3 p-2">
                            <div className="h-16 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                              <OptimizedImage
                                src={p.images?.[0] || apartmentImage}
                                alt={p.title}
                                containerClassName="w-full h-full"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className={`text-sm font-semibold line-clamp-1 group-hover:text-gold transition-colors ${isDubaiTheme ? "text-white" : "text-foreground"}`}>
                                {getTranslatedContent(p, "title", i18n.language)}
                              </h3>
                              <div className={`flex items-center gap-1 text-xs mt-1 ${isDubaiTheme ? "text-white/80" : "text-muted-foreground"}`}>
                                <MapPin className="h-3 w-3" />
                                <span className="line-clamp-1">
                                  {p.district || p.location}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-sm font-bold text-gold">
                                  ${p.price.toLocaleString()}
                                </span>
                                <Link
                                  to={`/property/${p.slug}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className={`text-xs hover:text-gold underline ${isDubaiTheme ? "text-white/80" : "text-primary"}`}
                                >
                                  {t("propertiesMap.view", "View")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </aside>
              </div>
            )}

            {!loading && withCoords.length === 0 && (
              <p className={`text-center text-sm mt-6 ${isDubaiTheme ? "text-white/80" : "text-muted-foreground"}`}>
                {t(
                  "propertiesMap.noCoords",
                  "No properties have map coordinates yet. Add latitude and longitude in the dashboard to display them here."
                )}
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesMap;
