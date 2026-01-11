import { Link, useNavigate } from 'react-router-dom';
import { useContentAuth } from '../../hooks/useContentAuth';
import { LogOut, Home, LayoutDashboard, Rocket } from 'lucide-react';

export default function AdminLayout({ children, title }) {
    const { logout, token } = useContentAuth();
    const navigate = useNavigate();

    // Basic protection: If not token (and not loading), we should redirect.
    // Ideally this is done in a parent route or HOC, but useEffect here works too.
    // Note: We rely on the parent component checking `token` usually.

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-surface-50)' }}>
            <nav style={{ background: 'white', borderBottom: '1px solid var(--color-border)', padding: 'var(--space-4) 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-brand-600)' }}>
                            <div style={{ background: 'var(--gradient-brand)', borderRadius: '8px', padding: '6px', color: 'white', display: 'flex' }}>
                                <Rocket size={20} />
                            </div>
                            <span className="text-gradient">Mission 2031</span>
                        </Link>
                        <div style={{ height: '24px', width: '1px', background: 'var(--color-border)' }}></div>
                        <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-main)' }}>
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                        <button onClick={handleLogout} className="btn" style={{ color: 'var(--color-text-muted)' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container" style={{ padding: 'var(--space-8) var(--space-4)' }}>
                {title && <h1 style={{ marginBottom: 'var(--space-6)' }}>{title}</h1>}
                {children}
            </main>
        </div>
    );
}
