import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ManejadorMapa: vuela suavemente al marcador seleccionado y encuadra los puntos
function ManejadorMapa({ imagenes = [], expedientes = [], misterios = [], setIdResaltado }) {
  const map = useMap();

  useEffect(() => {
    const centroGuardado = localStorage.getItem("centro_mapa");
    const idGuardado = localStorage.getItem("id_resaltado");

    if (centroGuardado) {
      const { lat, lon } = JSON.parse(centroGuardado);

      // Volamos al punto geográfico (zoom 13 para vista de satélite equilibrada)
      map.flyTo([lat, lon], 13, { duration: 2 });

      if (idGuardado) {
        setIdResaltado(idGuardado);
      }

      // Limpiamos
      localStorage.removeItem("centro_mapa");
      localStorage.removeItem("id_resaltado");
    } else {
      // Si entramos normal al mapa, encuadramos todos los marcadores existentes
      const ptsImg = imagenes.filter(i => i.latitud && i.longitud).map(i => [Number(i.latitud), Number(i.longitud)]);
      const ptsExp = expedientes.filter(e => e.latitud && e.longitud).map(e => [Number(e.latitud), Number(e.longitud)]);
      const ptsMis = misterios.filter(m => m.latitud && m.longitud).map(m => [Number(m.latitud), Number(m.longitud)]);

      const allPoints = [...ptsImg, ...ptsExp, ...ptsMis];

      if (allPoints.length > 0) {
        map.fitBounds(allPoints, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }, [imagenes, expedientes, misterios, map, setIdResaltado]);

  return null;
}

const MapaInteractivo = ({ imagenes = [], expedientes = [], misterios = [], setSeccionActiva }) => {
  const [idResaltado, setIdResaltado] = useState(null);

  // 1. ICONO AZUL (Imágenes de la Galería)
  const iconImagen = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // 2. ICONO DORADO (Dosieres Históricos / Expedientes)
  const iconDosier = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // 3. ICONO VIOLETA (Misterios)
  const iconMisterio = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // 4. ICONO ROJO (Cuando el elemento está seleccionado / activo)
  const iconActivo = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [30, 46], iconAnchor: [15, 46], popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // Redirigir de forma contextual basándose en el tipo y título del marcador
  const irAlTemplo = (item, tipo) => {
    if (tipo === "expediente") {
      localStorage.setItem("dossier_abierto_id", item.id);
      if (setSeccionActiva) setSeccionActiva("expedientes");
    } else if (tipo === "misterio") {
      localStorage.setItem("misterio_abierto_id", item.id);
      if (setSeccionActiva) setSeccionActiva("misterios");
    } else {
      // Es una imagen de la galería. Comprobamos título/descripción
      const tit = (item.titulo || "").toLowerCase();
      const desc = (item.descripcion || "").toLowerCase();

      if (tit.includes("esfinge") || desc.includes("esfinge") || tit.includes("sphinx") || desc.includes("sphinx")) {
        if (setSeccionActiva) setSeccionActiva("esfinge");
      } else if (tit.includes("orion") || tit.includes("orión") || desc.includes("orion")) {
        // Redirigir e intentar abrir la tarjeta de Orión en Misterios
        localStorage.setItem("misterio_abierto_id", "orion-correlation");
        if (setSeccionActiva) setSeccionActiva("misterios");
      } else if (tit.includes("pirámide") || tit.includes("piramide") || tit.includes("pyramid") || tit.includes("keops")) {
        // Redirigir e intentar abrir la Era de las Pirámides en Expedientes
        localStorage.setItem("dossier_abierto_id", "imperio-antiguo");
        if (setSeccionActiva) setSeccionActiva("expedientes");
      } else {
        if (setSeccionActiva) setSeccionActiva("galeria");
      }
    }
  };

  return (
    <div style={{
      width: "100vw", height: "calc(100vh - 80px)", position: "relative",
      left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw",
      marginTop: "-20px", zIndex: 10
    }}>
      {/* Mapa centrado inicialmente en la Meseta de Giza */}
      <MapContainer center={[29.9792, 31.1342]} zoom={15} style={{ height: "100%", width: "100%" }}>
        {/* Usamos única y exclusivamente la visión Satélite de ESRI */}
        <TileLayer 
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />

        <ManejadorMapa 
          imagenes={imagenes} 
          expedientes={expedientes} 
          misterios={misterios} 
          setIdResaltado={setIdResaltado} 
        />

        {/* 1. MARCADORES DE IMÁGENES DE GALERÍA (AZUL / ROJO) */}
        {imagenes.map((img) => (
          img.latitud && img.longitud && (
            <Marker
              key={`img-${img.id}`}
              position={[Number(img.latitud), Number(img.longitud)]}
              icon={String(idResaltado) === String(img.id) ? iconActivo : iconImagen}
              zIndexOffset={String(idResaltado) === String(img.id) ? 1000 : 0}
            >
              <Popup>
                <div style={{ textAlign: "center", minWidth: "160px" }}>
                  <img src={img.url} alt={img.titulo} style={{ width: "100%", borderRadius: "5px" }} />
                  <strong style={{ display: "block", marginTop: "5px", color: "#333" }}>{img.titulo}</strong>
                  <p style={{ fontSize: "11px", margin: "5px 0", color: "#555" }}>{img.descripcion}</p>
                  <button 
                    onClick={() => irAlTemplo(img, "galeria")}
                    style={{
                      background: "#c5a059", color: "#1a140e", border: "none", borderRadius: "4px",
                      padding: "5px 10px", fontSize: "11px", cursor: "pointer", fontWeight: "bold", width: "100%",
                      marginTop: "5px"
                    }}
                  >
                    𓉴 Investigar en el Templo
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}

        {/* 2. MARCADORES DE DOSIERES HISTÓRICOS (DORADO / ROJO) */}
        {expedientes.map((exp) => (
          exp.latitud && exp.longitud && (
            <Marker
              key={`exp-${exp.id}`}
              position={[Number(exp.latitud), Number(exp.longitud)]}
              icon={idResaltado === `expediente-${exp.id}` ? iconActivo : iconDosier}
              zIndexOffset={idResaltado === `expediente-${exp.id}` ? 1000 : 0}
            >
              <Popup>
                <div style={{ textAlign: "center", minWidth: "160px" }}>
                  {exp.imagen && <img src={exp.imagen} alt={exp.titulo} style={{ width: "100%", borderRadius: "5px" }} />}
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: "#c5a059", display: "block", marginTop: "4px" }}>
                    📜 DOSIER HISTÓRICO ({exp.sigla})
                  </span>
                  <strong style={{ display: "block", marginTop: "3px", color: "#333" }}>{exp.titulo}</strong>
                  <p style={{ fontSize: "11px", margin: "5px 0", color: "#555" }}>{exp.resumen}</p>
                  <button 
                    onClick={() => irAlTemplo(exp, "expediente")}
                    style={{
                      background: "#2b4c7e", color: "#fff", border: "none", borderRadius: "4px",
                      padding: "5px 10px", fontSize: "11px", cursor: "pointer", fontWeight: "bold", width: "100%",
                      marginTop: "5px"
                    }}
                  >
                    𓉴 Investigar en el Templo
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}

        {/* 3. MARCADORES DE MISTERIOS (VIOLETA / ROJO) */}
        {misterios.map((mis) => (
          mis.latitud && mis.longitud && (
            <Marker
              key={`mis-${mis.id}`}
              position={[Number(mis.latitud), Number(mis.longitud)]}
              icon={idResaltado === `misterio-${mis.id}` ? iconActivo : iconMisterio}
              zIndexOffset={idResaltado === `misterio-${mis.id}` ? 1000 : 0}
            >
              <Popup>
                <div style={{ textAlign: "center", minWidth: "160px" }}>
                  {mis.imagen && <img src={mis.imagen} alt={mis.titulo} style={{ width: "100%", borderRadius: "5px" }} />}
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: "#8b5cf6", display: "block", marginTop: "4px" }}>
                    {mis.icono || "𓂀"} ENIGMA DE GIZA
                  </span>
                  <strong style={{ display: "block", marginTop: "3px", color: "#333" }}>{mis.titulo}</strong>
                  <p style={{ fontSize: "11px", margin: "5px 0", color: "#555" }}>{mis.resumen}</p>
                  <button 
                    onClick={() => irAlTemplo(mis, "misterio")}
                    style={{
                      background: "#5b21b6", color: "#fff", border: "none", borderRadius: "4px",
                      padding: "5px 10px", fontSize: "11px", cursor: "pointer", fontWeight: "bold", width: "100%",
                      marginTop: "5px"
                    }}
                  >
                    𓉴 Investigar en el Templo
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaInteractivo;