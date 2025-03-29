import { useState } from "react";

const Child = ({ onClick }: { onClick: () => void }) => {
    console.log("Renderizou o Child!");
    return <button onClick={onClick}>Clique aqui</button>;
};

export const ParentLow = () => {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState("");

    // Sem `useCallback`, a função é recriada a cada renderização
    const handleClick = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <div>
            <h2>Contador: {count}</h2>
            <Child onClick={handleClick} />
            <input
                type="text"
                placeholder="Outro estado"
                value={otherState}
                onChange={(e) => setOtherState(e.target.value)}
            />
        </div>
    );
}