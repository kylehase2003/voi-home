import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Search, Grid3X3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OpenLocationCode from 'open-location-code';

// Fix Leaflet default icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Default to Dubai coordinates
const DEFAULT_CENTER: [number, number] = [25.2048, 55.2708];
const DEFAULT_ZOOM = 11;

// Extract short code and location reference from input like "3X7Q+H4 Şişli, İstanbul"
function parsePlusCodeInput(input: string): { code: string; locationRef: string | null } {
  const trimmed = input.trim();
  
  // Match the plus code pattern at the start
  const plusCodeMatch = trimmed.match(/^([23456789CFGHJMPQRVWX]{2,8}\+[23456789CFGHJMPQRVWX]*)/i);
  
  if (!plusCodeMatch) {
    return { code: '', locationRef: null };
  }
  
  const code = plusCodeMatch[1].toUpperCase();
  const remainder = trimmed.substring(plusCodeMatch[0].length).trim();
  
  // Remove leading comma or space
  const locationRef = remainder.replace(/^[,،\s]+/, '').trim() || null;
  
  return { code, locationRef };
}

function isFullPlusCode(code: string): boolean {
  // A full plus code has 8 characters before the +
  const plusIndex = code.indexOf('+');
  return plusIndex === 8;
}

function isValidPlusCode(code: string): boolean {
  try {
    return OpenLocationCode.isValid(code);
  } catch {
    return false;
  }
}

interface MapPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

