import React, { useState } from "react";

const Filho = React.memo(({ texto }: { texto: string }) => {
    console.log('Filho renderizou');
    return <p>{texto}</p>;
});

const Daughter = ({ text }: { text: string })=> {
    console.log('Filha renderizou');
    return <p>Filha: {text}</p>
}

const Pai = () => {
    const [contador, setContador] = useState(0);

    return (
        <>
            <Filho texto="Olá mundo" />
            <Daughter text="Filhaaaaaaaaaaa" />
            <p>AI PAI: {contador}</p>
            <button onClick={() => setContador(c => c + 1)}>Incrementar</button>
        </>
    );
};

export default Pai;