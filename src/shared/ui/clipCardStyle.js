// Drop this in: src/shared/ui/clipCardStyle.js
// Same clip-path as .clip-card in the reference theme — use as inline `style` on any
// card that should get the sliced top-right corner (hero card, course cards, etc).
export const clipCardStyle = {
  clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
};
