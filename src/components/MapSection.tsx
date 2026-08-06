import React from "react";

const MapSection = () => {
  return (
    <section className="w-full relative z-0 pt-6">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4258843473135!2d28.9058585!3d41.0159376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb01a6dafae3%3A0x29659935918f4b2a!2sMr%20Property!5e0!3m2!1sen!2str!4v1768585182749!5m2!1sen!2str"
          title="Mr Property - Zeytinburnu, Istanbul"
        />
      </div>
    </section>
  );
};

export default MapSection;
