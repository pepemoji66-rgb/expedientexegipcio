import React, { useState, useEffect } from "react";
import "./minijuego.css";

const ICONOS = ["𓁢", "𓀚", "𓀛", "𓀾", "𓁀", "𓁴"];

export default function Minijuego() {
  const [modo, setModo] = useState(null);
  const [logros, setLogros] = useState([]);
  const [cartas, setCartas] = useState([]);
  const [elecciones, setElecciones] = useState([]);
  const [aciertos, setAciertos] = useState(0);
  const [oro, setOro] = useState(0);
  const [ganado, setGanado] = useState(false);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("mis_reliquias")) || [];
    setLogros(guardados);
  }, []);

  const ganarPremio = (tipo) => {
    const premio = tipo === "memoria"
      ? { id: 999, nombre: "Ojo de Horus", icono: "👁️‍🗨️" }
      : { id: 888, nombre: "Ankh Dorado", icono: "☥" };

    const actuales = JSON.parse(localStorage.getItem("mis_reliquias")) || [];
    if (!actuales.some(p => p.id === premio.id)) {
      const nuevaLista = [...actuales, premio];
      localStorage.setItem("mis_reliquias", JSON.stringify(nuevaLista));
      setLogros(nuevaLista);
    }
  };

  const iniciarMemoria = () => {
    const baraja = [...ICONOS, ...ICONOS]
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({ id: i, icono: icon, volteada: false, resuelta: false }));
    setCartas(baraja);
    setAciertos(0);
    setElecciones([]);
    setModo("memoria");
  };

  useEffect(() => {
    if (elecciones.length === 2) {
      setTimeout(() => {
        const [c1, c2] = elecciones;
        if (c1.icono === c2.icono) {
          setCartas(prev => prev.map(c => c.icono === c1.icono ? { ...c, resuelta: true } : c));
          setAciertos(a => {
            if (a + 1 === ICONOS.length) ganarPremio("memoria");
            return a + 1;
          });
        } else {
          setCartas(prev => prev.map(c => (c.resuelta ? c : { ...c, volteada: false })));
        }
        setElecciones([]);
      }, 600);
    }
  }, [elecciones]);

  const clickOro = (e) => {
    if (ganado) return;

    // Usamos e.currentTarget para asegurarnos de pillar la vasija
    const vasija = e.currentTarget;
    if (vasija) {
      vasija.classList.add("vibrar-clic");
      setTimeout(() => vasija.classList.remove("vibrar-clic"), 200);
    }

    setOro(prev => {
      const nuevo = prev + 1;
      if (nuevo === 50) {
        setGanado(true);
        ganarPremio("clicker");
      }
      return nuevo;
    });
  };

  const reset = () => { setModo(null); setOro(0); setGanado(false); };

  return (
    <div className="wrapper-fuera-juego">
      {/* POEMA IZQUIERDO */}
      <aside className="poema-externo">
        <p>"Busca la esencia,</p>
        <p>une el destino,</p>
        <p>bajo el amparo</p>
        <p>del ojo divino."</p>
      </aside>

      <div className="minijuego-container">
        {!modo ? (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', textShadow: '2px 2px 5px #000' }}>
              CÁMARA DE PRUEBAS
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button className="btn-egipcio" onClick={iniciarMemoria}>
                👁️ MEMORIA SAGRADA
              </button>
              <button className="btn-egipcio" onClick={() => setModo("tesoro")}>
                ☥ EL TESORO DE RA
              </button>
            </div>

            <div style={{ marginTop: '40px', borderTop: '2px solid #d4af37', paddingTop: '20px' }}>
              <h3 style={{ color: '#ffcc00' }}>🏆 RELIQUIAS: {logros.length} / 2</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '15px' }}>
                <div style={{ opacity: logros.some(p => p.id === 999) ? 1 : 0.2, fontSize: '3.5rem', filter: 'drop-shadow(0 0 10px gold)' }}>👁️‍🗨️</div>
                <div style={{ opacity: logros.some(p => p.id === 888) ? 1 : 0.2, fontSize: '3.5rem', filter: 'drop-shadow(0 0 10px gold)' }}>☥</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="juego-activo">
            <button className="btn-egipcio" onClick={reset} style={{ padding: '5px 15px', fontSize: '0.8rem', position: 'absolute', top: '10px', left: '10px' }}>
              ✕ SALIR
            </button>

            {modo === "memoria" && (
              <div style={{ marginTop: '30px' }}>
                <p style={{ fontSize: '1.2rem', color: 'gold' }}>Parejas: {aciertos} / {ICONOS.length}</p>
                <div className="grid-cartas">
                  {cartas.map(c => (
                    <div key={c.id} className={`carta ${c.volteada || c.resuelta ? "girada" : ""}`} onClick={() => {
                      if (elecciones.length < 2 && !c.volteada && !c.resuelta) {
                        const nuevas = cartas.map(ca => ca.id === c.id ? { ...ca, volteada: true } : ca);
                        setCartas(nuevas);
                        setElecciones([...elecciones, c]);
                      }
                    }}>
                      {c.volteada || c.resuelta ? c.icono : "❓"}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modo === "tesoro" && (
              <div className="escenario-tesoro" style={{ marginTop: '30px' }}>
                <h2 key={oro} style={{ fontSize: '2.5rem', color: '#ffcc00' }}>ENERGÍA: {oro} / 50</h2>
                <div className={`cofre ${ganado ? "abierto" : ""}`} onClick={clickOro} style={{ fontSize: '8rem', cursor: 'pointer' }}>
                  {ganado ? "💎" : "🏺"}
                </div>
                {ganado && (
                  <div style={{ marginTop: '20px' }}>
                    <p style={{ color: 'gold', fontWeight: 'bold', fontSize: '1.2rem' }}>¡HAS LIBERADO LA CRUZ ANKH! ☥</p>
                    <button className="btn-egipcio" onClick={reset}>RECOGER PREMIO</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <aside className="poema-externo">
        <p>"Golpea el sello,</p>
        <p>fuerza de león,</p>
        <p>rompe el misterio</p>
        <p>de la antigua unión."</p>
      </aside>
    </div>
  );
}