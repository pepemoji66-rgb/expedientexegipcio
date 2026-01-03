import React from "react";
import "../videos.css";

export default function Videos({ videos = [] }) {
  const videosVisibles = videos
    .filter((v) => v.visible)
    .sort((a, b) => a.orden - b.orden);

  return (
    <section id="videos" className="videos-container">
      <h3 className="videos-title">Videos Relacionados</h3>

      {videosVisibles.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No hay videos disponibles.
        </p>
      ) : (
        <div className="videos-grid">
          {videosVisibles.map((video) => (
            <div className="video-card" key={video.id}>
              <video controls>
                <source src={video.src} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>

              <p style={{ marginTop: "8px", textAlign: "center" }}>
                {video.titulo}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
