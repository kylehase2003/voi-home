interface PhotoScrollerProps {
  images: string[];
}

const PhotoScroller = ({ images }: PhotoScrollerProps) => {
  // Duplicate the strip so the CSS marquee loop is seamless.
  const strip = [...images, ...images];

  return (
    <div className="py-16 overflow-hidden">
      <div className="flex gap-4 w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused]">
        {strip.map((src, i) => (
          <div key={i} className="w-[260px] md:w-[320px] h-[340px] md:h-[400px] rounded-2xl overflow-hidden shrink-0">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoScroller;
