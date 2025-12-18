import React from "react";

function Videos() {
  const videos = [
    "/videos/1.mp4",
    "/videos/2.mp4",
    "/videos/3.mp4"
  ];

  return (
    <section id="videos" className="videos-container">
      <h3 className="videos-title">Videos Relacionados</h3>

      <div className="videos-grid">
        {videos.map((video, index) => (
          <div className="video-card" key={index}>
            <video controls>
              <source src={video} type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Videos;
