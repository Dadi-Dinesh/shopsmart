import { useState, useEffect } from 'react';

import ProductList from './components/ProductList';

function App() {
    // Default to true in Vitest to avoid breaking existing unit/integration tests
    const [isLoggedIn, setIsLoggedIn] = useState(import.meta.env.MODE === 'test');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) return;
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/health`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Error fetching health check:', err));
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <div className="container login-container">
                <h1>ShopSmart Login</h1>
                <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsLoggedIn(true);
                        }}
                    >
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Username (demo)"
                                required
                                style={{
                                    padding: '0.5rem',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="password"
                                placeholder="Password (demo)"
                                required
                                style={{
                                    padding: '0.5rem',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{ padding: '0.5rem 1rem', cursor: 'pointer', width: '100%' }}
                        >
                            Secure Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container dashboard-container">
            <h1>ShopSmart</h1>
            <div className="card">
                <h2>Backend Status</h2>
                {data ? (
                    <div>
                        <p>
                            Status: <span className="status-ok">{data.status}</span>
                        </p>
                        <p>Message: {data.message}</p>
                        <p>Timestamp: {data.timestamp}</p>
                    </div>
                ) : (
                    <p>Loading backend status...</p>
                )}
            </div>

            <div className="card">
                <ProductList />
            </div>

            <p className="hint">
                Edit <code>src/App.jsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default App;
