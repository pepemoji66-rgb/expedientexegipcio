import React, { createContext, useState, useRef, useEffect } from "react";

export const AudioContext = createContext();

export default function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const [activo, setActivo] = useState(false);
  const [volumen, setVolumen] = useState(
    () => Number(localStorage.getItem("volumen-musica")) || 0.5
  );

  // Guardar y aplicar volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumen;
      localStorage.setItem("volumen-musica", volumen);
    }
  }, [volumen]);

  // Reproducir / pausar música global
  useEffect(() => {
    if (!audioRef.current) return;

    if (activo) {
      audioRef.current.play().catch(() => {
        console.warn("Autoplay bloqueado por navegador");
      });
    } else {
      audioRef.current.pause();
    }
  }, [activo]);

  return (
    <AudioContext.Provider value={{ activo, setActivo, volumen, setVolumen }}>
      {/* AUDIO GLOBAL REAL */}
     <audio ref={audioRef} loop src="/musica/flauta.mp3" />


      {children}
    </AudioContext.Provider>
  );
}
