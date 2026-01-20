import React, { useState } from 'react';

function AddMovie({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel fade-in" style={{ padding: '20px', marginBottom: '30px', display: 'flex', gap: '10px' }}>
            <input
                type="text"
                placeholder="Add a movie..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none'
                }}
            />
            <button
                type="submit"
                style={{
                    background: 'var(--accent-color)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    boxShadow: '0 0 15px var(--accent-glow)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
                Add
            </button>
        </form>
    );
}

export default AddMovie;
