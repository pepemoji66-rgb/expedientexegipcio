import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Este componente es el que "mueve" la cámara y activa el rojo
function ManejadorMapa({ imagenes, setIdResaltado }) {
  const map = useMap();

  useEffect(() => {
    const centroGuardado = localStorage.getItem("centro_mapa");
    const idGuardado = localStorage.getItem("id_resaltado");

    if (centroGuardado) {
      const { lat, lon } = JSON.parse(centroGuardado);

      // Volamos al punto que pulsamos en la galería
      map.flyTo([lat, lon], 14, { duration: 2 });

      if (idGuardado) {
        // Marcamos este ID como el "activo" para que se ponga rojo
        setIdResaltado(Number(idGuardado));
      }

      // Limpiamos para que al refrescar no se quede "atrapado" en ese punto
      localStorage.removeItem("centro_mapa");
      localStorage.removeItem("id_resaltado");
    } else if (imagenes && imagenes.length > 0) {
      // Si entramos normal al mapa, encuadramos todos los puntos
      const validPoints = imagenes
        .filter(img => img.latitud && img.longitud)
        .map(img => [Number(img.latitud), Number(img.longitud)]);

      if (validPoints.length > 0) {
        map.fitBounds(validPoints, { padding: [50, 50], maxZoom: 12 });
      }
    }
  }, [imagenes, map, setIdResaltado]);

  return null;
}

const MapaInteractivo = ({ imagenes }) => {
  const [idResaltado, setIdResaltado] = useState(null);

  // ICONO AZUL (Normal)
  const customIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // ICONO ROJO (Cuando vienes de la galería)
  const iconActivo = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [30, 46], iconAnchor: [15, 46], popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  return (
    <div style={{
      width: "100vw", height: "calc(100vh - 80px)", position: "relative",
      left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw",
      marginTop: "-20px", zIndex: 10
    }}>
      <MapContainer center={[26.8206, 30.8025]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapa Político">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Visión Satélite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>
        </LayersControl>

        <ManejadorMapa imagenes={imagenes} setIdResaltado={setIdResaltado} />

        {imagenes.map((img) => (
          img.latitud && img.longitud && (
            <Marker
              key={img.id}
              position={[Number(img.latitud), Number(img.longitud)]}
              // Si el ID coincide con el que guardamos en localStorage, se pone ROJO
              icon={idResaltado === img.id ? iconActivo : customIcon}
            >
              <Popup>
                <div style={{ textAlign: "center", minWidth: "150px" }}>
                  <img src={img.url} alt={img.titulo} style={{ width: "100%", borderRadius: "5px" }} />
                  <strong style={{ display: "block", marginTop: "5px" }}>{img.titulo}</strong>
                  <p style={{ fontSize: "12px", margin: "5px 0" }}>{img.descripcion}</p>
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