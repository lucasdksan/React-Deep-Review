import { useTheme } from "../contexts/theme-context";

export const ContextBTN = () => {
    const { tema, alternarTema } = useTheme();

    return (
        <button onClick={alternarTema} style={{ background: tema === "dark" ? "#333" : "#fff", color: tema === "dark" ? "#fff" : "#000" }}>
            Alternar para {tema === "light" ? "Escuro" : "Claro"}
        </button>
    );
}