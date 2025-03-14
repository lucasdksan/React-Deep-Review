import axios from "axios";
import { useEffect, useState } from "react";

export const UsersListAxios = () => {
    const [users, setUsers] = useState<{ id: any; name: any; }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Erro:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando...</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
