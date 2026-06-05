import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Por defecto, empezamos en el Desierto
    const [tema, setTema] = useState(localStorage.getItem("templo-tema") || "desierto");

    // Cada vez que el tema cambie, lo guardamos en el "papiro" (localStorage)
    // y lo aplicamos al body para que afecte a todo el CSS
    useEffect(() => {
        localStorage.setItem("templo-tema", tema);
        document.body.className = `tema-${tema}`;
    }, [tema]);

    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
};