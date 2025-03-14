import { useEffect, useRef, useState } from "react";

export function UsersListDouble() {
    const [users, setUsers] = useState<{ id: any; name: any; }[]>([]);
    const [loading, setLoading] = useState(true);
    const fetched = useRef(false); // 🔑 Controla se já buscamos os dados

    useEffect(() => {
        if (fetched.current) return; // 🔑 Evita execução duplicada
        fetched.current = true;

        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                console.log("Double: ", { data });
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
