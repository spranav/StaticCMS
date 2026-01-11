import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function PublicLayout() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-8) 0', marginTop: 'var(--space-12)', background: 'var(--color-bg-card)' }}>
                <div className="container" style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} Mission 2031. All rights reserved.</p>
                    <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
                        <a href="#" className="nav-link">Privacy Policy</a>
                        <a href="#" className="nav-link">Terms of Service</a>
                        <a href="#" className="nav-link">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
