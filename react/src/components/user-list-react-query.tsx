import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUsers() {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    return data;
}

export const UserListReactQuery = () => {
    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, // Dados são considerados frescos por 5 minutos
    });

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao buscar dados</p>;

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <button onClick={() => refetch()}>Recarregar</button>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}