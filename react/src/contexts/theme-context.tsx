import { createContext, useState, useContext } from "react";

type ThemeContextType = {
    tema: string;
    alternarTema: () => void;
}

const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [tema, setTema] = useState("light");

    const alternarTema = () => {
        setTema((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ tema, alternarTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
