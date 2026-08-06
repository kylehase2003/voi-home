import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mapPinIcon from '@/assets/map-pin.png';

interface PropertyMapProps {
  mapEmbedUrl?: string;
  mapLinkUrl?: string;
  location: string;
  region?: string;
  latitude?: number | null;
  longitude?: number | null;
}

const propertyMarkerIcon = L.icon({
  iconUrl: mapPinIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 38],
  popupAnchor: [0, -34],
});

type ParsedCoordinates = { lat: number; lng: number };

const parseCoordinate = (value: unknown) => {
  const numberValue = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(numberValue) ? numberValue : null;
};

const isValidCoordinate = (lat: number | null, lng: number | null) =>
  lat !== null &&
  lng !== null &&
  lat >= -90 &&
  lat <= 90 &&
  lng >= -180 &&
  lng <= 180 &&
  !(Math.abs(lat) < 0.000001 && Math.abs(lng) < 0.000001);

const normalizeLocationKey = (value?: string | null) =>
  (value || '')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');

const matchesExpectedRegion = (lat: number, lng: number, location: string, region?: string) => {
  const locationText = `${normalizeLocationKey(location)} ${normalizeLocationKey(region)}`;
  const isTurkiye = /turkey|turkiye|turkiye|istanbul|bodrum|antalya|ankara/.test(locationText);
  const isUae = /dubai|uae|united arab emirates|abu dhabi|sharjah|ajman/.test(locationText);

  if (isTurkiye) {
    return lat >= 35 && lat <= 43.5 && lng >= 25 && lng <= 45;
  }

  if (isUae) {
    return lat >= 22 && lat <= 26.8 && lng >= 51 && lng <= 57.8;
  }

  return true;
};

const toCoordinates = (latValue: unknown, lngValue: unknown): ParsedCoordinates | null => {
  const lat = parseCoordinate(latValue);
  const lng = parseCoordinate(lngValue);
  return isValidCoordinate(lat, lng) ? { lat: lat!, lng: lng! } : null;
};

const parseDmsCoordinate = (degrees: string, minutes: string, seconds: string, direction: string) => {
  const decimal = Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600;
  return /[SW]/i.test(direction) ? -decimal : decimal;
};

