import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

function App() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current);
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div style={{ 
        background: "white", 
        padding: "20px", 
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ color: "#283e51" }}>QR Cloud Generator</h1>
        <input
          type="text"
          placeholder="Enter text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            padding: "12px", 
            width: "90%", 
            borderRadius: "8px", 
            border: "1px solid #aaa",
            fontSize: "15px"
          }}
        />
        <button
          onClick={() => setQrValue(text)}
          style={{
            marginTop: "15px",
            padding: "10px 25px",
            fontSize: "15px",
            backgroundColor: "#4b79a1",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Generate QR
        </button>
        <div 
          ref={qrRef}
          style={{ marginTop: "20px", padding: "10px", background: "white" }}
        >
          {qrValue && <QRCode value={qrValue} size={180} />}
        </div>
        {qrValue && (
          <button
            onClick={downloadQR}
            style={{
              marginTop: "15px",
              padding: "10px 25px",
              backgroundColor: "green",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Download QR
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
