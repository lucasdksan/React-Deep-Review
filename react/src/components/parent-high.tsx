import { useState, useCallback } from "react";

const Child = ({ onClick }: { onClick: () => void }) => {
    console.log("Renderizou o Child!");
    return <button onClick={onClick}>Clique aqui</button>;
};

export const ParentHigh = () => {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState("");

    // `useCallback` memoriza a função e só a recria se `setCount` mudar
    const handleClick = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

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