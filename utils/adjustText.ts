export const adjustTextSize = (text: string, size: number): string => {
  let maxLength;
  if (size <= 480) {
    // for mobile devices
    maxLength = 20;
  } else if (size <= 768) {
    // for tablets
    maxLength = 10;
  } else {
    // for desktop
    maxLength = 45;
  }

  return text.length > 30 ? text.slice(0, maxLength) + "..." : text;
};
