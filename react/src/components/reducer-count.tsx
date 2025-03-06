import { useReducer } from "react";

const initialState = {
    count: 0,
}

function reducer(state: { count: number; }, action: { type: string }){
    switch (action.type) {
        case "add" : 
            return {
                count: state.count++,
            };
        case "remove":
            return {
                count: state.count--,
            };
        default:
            return state;
    }
}

export const ReducerCount = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <div>
            <span>Valor: {state.count}</span>
            <button onClick={()=> dispatch({ type: "add" })}>+1</button>
            <button onClick={()=> dispatch({ type: "remove" })}>-1</button>
        </div>
    );
}