const MapPicker = ({ latitude, longitude, onLocationSelect }: MapPickerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [plusCodeQuery, setPlusCodeQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [plusCodeError, setPlusCodeError] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const center: [number, number] = latitude && longitude ? [latitude, longitude] : DEFAULT_CENTER;
    const zoom = latitude && longitude ? 15 : DEFAULT_ZOOM;
    
    mapRef.current = L.map(containerRef.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Add initial marker if coordinates exist
    if (latitude && longitude) {
      markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
    }

    // Add click handler
    mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Remove old marker if exists
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      // Add new marker
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current!);
      
      // Call callback
      onLocationSelect(lat, lng);
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
    };
  }, []);

  // Update marker when coordinates change externally
  useEffect(() => {
    if (!mapRef.current) return;

    if (latitude && longitude) {
      // Remove old marker
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      // Add new marker and center map
      markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
      mapRef.current.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const allResults: SearchResult[] = [];
      
      // Strategy 1: Search with Turkey context
      const turkeySearch = fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Istanbul, Turkey')}&limit=5&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'MRProperty-Dashboard/1.0',
          },
        }
      );
      
      // Strategy 2: Search with UAE context
      const uaeSearch = fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Dubai, UAE')}&limit=5&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'MRProperty-Dashboard/1.0',
          },
        }
      );
      
      // Strategy 3: Global search
      const globalSearch = fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'MRProperty-Dashboard/1.0',
          },
        }
      );
      
      const [turkeyRes, uaeRes, globalRes] = await Promise.all([turkeySearch, uaeSearch, globalSearch]);
      
      if (turkeyRes.ok) {
        const data = await turkeyRes.json();
        allResults.push(...data);
      }
      
      if (uaeRes.ok) {
        const data = await uaeRes.json();
        allResults.push(...data);
      }
      
      if (globalRes.ok) {
        const data = await globalRes.json();
        allResults.push(...data);
      }
      
      // Remove duplicates based on coordinates
      const uniqueResults = allResults.filter((result, index, self) => 
        index === self.findIndex(r => 
          Math.abs(parseFloat(r.lat) - parseFloat(result.lat)) < 0.0001 &&
          Math.abs(parseFloat(r.lon) - parseFloat(result.lon)) < 0.0001
        )
      );
      
      setSearchResults(uniqueResults.slice(0, 10));
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search while typing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    if (searchQuery.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, 500);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    if (mapRef.current) {
      // Remove old marker
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      // Add new marker and center map
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      mapRef.current.setView([lat, lng], 15);
    }
    
    onLocationSelect(lat, lng);
    setShowResults(false);
    setSearchQuery(result.display_name.split(',')[0]);
  };

  const handlePlusCodeSubmit = async () => {
    if (!plusCodeQuery.trim()) {
      setPlusCodeError('Please enter a Plus Code');
      return;
    }

    setPlusCodeError('');
    setIsSearching(true);

    try {
      const { code, locationRef } = parsePlusCodeInput(plusCodeQuery);
      
      if (!code) {
        setPlusCodeError('Invalid Plus Code format. Example: 3X7Q+H4 Şişli, İstanbul');
        return;
      }

      let fullCode = code;
      
      // Check if it's a short code that needs recovery
      if (!isFullPlusCode(code)) {
        if (!locationRef) {
          setPlusCodeError('Short Plus Codes need a location reference (e.g., 3X7Q+H4 Şişli, İstanbul)');
          return;
        }
        
        // Geocode the location reference to get coordinates
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationRef)}&limit=1`,
          {
            headers: {
              'Accept-Language': 'en',
              'User-Agent': 'MRProperty-Dashboard/1.0',
            },
          }
        );
        
        if (!response.ok) {
          setPlusCodeError('Failed to resolve location reference');
          return;
        }
        
        const data = await response.json();
        if (data.length === 0) {
          setPlusCodeError(`Could not find location: ${locationRef}`);
          return;
        }
        
        const refLat = parseFloat(data[0].lat);
        const refLng = parseFloat(data[0].lon);
        
        // Recover the full code using the reference location
        try {
          fullCode = OpenLocationCode.recoverNearest(code, refLat, refLng);
        } catch (e) {
          console.error('Failed to recover plus code:', e);
          setPlusCodeError('Invalid Plus Code format');
          return;
        }
      }
      
      // Validate and decode the full code
      if (!isValidPlusCode(fullCode)) {
        setPlusCodeError('Invalid Plus Code');
        return;
      }
      
      const decoded = OpenLocationCode.decode(fullCode);
      const lat = decoded.latitudeCenter;
      const lng = decoded.longitudeCenter;
      
      if (mapRef.current) {
        if (markerRef.current) {
          markerRef.current.remove();
        }
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
        mapRef.current.setView([lat, lng], 17);
      }
      onLocationSelect(lat, lng);
      
    } catch (error) {
      console.error('Plus code resolution failed:', error);
      setPlusCodeError('Failed to resolve Plus Code');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Search Tabs */}
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="pluscode" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Plus Code
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-2">
          {/* Search Input */}
          <div className="relative z-[1000]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-[1001] top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectResult(result)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors border-b last:border-b-0"
                  >
                    {result.display_name}
                  </button>
                ))}
              </div>
            )}
            
            {showResults && searchResults.length === 0 && !isSearching && searchQuery.length >= 2 && (
              <div className="absolute z-[1001] top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg p-3 text-sm text-muted-foreground">
                No results found
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pluscode" className="mt-2">
          {/* Plus Code Input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Grid3X3 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g., 3X7Q+H4 Şişli, İstanbul"
                  value={plusCodeQuery}
                  onChange={(e) => {
                    setPlusCodeQuery(e.target.value);
                    setPlusCodeError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handlePlusCodeSubmit();
                    }
                  }}
                  className="pl-10"
                />
              </div>
              <Button 
                type="button" 
                onClick={handlePlusCodeSubmit}
                disabled={isSearching}
                size="default"
              >
                {isSearching ? 'Finding...' : 'Find'}
              </Button>
            </div>
            {plusCodeError && (
              <p className="text-sm text-destructive">{plusCodeError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Paste a Google Maps Plus Code (e.g., 3X7Q+H4 Şişli, İstanbul)
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Click on the map to pin the property location
      </p>
      
      <div 
        ref={containerRef}
        className="w-full h-[400px] rounded-lg border-2 border-[#c9b47f]/20 overflow-hidden relative z-0"
      />
      {latitude && longitude && (
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border border-[#c9b47f]/20">
          <p className="font-medium text-foreground mb-1">Selected Location:</p>
          <p>Latitude: {latitude.toFixed(6)}</p>
          <p>Longitude: {longitude.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
};

export default MapPicker;
