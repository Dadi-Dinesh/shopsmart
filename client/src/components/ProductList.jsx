import { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/products`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div aria-label="loading">Loading products...</div>;
    if (error) return <div role="alert">Error: {error}</div>;

    return (
        <div className="product-list">
            <h2>Products</h2>
            <ul className="products">
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <strong>{product.name}</strong> - ${product.price}
                        <br />
                        <small>{product.category}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
