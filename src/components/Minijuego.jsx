import React, { useState, useEffect } from "react";
import "./minijuego.css";

export default function Minijuego() {
  const [modo, setModo] = useState(null);
  const [posicion, setPosicion] = useState(150);
  const [obstaculo, setObstaculo] = useState(400);
  const [vivo, setVivo] = useState(true);
  const [segundos, setSegundos] = useState(0);
  const [ganadoArena, setGanadoArena] = useState(false);
  const [aire, setAire] = useState(100);
  const [ganadoSello, setGanadoSello] = useState(false);

  // --- LÓGICA JUEGO 1: ARENA ---
  /* --- LÓGICA JUEGO 1: ARENA (VERSIÓN DEFINITIVA SIN ERRORES) --- */
  
  // 1. Movimiento del pincho
  useEffect(() => {
    if (modo !== "arena" || !vivo || ganadoArena) return;
    const intervalo = setInterval(() => {
      setObstaculo((o) => (o < -40 ? 400 : o - 5)); // Velocidad fluida
    }, 20);
    return () => clearInterval(intervalo);
  }, [modo, vivo, ganadoArena]);

  // 2. Contador de tiempo
  useEffect(() => {
    if (modo === "arena" && vivo && !ganadoArena) {
      const timer = setInterval(() => {
        setSegundos((s) => {
          if (s >= 14) { setGanadoArena(true); clearInterval(timer); }
          return s + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [modo, vivo, ganadoArena]);

  // 3. Colisión (AJUSTADA: solo muere si está en el suelo Y el pincho está justo debajo)
  useEffect(() => {
    if (modo === "arena" && vivo && !ganadoArena) {
      // El pincho está justo en el área de la momia (entre 40 y 80)
      const pinchoPeligroso = obstaculo > 40 && obstaculo < 80;
      // La momia está tocando el suelo (su posición normal es 150)
      const momiaEnSuelo = posicion > 130; 

      if (pinchoPeligroso && momiaEnSuelo) {
        setVivo(false);
      }
    }
  }, [obstaculo, posicion, vivo, modo, ganadoArena]);

  // 4. Salto (MÁS ALTO Y SEGURO)
  const saltar = () => {
    // Solo salta si está en el suelo para evitar el doble salto que da error
    if (modo !== "arena" || !vivo || posicion < 140 || ganadoArena) return;
    
    setPosicion(30); // Sube bien alto
    setTimeout(() => {
      setPosicion(150); // Vuelve al suelo
    }, 600); // Se queda un poco más de tiempo arriba para asegurar
  };

  // --- LÓGICA JUEGO 2: SELLO ---
  useEffect(() => {
    if (modo === "maldicion" && aire > 0 && !ganadoSello) {
      const timer = setInterval(() => setAire(a => a - 0.8), 100);
      return () => clearInterval(timer);
    } else if (aire <= 0) { setVivo(false); }
  }, [modo, aire, ganadoSello]);

  const romperSello = () => {
    if (aire > 0 && !ganadoSello) {
      setAire(a => (a + 10 > 100 ? 100 : a + 10));
      if (Math.random() > 0.96) setGanadoSello(true);
    }
  };

  const reset = () => {
    setModo(null); setVivo(true); setGanadoArena(false); 
    setGanadoSello(false); setSegundos(0); setAire(100); setObstaculo(400);
  };

  return (
    <div className="minijuego-container">
      <h2 className="titulo-egipcio">CÁMARA DE PRUEBAS</h2>
      {modo && <button className="btn-escape" onClick={reset}>✕ ABANDONAR</button>}

      {!modo ? (
        <div className="menu-inicial">
          <button className="btn-egipcio" onClick={() => setModo("arena")}>𓀚 EL DESPERTAR</button>
          <button className="btn-egipcio" onClick={() => setModo("maldicion")}>𓁢 EL SELLO</button>
        </div>
      ) : (
        <div className="juego-activo">
          {modo === "arena" && (
            <div className="escenario-arena" onClick={saltar}>
              <div className="cronometro">⏳ {15 - segundos}s</div>
              {!vivo && <div className="overlay"><h3>💀 ATRAPADO</h3><button onClick={reset}>REINTENTAR</button></div>}
              {ganadoArena && <div className="overlay success"><h3>✨ ¡LIBRE!</h3><button onClick={reset}>VOLVER</button></div>}
              <div className="suelo"></div>
              <img src="/momia.png" className="momia-player" style={{ top: posicion }} alt="momia" />
              <div className="trampa-pinchos" style={{ right: obstaculo }}></div>
            </div>
          )}
          {modo === "maldicion" && (
            <div className="escenario-sello">
              {!ganadoSello && vivo ? (
                <>
                  <div className="barra-aire"><div className="llenado" style={{ width: `${aire}%`, background: aire < 30 ? "red" : "gold" }}></div></div>
                  <div className="sello-sagrado" onClick={romperSello}>𓋹</div>
                </>
              ) : <div className="overlay">{ganadoSello ? "✨ LOGRADO" : "💀 OSCURIDAD"}<button onClick={reset}>SALIR</button></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}