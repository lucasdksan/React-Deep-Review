import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { decrement, increment, incrementByAmount } from "../redux/counter-slice";

export const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return(
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        </div>
    );
}