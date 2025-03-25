import React, { useState } from "react";
import "./styles.css"; 

const textColors = [
  { value: "30", label: "Gray" },
  { value: "31", label: "Red" },
  { value: "32", label: "Green" },
  { value: "33", label: "Yellow" },
  { value: "34", label: "Blue" },
  { value: "35", label: "Pink" },
  { value: "36", label: "Cyan" },
  { value: "37", label: "White" },
];

const backgroundColors = [
  { value: "40", label: "Dark Blue" },
  { value: "41", label: "Orange" },
  { value: "42", label: "Marble Blue" },
  { value: "43", label: "Greyish Turquoise" },
  { value: "44", label: "Gray" },
  { value: "45", label: "Indigo" },
  { value: "46", label: "Light Gray" },
  { value: "47", label: "White" },
];

const formats = [
  { value: "0", label: "Normal" },
  { value: "1", label: "Bold" },
  { value: "4", label: "Underline" },
];

function App() {
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("32");
  const [bgColor, setBgColor] = useState("40");
  const [format, setFormat] = useState("0");
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false); 

  const generateANSI = () => {
    const ansiCode = `\u001b[${format};${bgColor};${textColor}m${text}\u001b[0m`;
    const discordCode = `\`\`\`ansi\n${ansiCode}\n\`\`\``;
    setGeneratedText(discordCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true); 

    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="container">
      <h2 className="title">Discord Colored Text Generator</h2>

      <input
        type="text"
        className="input-field"
        placeholder="Enter your text..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <select className="select-field" value={textColor} onChange={(e) => setTextColor(e.target.value)}>
        {textColors.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </select>

      <select className="select-field" value={bgColor} onChange={(e) => setBgColor(e.target.value)}>
        {backgroundColors.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </select>

      <select className="select-field" value={format} onChange={(e) => setFormat(e.target.value)}>
        {formats.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>

      <button className="button" onClick={generateANSI}>
        Generate ANSI Code
      </button>

      {generatedText && (
        <>
          <textarea className="output-box" value={generatedText} readOnly rows={3} />

          <button
            className={`button copy-button ${copied ? "copied" : ""}`}
            onClick={copyToClipboard}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
