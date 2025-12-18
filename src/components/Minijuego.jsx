import React, { useState, useEffect } from "react";
import "./minijuego.css";

export default function Minijuego() {
  const [modo, setModo] = useState(null);          // Selección de modo
  const [posicion, setPosicion] = useState(150);    // Posición del jugador
  const [obstaculo, setObstaculo] = useState(300);  // Obstáculo Arena
  const [vivo, setVivo] = useState(true);           // Estado para Escapar
  const [poder, setPoder] = useState(100);          // Barra para Maldición
  const [rompido, setRompido] = useState(false);    // Maldición rota

  /* =============================================================
     MODO 1 - ESCAPA DE LA ARENA (tipo Flappy Bird básico)
  ============================================================= */

  useEffect(() => {
    if (modo !== "arena" || !vivo) return;

    const intervalo = setInterval(() => {
      setObstaculo((o) => {
        if (o < -20) return 300;
        return o - 5;
      });
    }, 40);

    return () => clearInterval(intervalo);
  }, [modo, vivo]);

  const saltar = () => {
    if (modo !== "arena") return;

    setPosicion((p) => {
      const nuevo = p - 60;
      return nuevo < 0 ? 0 : nuevo;
    });

    setTimeout(() => {
      setPosicion((p) => {
        const nuevo = p + 60;
        return nuevo > 250 ? 250 : nuevo;
      });
    }, 230);
  };

  useEffect(() => {
    if (modo !== "arena" || !vivo) return;

    if (obstaculo < 80 && obstaculo > 20 && posicion > 170) {
      setVivo(false);
    }
  }, [obstaculo, posicion, modo, vivo]);

  /* =============================================================
     MODO 2 - ROMPE LA MALDICIÓN
  ============================================================= */

  const romper = () => {
    if (modo !== "maldicion" || rompido) return;

    setPoder((p) => {
      const nuevo = p - 7;
      if (nuevo <= 0) {
        setRompido(true);
      }
      return nuevo > 0 ? nuevo : 0;
    });
  };

  /* =============================================================
     UI PRINCIPAL
  ============================================================= */

  return (
    <div className="minijuego-wrapper">

      {/* TÍTULO */}
      <h2 className="titulo-juego">Sala de Desafíos del Faraón</h2>

      {/* SELECCIÓN DE MODO */}
      {!modo && (
        <div>
          <button className="btn-opcion" onClick={() => setModo("arena")}>
            🏜️ Escapa de la Arena
          </button>

          <button className="btn-opcion" onClick={() => setModo("maldicion")}>
            🔮 Rompe la Maldición
          </button>
        </div>
      )}

      {/* =========================================================
          MODO 1 — ESCAPA DE LA ARENA
      ========================================================= */}

      {modo === "arena" && (
        <div style={{ marginTop: "20px" }}>
          {!vivo && <h3 className="maldicion">💀 ¡La arena te atrapó!</h3>}

          <div
            style={{
              width: "300px",
              height: "250px",
              margin: "20px auto",
              background: "linear-gradient(to top, #c8a35f, #f2d39b)",
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 0 12px #000",
              cursor: "pointer",
            }}
            onClick={saltar}
          >
            {/* JUGADOR */}
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#8b5a2b",
                borderRadius: "50%",
                position: "absolute",
                left: "20px",
                top: posicion + "px",
                boxShadow: "0 0 10px #000",
              }}
            ></div>

            {/* OBSTÁCULO */}
            <div
              style={{
                width: "30px",
                height: "80px",
                background: "#6c4a1d",
                position: "absolute",
                right: obstaculo + "px",
                bottom: "0px",
                boxShadow: "0 0 10px #000",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            ></div>
          </div>

          {!vivo && (
            <button className="btn-opcion" onClick={() => {
              setVivo(true);
              setObstaculo(300);
              setPosicion(150);
            }}>
              🔁 Reintentar
            </button>
          )}
        </div>
      )}

      {/* =========================================================
          MODO 2 — ROMPE LA MALDICIÓN
      ========================================================= */}

      {modo === "maldicion" && (
        <div style={{ marginTop: "20px" }}>
          {!rompido && (
            <>
              <h3 className="texto-pregunta">💀 Una maldición te rodea...</h3>
              <p>Haz clic rápido para romper el sello sagrado</p>

              {/* Barra de contaminación */}
              <div
                style={{
                  width: "80%",
                  height: "25px",
                  margin: "20px auto",
                  background: "#3b2a15",
                  borderRadius: "12px",
                  boxShadow: "0 0 10px #000 inset",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: poder + "%",
                    height: "100%",
                    background: "#d4a657",
                    transition: "0.1s",
                  }}
                ></div>
              </div>

              <button className="btn-opcion" onClick={romper}>
                ⚡ Romper Maldición
              </button>
            </>
          )}

          {rompido && (
            <div className="final-juego">
              <h3>✨ ¡Has roto la maldición!</h3>
              <p>Los dioses te conceden su favor.</p>
              <button className="btn-opcion" onClick={() => {
                setPoder(100);
                setRompido(false);
              }}>
                🔁 Jugar otra vez
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
