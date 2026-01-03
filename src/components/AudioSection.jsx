import React, { useRef, useState, useEffect, useContext } from "react";
import "./AudioSection.css";
import { AudioContext } from "../AudioProvider";

export default function AudioSection({ audios = [] }) {
  const audioRefs = useRef({});
  const [reproduciendoId, setReproduciendoId] = useState(null);
  const [progreso, setProgreso] = useState({});

  const { setActivo } = useContext(AudioContext);

  useEffect(() => {
    // Desactivamos el audio global/fondo al entrar en esta sección
    if (setActivo) setActivo(false);

    const interval = setInterval(() => {
      Object.keys(audioRefs.current).forEach(id => {
        const a = audioRefs.current[id];
        if (a && !a.paused && a.duration) {
          setProgreso(prev => ({
            ...prev,
            [id]: (a.currentTime / a.duration) * 100
          }));
        }
      });
    }, 500);

    return () => {
      clearInterval(interval);
      // Reactivamos el audio global al salir
      if (setActivo) setActivo(true);
      // Paramos cualquier audio que se esté reproduciendo al desmontar
      Object.values(audioRefs.current).forEach(a => a?.pause());
    };
  }, [setActivo]);

  const togglePlay = (id) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (reproduciendoId && reproduciendoId !== id) {
      audioRefs.current[reproduciendoId]?.pause();
    }

    if (reproduciendoId === id) {
      audio.pause();
      setReproduciendoId(null);
    } else {
      audio.play().catch(err => console.error("Error al reproducir:", err));
      setReproduciendoId(id);
    }
  };

  return (
    <section className="audio-section-ancestral">
      <h2 className="titulo-místico">Cámaras Sonoras de Giza</h2>
      
      <div className="contenedor-reliquias">
        {/* Usamos || true por si no tienes la propiedad 'visible' en la DB aún */}
        {audios.map((audio) => (
          <div key={audio.id} className={`reliquia-card ${reproduciendoId === audio.id ? 'activa' : ''}`}>
            <div className="jeroglificos-fondo">𓁹 𓆣 𓅃 𓊝 𓏴</div>
            
            <div className="reliquia-header">
              <span className="prefijo">REGISTRO:</span>
              <h3 className="audio-nombre">{audio.titulo}</h3>
            </div>

            <div className="control-central">
              <button 
                className={`boton-disco ${reproduciendoId === audio.id ? 'girando' : ''}`}
                onClick={() => togglePlay(audio.id)}
              >
                {reproduciendoId === audio.id ? "⏸" : "▶"}
              </button>
            </div>

            <div className="progreso-contenedor">
              <div className="barra-piedra">
                <div 
                  className="energia-flujo" 
                  style={{ width: `${progreso[audio.id] || 0}%` }}
                ></div>
              </div>
            </div>

            <audio 
              ref={el => audioRefs.current[audio.id] = el} 
              /* IMPORTANTE: Usamos audio.url que es como viene de MySQL */
              src={audio.url || audio.src} 
              onEnded={() => setReproduciendoId(null)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}