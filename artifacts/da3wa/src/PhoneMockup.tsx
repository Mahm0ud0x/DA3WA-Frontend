interface PhoneMockupProps {
  image: string;
  alt: string;
}

export function PhoneMockup({ image, alt }: PhoneMockupProps) {
  return (
    <div className="relative w-[130px] h-[270px] rounded-[22px] border-[6px] border-black overflow-hidden bg-black">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black z-10" />
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}