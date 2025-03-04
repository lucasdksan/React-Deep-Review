import { useState, useEffect } from "react";

function Relogio() {
    const [hora, setHora] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalo = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(intervalo); // Limpa o intervalo quando o componente desmonta
        };
    }, []);

    return <p>{hora}</p>;
}

export default Relogio;
