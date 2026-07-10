const ClipCorner = () => (
  <span
    aria-hidden="true"
    className="absolute top-0 right-0 w-4 h-4 bg-gold-soft pointer-events-none"
    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
  />
);

export default ClipCorner;
