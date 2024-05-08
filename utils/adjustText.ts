export const adjustTextSize = (text: string): string => {
  return text.length > 50 ? text.slice(0, 50) + "..." : text;
};
