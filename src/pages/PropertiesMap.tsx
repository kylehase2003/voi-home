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
import { Property } from "@/types/property";

// Plain teardrop pin, drawn inline so it never carries any brand mark.
const goldIcon = L.divIcon({
  className: "voi-map-pin",
  html: `<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24C32 7.163 24.837 0 16 0z" fill="#111"/>
    <circle cx="16" cy="16" r="6" fill="#fff"/>
  </svg>`,
  iconSize: [32, 40],
  iconAnchor: [16, 38],
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

  const filtered = withCoords;

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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Properties Map - Explore Listings on the Map"
        description="Explore our properties for sale and rent on an interactive map covering Istanbul and Bodrum. Click pins to view property details."
        path="/properties-map"
      />
      <Header />

      <main className="pt-24">
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 max-w-xl mx-auto">
              <div className="text-xs font-medium uppercase tracking-[1.5px] mb-4 text-muted-foreground">
                {t("properties.title")}
              </div>
              <h1
                className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${
                  i18n.language === "ar" ? "font-arabic" : "font-serif"
                }`}
              >
                {t("propertiesMap.title", "Properties Map")}
              </h1>
              <p className="text-base leading-[1.7] text-muted-foreground">
                {t(
                  "propertiesMap.subtitle",
                  "Explore our listings on an interactive map. Click any pin to see details."
                )}
              </p>
            </div>

            {loading ? (
              <LoadingSpinner message={t("properties.loading", "Loading properties...")} />
            ) : (
              <div className={isExpanded ? "block" : "grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"}>
                {/* Map */}
                <div className={`shadow-lg [&_.leaflet-pane]:!z-[1] [&_.leaflet-top]:!z-[2] [&_.leaflet-bottom]:!z-[2] [&_.leaflet-control]:!z-[2] border border-border ${
                  isExpanded
                    ? "fixed top-0 left-0 right-0 bottom-0 w-screen h-screen rounded-none z-[9999]"
                    : "relative w-full h-[70vh] min-h-[500px] rounded-xl overflow-hidden isolate z-0"
                }`}>
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => setIsExpanded((v) => !v)}
                    aria-label={isExpanded ? t("propertiesMap.collapse", "Collapse map") : t("propertiesMap.expand", "Expand map")}
                    className="absolute top-3 right-3 z-[3] bg-gold hover:bg-gold/90 text-white shadow-md"
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
                <aside className={`${isExpanded ? "hidden" : ""} rounded-xl p-4 max-h-[70vh] overflow-y-auto bg-card border border-border`}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-foreground">
                      {t("propertiesMap.listings", "Listings")}
                    </h2>
                    <Badge variant="secondary">{filtered.length}</Badge>
                  </div>

                  {filtered.length === 0 ? (
                    <p className="text-sm text-center py-8 text-muted-foreground">
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
                          className="group rounded-lg transition-colors overflow-hidden cursor-pointer border border-border hover:border-gold/60"
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
                              <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-gold transition-colors text-foreground">
                                {getTranslatedContent(p, "title", i18n.language)}
                              </h3>
                              <div className="flex items-center gap-1 text-xs mt-1 text-muted-foreground">
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
                                  className="text-xs hover:text-gold underline text-primary"
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
              <p className="text-center text-sm mt-6 text-muted-foreground">
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
