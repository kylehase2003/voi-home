import { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  onClick?: () => void;
}

const OptimizedImage = memo(({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  priority = false,
  objectFit = 'cover',
  onClick
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority || isInView) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none'
  }[objectFit];

  // Check if container should be transparent
  const isTransparent = containerClassName?.includes('bg-transparent') || containerClassName?.includes('!bg-transparent');

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden",
        !isTransparent && "bg-muted",
        containerClassName
      )}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
      onClick={onClick}
    >
      {/* Skeleton placeholder - only show if not loaded and not transparent */}
      {!isLoaded && !isTransparent && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
        />
      )}
      
      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            objectFitClass,
            "w-full h-full",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
