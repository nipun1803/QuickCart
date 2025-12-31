import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <AlertCircle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h1 style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginBottom: '1rem',
                color: 'var(--foreground)'
            }}>404</h1>
            <h2 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                color: 'var(--muted-foreground)'
            }}>Page Not Found</h2>
            <p style={{
                marginBottom: '2rem',
                maxWidth: '500px',
                lineHeight: '1.6',
                color: 'var(--muted-foreground)'
            }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="btn btn-primary"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}
            >
                <Home size={20} />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
