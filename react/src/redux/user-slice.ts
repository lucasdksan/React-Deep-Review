import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    users: any[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// Thunk para buscar usuários
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
});

// Criando Slice
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao buscar usuários";
            });
    },
});

export default userSlice.reducer;