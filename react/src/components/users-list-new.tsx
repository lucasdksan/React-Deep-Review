import { useEffect, useState } from "react";

export const UsersListNew = () => {
    const [users, setUsers] = useState<{ id: any; name: any; }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                // console.log({ data, response });
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Executa apenas na montagem

    if (loading) return <p>Carregando...</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}