import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const UsersListSWR = () => {
    const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os dados.</p>;

    return (
        <ul>
            {data.map((user: { id: any; name: any; }) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}