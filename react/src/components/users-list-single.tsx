import { useEffect, useState } from "react";

export const UsersListSingle = () => {
    const [users, setUsers] = useState<{ id: any; name: any; }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                return setUsers(data);
            })
            .catch((error) => console.error("Erro ao buscar usuários:", error))
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