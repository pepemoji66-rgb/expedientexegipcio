import React, { useContext } from "react";
import { AudioContext } from "../AudioProvider";
import "./AudioControl.css";

export default function AudioControl() {
  const { activo, setActivo, volumen, setVolumen } = useContext(AudioContext);

  return (
    <>
      <button
        className={`btn-audio ${activo ? "activo" : ""}`}
        onClick={() => setActivo(!activo)}
      >
        {activo ? "🔊 Silenciar" : "🎵 Música"}
      </button>

      {activo && (
        <div className="volumen-container">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumen}
            onChange={(e) => setVolumen(parseFloat(e.target.value))}
          />
        </div>
      )}
    </>
  );
}
