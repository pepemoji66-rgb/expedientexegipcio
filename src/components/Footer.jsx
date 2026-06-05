import React from "react";

function Footer({ setSeccionActiva }) {
  const navegarA = (seccion) => {
    setSeccionActiva(seccion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" style={{ textAlign: "center", padding: "30px 20px", background: "rgba(10, 10, 15, 0.95)", borderTop: "2px solid #c5a059" }}>
      <p style={{ color: "#c5a059", fontFamily: "Cinzel, serif", fontSize: "1.1rem", marginBottom: "15px", letterSpacing: "1px" }}>
        MISTERIOS DE EGIPTO
      </p>
      
      <div className="footer-links" style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "15px", flexWrap: "wrap" }}>
        <button 
          onClick={() => navegarA("contacto")} 
          style={{ background: "none", border: "none", color: "#f4e6b2", cursor: "pointer", textDecoration: "underline", fontSize: "0.9rem" }}
        >
          Contacto
        </button>
        <button 
          onClick={() => navegarA("privacidad")} 
          style={{ background: "none", border: "none", color: "#f4e6b2", cursor: "pointer", textDecoration: "underline", fontSize: "0.9rem" }}
        >
          Política de Privacidad
        </button>
        <button 
          onClick={() => navegarA("terminos")} 
          style={{ background: "none", border: "none", color: "#f4e6b2", cursor: "pointer", textDecoration: "underline", fontSize: "0.9rem" }}
        >
          Términos de Uso
        </button>
      </div>

      <p style={{ color: "#f4e6b2", opacity: 0.7, fontSize: "0.85rem" }}>
        © {new Date().getFullYear()} — Hecho con pasión por JOSÉ MORENO JIMÉNEZ
      </p>
    </footer>
  );
}

export default Footer;
