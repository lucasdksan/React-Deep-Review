import { useEffect, useState } from "react";

export function UsersListAbort() {
    const [users, setUsers] = useState<{ id: any; name: any; }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal });
                if (!response.ok) throw new Error("Erro ao buscar dados");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
                // if (error.name !== "AbortError") {
                //     console.error("Erro ao buscar usuários:", error);
                // }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        return () => {
            controller.abort(); // Cancela a requisição se o componente for desmontado
        };
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
