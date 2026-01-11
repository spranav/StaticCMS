import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'MSR Framework', path: '/msr' },
        { name: 'Articles', path: '/#articles' },
        { name: 'Admin', path: '/admin' },
    ];

    return (
        <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 'bold' }} onClick={() => setIsOpen(false)}>
                    <div style={{ background: 'var(--gradient-brand)', borderRadius: '8px', padding: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rocket size={20} />
                    </div>
                    <span>Mission 2031</span>
                </Link>

                {/* Desktop Links (Hidden on Mobile) */}
                <div className="desktop-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {links.map(link => (
                        <a key={link.name} href={link.path} className="nav-link" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle Button (Visible on Mobile) */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--color-text-main)' }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '70px',
                    left: 0,
                    right: 0,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: 'var(--space-4)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {links.map(link => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="nav-link"
                                style={{ fontSize: '1.1rem', padding: '8px 0', borderBottom: '1px solid var(--color-surface-200)' }}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                .mobile-toggle { display: none !important; }
                .mobile-menu { display: none; }
                
                @media (max-width: 768px) {
                    .desktop-links { display: none !important; }
                    .mobile-toggle { display: block !important; }
                    .mobile-menu { display: block; }
                }
            `}</style>
        </nav>
    );
}