const parseCoordinatesFromUrl = (url?: string, includeViewport = false): ParsedCoordinates | null => {
  if (!url) return null;
  const decodedUrl = (() => {
    try {
      return decodeURIComponent(url.replace(/\+/g, ' '));
    } catch {
      return url;
    }
  })();

  const placeDataMatch = decodedUrl.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (placeDataMatch) {
    const coordinates = toCoordinates(placeDataMatch[1], placeDataMatch[2]);
    if (coordinates) return coordinates;
  }

  const embedCenterMatch = decodedUrl.match(/!2d(-?\d+(?:\.\d+)?)!3d(-?\d+(?:\.\d+)?)/);
  if (embedCenterMatch) {
    const coordinates = toCoordinates(embedCenterMatch[2], embedCenterMatch[1]);
    if (coordinates) return coordinates;
  }

  const queryMatch = decodedUrl.match(/[?&](?:q|ll|query|center)=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
  if (queryMatch) {
    const coordinates = toCoordinates(queryMatch[1], queryMatch[2]);
    if (coordinates) return coordinates;
  }

  const dmsMatch = decodedUrl.match(/(\d{1,2})°(\d{1,2})'(\d{1,2}(?:\.\d+)?)"?([NS])\s+(\d{1,3})°(\d{1,2})'(\d{1,2}(?:\.\d+)?)"?([EW])/i);
  if (dmsMatch) {
    const lat = parseDmsCoordinate(dmsMatch[1], dmsMatch[2], dmsMatch[3], dmsMatch[4]);
    const lng = parseDmsCoordinate(dmsMatch[5], dmsMatch[6], dmsMatch[7], dmsMatch[8]);
    const coordinates = toCoordinates(lat, lng);
    if (coordinates) return coordinates;
  }

  if (includeViewport) {
    const atMatch = decodedUrl.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
    if (atMatch) {
      const coordinates = toCoordinates(atMatch[1], atMatch[2]);
      if (coordinates) return coordinates;
    }
  }

  return null;
};

interface MapPositionSyncProps {
  coordinates: { lat: number; lng: number };
}

const MapPositionSync = ({ coordinates }: MapPositionSyncProps) => {
  const map = useMap();

  useEffect(() => {
    const syncMap = () => {
      map.invalidateSize({ animate: false });
      map.setView([coordinates.lat, coordinates.lng], 15, { animate: false });
    };

    syncMap();
    const animationFrame = window.requestAnimationFrame(syncMap);
    const timers = [100, 400, 800, 1200].map((delay) => window.setTimeout(syncMap, delay));

    window.addEventListener('resize', syncMap);
    window.visualViewport?.addEventListener('resize', syncMap);
    window.visualViewport?.addEventListener('scroll', syncMap);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('resize', syncMap);
      window.visualViewport?.removeEventListener('resize', syncMap);
      window.visualViewport?.removeEventListener('scroll', syncMap);
    };
  }, [coordinates, map]);

  return null;
};

const PropertyMap = ({
  mapEmbedUrl,
  mapLinkUrl,
  location,
  region,
  latitude,
  longitude
}: PropertyMapProps) => {
  const { t } = useTranslation();

  // Translate region names
  const getTranslatedLocation = (loc: string) => {
    const locationKey = loc.toLowerCase().trim();

    // Turkey regions
    if (locationKey === 'turkey' || locationKey === 'türkiye') {
      return t('propertiesPage.turkey', 'Türkiye');
    }
    if (locationKey === 'istanbul') {
      return t('regions.istanbul', 'Istanbul');
    }
    if (locationKey === 'bodrum') {
      return t('regions.bodrum', 'Bodrum');
    }
    if (locationKey === 'antalya') {
      return t('regions.antalya', 'Antalya');
    }
    if (locationKey === 'ankara') {
      return t('regions.ankara', 'Ankara');
    }

    // UAE regions
    if (locationKey === 'dubai') {
      return t('propertiesPage.dubai', 'Dubai');
    }
    if (locationKey === 'abu dhabi' || locationKey === 'abudhabi') {
      return t('regions.abuDhabi', 'Abu Dhabi');
    }
    if (locationKey === 'sharjah') {
      return t('regions.sharjah', 'Sharjah');
    }
    if (locationKey === 'ajman') {
      return t('regions.ajman', 'Ajman');
    }
    return loc;
  };

  // Use region for translation, fallback to location
  const displayLocation = region ? getTranslatedLocation(region) : location;

  const coordinates = useMemo(() => {
    const candidates = [
      parseCoordinatesFromUrl(mapLinkUrl),
      parseCoordinatesFromUrl(mapEmbedUrl),
      { lat: parseCoordinate(latitude), lng: parseCoordinate(longitude) },
      parseCoordinatesFromUrl(mapLinkUrl, true),
      parseCoordinatesFromUrl(mapEmbedUrl, true),
    ];

    for (const candidate of candidates) {
      if (!candidate || !isValidCoordinate(candidate.lat, candidate.lng)) continue;
      if (matchesExpectedRegion(candidate.lat, candidate.lng, location, region)) {
        return { lat: candidate.lat, lng: candidate.lng };
      }
    }

    return null;
  }, [latitude, longitude, mapLinkUrl, mapEmbedUrl, location, region]);

  // Generate Google Maps URL for opening
  const getMapUrl = () => {
    // Use the custom map link URL if provided
    if (mapLinkUrl) return mapLinkUrl;
    
    // Otherwise generate from coordinates
    if (!coordinates) return null;
    const { lat, lng } = coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  const mapUrl = getMapUrl();

  if (!coordinates) {
    return (
      <div className="h-96 w-full rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center">
        <MapPin className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">Map location unavailable</p>
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
      </div>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg relative overflow-hidden group bg-muted">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full pointer-events-none z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coordinates.lat, coordinates.lng]} icon={propertyMarkerIcon} />
        <MapPositionSync coordinates={coordinates} />
      </MapContainer>

      <a
        href={mapUrl || `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('propertyDetail.openInGoogleMaps', 'Open in Google Maps')} - ${displayLocation}`}
        className="absolute inset-0 z-[500] flex items-center justify-center bg-foreground/0 transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <ExternalLink className="h-4 w-4" />
          {t('propertyDetail.openInGoogleMaps', 'Open in Google Maps')}
        </span>
      </a>
    </div>
  );
};

export default PropertyMap;