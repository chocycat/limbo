export function useEval() {
  /** Converts a CSS color expression into a HEX color */
  const cssColor = (expression: string) => {
    // Create a temporary element
    const tempElement = document.createElement('div');
    tempElement.style.color = expression;
    document.body.appendChild(tempElement);

    const computedColor = window.getComputedStyle(tempElement).color;

    document.body.removeChild(tempElement);

    const rgbToHex = (r: number, g: number, b: number) =>
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');

    const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
      return rgbToHex(
        parseInt(rgbMatch[1]),
        parseInt(rgbMatch[2]),
        parseInt(rgbMatch[3])
      );
    }

    return computedColor;
  };

  return { cssColor };
}
