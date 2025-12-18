import React, { useRef, useState } from "react";
import "./AudioSection.css"; // opcional

export default function AudioSection() {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (reproduciendo) {
      audioRef.current.pause();
      setReproduciendo(false);
    } else {
      audioRef.current.play();
      setReproduciendo(true);
    }
  };

  return (
    <div className="audio-section">
      <h2>Audio del Documental</h2>

      <audio ref={audioRef} src="/audios/audioseccion.mp3" />

      <button className="btn-audio-seccion" onClick={togglePlay}>
        {reproduciendo ? "⏸ Pausar" : "▶ Reproducir"}
      </button>
    </div>
  );
}
