import React from "react";

function Footer() {
  return (
    <footer className="site-footer">
      <p>© <span id="year">{new Date().getFullYear()}</span> Mi Página — Hecho por JOSE MORENO JIMÉNEZ</p>
    </footer>
  );
}

export default Footer;
