import React, { useRef } from "react";

const CountRefMemo = React.memo(({ label }: { label: string }) => {
    const renders = useRef(0);
    renders.current++;
    console.log(`${label} renderizou ${renders.current} vezes`);
    return <div>{label}</div>;
});

export default CountRefMemo;