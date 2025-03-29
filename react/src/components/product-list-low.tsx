import { useState } from "react";

const products = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Produto ${i}`,
}));

export const ProductListLow = () => {
    const [search, setSearch] = useState("");

    // Sem `useMemo`, a filtragem ocorre em toda renderização (mesmo sem mudança no `search`)
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Filtrar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredProducts.map((p) => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        </div>
    );
}