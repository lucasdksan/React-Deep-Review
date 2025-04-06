import { useEffect, useRef } from "react";

export const Timer = () => {
    const count = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            count.current++;
            console.log("Tick:", count.current);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div>Veja o console</div>;
}