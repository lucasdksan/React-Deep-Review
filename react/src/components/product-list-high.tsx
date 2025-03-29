import { useState, useMemo } from "react";

const products = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Produto ${i}`,
}));

export const ProductListHigh = () => {
    const [search, setSearch] = useState("");

    // `useMemo` evita que a filtragem aconteça se `search` não mudar
    const filteredProducts = useMemo(
        () =>
            products.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            ),
        [search] // Somente refiltra se `search` mudar
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