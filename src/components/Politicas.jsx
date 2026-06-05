import React from "react";

export default function Politicas({ tipo }) {
  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", minHeight: "80vh" }}>
      <div 
        className="papiro-tab-content" 
        style={{ 
          maxWidth: "800px", 
          width: "100%", 
          backgroundLinearGradient: "linear-gradient(rgba(244, 228, 188, 0.95), rgba(228, 204, 152, 0.95))",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          borderRadius: "8px"
        }}
      >
        {tipo === "privacidad" ? (
          <>
            <h2 className="papiro-title" style={{ textAlign: "center", textTransform: "uppercase" }}>
              𓋹 Política de Privacidad 𓋹
            </h2>
            <p className="papiro-text">
              En <strong>Misterios de Egipto</strong>, accesible desde <em>paginaweb-react.onrender.com</em>, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que son recopilados y registrados por nuestro sitio y cómo los utilizamos.
            </p>
            <br />
            <h3 style={{ color: "#5d4037", fontSize: "1.2rem", fontWeight: "bold" }}>Archivos de Registro</h3>
            <p className="papiro-text">
              Seguimos un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada por los archivos de registro incluye direcciones de protocolo de internet (IP), tipo de navegador, proveedor de servicios de internet (ISP), sello de fecha y hora, páginas de referencia/salida y posiblemente el número de clics.
            </p>
            <br />
            <h3 style={{ color: "#5d4037", fontSize: "1.2rem", fontWeight: "bold" }}>Cookies y Web Beacons</h3>
            <p className="papiro-text">
              Como cualquier otro sitio web, nuestro sitio utiliza "cookies". Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web a las que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios al personalizar el contenido de nuestra página web en función del tipo de navegador de los visitantes y/u otra información.
            </p>
            <br />
            <h3 style={{ color: "#5d4037", fontSize: "1.2rem", fontWeight: "bold" }}>Políticas de Privacidad de Terceros (AdSense)</h3>
            <p className="papiro-text">
              Los servidores de anuncios o redes de anuncios de terceros utilizan tecnologías como cookies, JavaScript o Web Beacons que se utilizan en sus respectivos anuncios y enlaces que aparecen en nuestro sitio, los cuales se envían directamente al navegador de los usuarios. Reciben automáticamente su dirección IP cuando esto ocurre. Estas tecnologías se utilizan para medir la efectividad de sus campañas publicitarias y/o para personalizar el contenido publicitario que ve en los sitios web que visita.
            </p>
          </>
        ) : (
          <>
            <h2 className="papiro-title" style={{ textAlign: "center", textTransform: "uppercase" }}>
              𓋹 Términos de Uso 𓋹
            </h2>
            <p className="papiro-text">
              ¡Bienvenido a <strong>Misterios de Egipto</strong>! Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web.
            </p>
            <br />
            <p className="papiro-text">
              Al acceder a este sitio web, asumimos que acepta estos términos y condiciones. No continúe usando el sitio si no está de acuerdo en aceptar todos los términos y condiciones establecidos en esta página.
            </p>
            <br />
            <h3 style={{ color: "#5d4037", fontSize: "1.2rem", fontWeight: "bold" }}>Licencia de Contenido</h3>
            <p className="papiro-text">
              A menos que se indique lo contrario, <strong>Misterios de Egipto</strong> y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en este sitio. Todos los derechos de propiedad intelectual están reservados. Puede acceder a esto para su uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
            </p>
            <br />
            <h3 style={{ color: "#5d4037", fontSize: "1.2rem", fontWeight: "bold" }}>Restricciones</h3>
            <p className="papiro-text">
              Está específicamente restringido de todo lo siguiente:
              <ul style={{ marginLeft: "20px", marginTop: "5px" }}>
                <li>Publicar cualquier material del sitio web en cualquier otro medio.</li>
                <li>Vender, sublicenciar y/o comercializar de otro modo cualquier material del sitio web.</li>
                <li>Usar este sitio web de cualquier manera que sea o pueda ser dañina para este sitio web.</li>
                <li>Usar este sitio web contrariamente a las leyes y regulaciones aplicables.</li>
              </ul>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
