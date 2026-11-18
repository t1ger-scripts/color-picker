import { useState } from "react";
import "../styles/color-picker.scss";

type Shape = "circle" | "rounded" | "square";

const shapes: Shape[] = ["circle", "rounded", "square"];

const colors: string[] = [
  "#E74C3C",
  "#E67E22",
  "#F1C40F",
  "#2ECC71",
  "#1ABC9C",
  "#3498DB",
  "#9B59B6",
  "#E84393",
  "#34495E",
  "#95A5A6",
  "#000000",
  "#FFFFFF",
];

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState<string>("#3498DB");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedShape, setSelectedShape] = useState<Shape>("circle");
  const [hexInput, setHexInput] = useState<string>(selectedColor);

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(hexInput);

  function handleColorChange(color: string): void {
    setSelectedColor(color);
    setHexInput(color);
  }

  return (
    <div className="color-picker">
      <div
        className={`color-picker__preview shape--${selectedShape}`}
        style={{ backgroundColor: selectedColor }}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="color-picker__popup">
          <p>Colors</p>

          <div className="color-picker__grid">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`color-picker__swatch ${selectedColor === color ? "is-selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select ${color}`}
                aria-pressed={selectedColor === color}
              />
            ))}
          </div>

          <div className="color-picker__hex">
            <label htmlFor="hex-input">HEX Color</label>

            <div className="color-picker__hex-input">
              <input
                id="hex-input"
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                placeholder="#000000"
                maxLength={7}
                aria-invalid={!isValidHex}
              />

              <button
                type="button"
                disabled={!isValidHex}
                onClick={() => handleColorChange(hexInput)}
              >
                Apply
              </button>
            </div>

            {!isValidHex && (
              <span className="color-picker__error">
                Enter a valid HEX color.
              </span>
            )}

          </div>

          <div className="color-picker__shapes">
            <p>Shapes</p>

            {shapes.map((shape) => (
              <button
                key={shape}
                type="button"
                className={`color-picker__shape-button shape--${shape} ${selectedShape === shape ? "is-selected" : ""}`}
                onClick={() => setSelectedShape(shape)}
                aria-label={`Select ${shape}`}
                aria-pressed={selectedShape === shape}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
