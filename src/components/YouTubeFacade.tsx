import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  fallbackThumbnail?: string;
}

/**
 * YouTube Facade component that loads YouTube embed only on user interaction
 * Saves ~560KB of unused JavaScript by deferring YouTube player load until click
 */
const YouTubeFacade = ({ videoId, title, fallbackThumbnail }: YouTubeFacadeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    fallbackThumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  );

  const handleClick = () => {
    setIsLoaded(true);
  };

  const handleThumbError = () => {
    if (!thumbSrc.includes("ytimg.com")) return;
    if (thumbSrc.includes("hqdefault")) {
      setThumbSrc(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
    }
  };

  if (isLoaded) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={handleClick}
      className="absolute inset-0 w-full h-full cursor-pointer group"
      aria-label={`Play video: ${title}`}
    >
      {/* YouTube thumbnail with fallback */}
      <img
        src={thumbSrc}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={handleThumbError}
      />
      
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold transition-all group-hover:scale-110 shadow-2xl">
          <Play className="w-10 h-10 text-white ml-1" />
        </div>
      </div>
    </button>
  );
};

export default YouTubeFacade;
