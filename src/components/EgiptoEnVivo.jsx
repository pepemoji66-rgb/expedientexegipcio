import React, { useState, useEffect } from "react";
import "./vivo.css";

export default function EgiptoEnVivo() {
    const [monumentos, setMonumentos] = useState([]);
    const [actual, setActual] = useState(null);
    const [esDirecto, setEsDirecto] = useState(false);

    useEffect(() => {
        const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") 
          ? "http://localhost:5000/api/monumentos" 
          : "/api/monumentos";
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setMonumentos(data);
                    setActual(data[0]);
                }
            })
            .catch(err => console.error("Error cargando monumentos:", err));
    }, []);

    const seleccionarDron = (m) => {
        setEsDirecto(false);
        setActual(m);
    };

    const ponerDirecto = () => {
        setEsDirecto(true);
        // Creamos un objeto temporal para la descripción del directo
        setActual({
            nombre: "PIRÁMIDES",
            titulo: "Cámara en Tiempo Real",
            descripcion: "Conexión satelital en directo con la meseta de Guiza. Observa el estado actual del cielo sobre las Pirámides."
        });
    };

    if (!actual) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>🛸 Despegando dron...</div>;

    return (
        <div className="vivo-container" style={{ background: '#121212', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Egipto Inmersivo: Vista de Dron
            </h2>

            {/* Selector de Botones */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
                {monumentos.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => seleccionarDron(m)}
                        style={{
                            padding: '10px 15px',
                            background: (!esDirecto && actual.id === m.id) ? '#ffcc00' : '#333',
                            color: (!esDirecto && actual.id === m.id) ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: '0.3s'
                        }}
                    >
                        {m.nombre}
                    </button>
                ))}

                <button
                    onClick={ponerDirecto}
                    style={{
                        padding: '10px 15px',
                        background: esDirecto ? '#ff0000' : '#440000',
                        color: '#fff',
                        border: '2px solid gold',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: esDirecto ? '0 0 15px #ff0000' : 'none',
                        transition: '0.3s'
                    }}
                >
                    🔴 EN VIVO: PIRÁMIDES
                </button>
            </div>

            {/* PANTALLA CENTRAL */}
            <div style={{
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                height: '500px',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                border: '3px solid #ffcc00',
                background: '#000',
                position: 'relative'
            }}>
                {esDirecto ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                            src="https://www.skylinewebcams.com/img/4344.jpg"
                            alt="Vista previa Pirámides"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.5' }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            width: '100%'
                        }}>
                            <button
                                onClick={() => window.open("https://www.skylinewebcams.com/es/webcam/egypt/cairo/cairo.html", "_blank")}
                                style={{
                                    padding: '15px 30px',
                                    fontSize: '1.2rem',
                                    background: '#ff0000',
                                    color: 'white',
                                    border: '2px solid gold',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    boxShadow: '0 0 20px rgba(255,0,0,0.8)'
                                }}
                            >
                                📡 CONECTAR CON SATÉLITE
                            </button>
                            <p style={{ color: 'white', marginTop: '15px', fontWeight: 'bold', textShadow: '2px 2px 4px #000' }}>
                                Pulsa para abrir señal HD en tiempo real
                            </p>
                        </div>
                    </div>
                ) : (
                    <video
                        key={actual.url_mapa}
                        width="100%"
                        height="100%"
                        autoPlay
                        loop
                        muted
                        controls
                        style={{ objectFit: 'cover' }}
                    >
                        <source src={`/assets/360/${actual.url_mapa}`} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* INFO ABAJO */}
            <div style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
                <h3 style={{ color: '#ffcc00', fontSize: '1.8rem' }}>{actual.titulo}</h3>
                <p style={{ maxWidth: '700px', margin: '10px auto', opacity: '0.8', lineHeight: '1.6' }}>
                    {actual.descripcion}
                </p>
            </div>
        </div>
    );
}