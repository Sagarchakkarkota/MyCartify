/**
 * Convert hex color to rgba
 * @param hex - hex color string, e.g., "#FF0000" or "FF0000"
 * @param alpha - number between 0 and 1
 * @returns rgba string, e.g., "rgba(255,0,0,0.5)"
 */
export const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  const hex6 =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map(c => c + c)
          .join('')
      : cleanHex;

  const r = parseInt(hex6.slice(0, 2), 16);
  const g = parseInt(hex6.slice(2, 4), 16);
  const b = parseInt(hex6.slice(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
};
