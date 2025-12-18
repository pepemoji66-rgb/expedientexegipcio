import React from "react";

export default function Instrucciones({ mostrar, onToggle }) {
  if (!mostrar) return null;

  return (
    <div
      className="panel"
      style={{
        maxWidth: "700px",
        margin: "0 auto 25px auto",
        textAlign: "left"
      }}
    >
      <h4>¿Cómo usar esta sección?</h4>
      <ol>
        <li>
          Selecciona si eres <strong>Usuario</strong> o{" "}
          <strong>Administrador</strong>.
        </li>
        <li>
          Si eres usuario, puedes iniciar sesión o crear una cuenta nueva.
        </li>
        <li>
          Si eres administrador, accede con tus credenciales.
        </li>
        <li>
          El acceso de administrador está reservado para gestión interna.
        </li>
      </ol>
    </div>
  );
}
