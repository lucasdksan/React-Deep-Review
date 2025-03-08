import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter-slice";
import userReducer from "../redux/user-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: userReducer,
    },
});

// Tipagem para uso do Redux com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;