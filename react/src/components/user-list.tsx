import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { fetchUsers } from "../redux/user-slice";

export function UserList() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
