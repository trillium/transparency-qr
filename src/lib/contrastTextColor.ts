export const contrastTextColor = (hexColor: string): string => {
  // Assuming hexColor is in the format "#RRGGBB"
  const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16); // Red value
  const g = parseInt(color.substring(2, 4), 16); // Green value
  const b = parseInt(color.substring(4, 6), 16); // Blue value

  // Using the YIQ color space formula to determine brightness
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  const textColor = (yiq >= 128) ? 'black' : 'white'; // Light background, use black text; dark background, use white text

  return textColor
}