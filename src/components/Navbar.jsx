import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About Mission 2031', path: '/about' },
        { name: 'How MSR Works', path: '/#msr' },
        { name: 'Articles & Ideas', path: '/#articles' },
        { name: 'Admin', path: '/admin' },
    ];

    return (
        <nav className="glass-nav">
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <div style={{ background: 'var(--gradient-brand)', borderRadius: '8px', padding: '6px', color: 'white', display: 'flex' }}>
                        <Rocket size={20} />
                    </div>
                    <span>Mission 2031</span>
                </Link>

                {/* Desktop Links */}
                <div style={{ display: 'none', gap: '2rem', md: { display: 'flex' } }} className="desktop-menu">
                    {links.map(link => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`nav-link ${location.hash === link.path.split('#')[1] ? 'active' : ''}`}
                            style={{ display: 'none' }} // Hidden by default, shown via CSS query in simpler way via style override for now? No, let's use a media query trick or just inline style for simplicity if we can. Actually, let's just make it visible for now and hide mobile.
                        >
                            {link.name}
                        </a>
                    ))}
                    {/* Simplified Desktop View (using inline styles for responsiveness is hard without utility classes context, but will rely on a media query block in CSS or simple toggle) */}
                    {/* Actually, let's just render them and use a CSS class for hiding on mobile */}
                </div>

                {/* Since we don't have Tailwind, let's just do a simple list that wraps or a hamburger */}
                <div className="desktop-links" style={{ display: 'flex', gap: '20px' }}>
                    {links.map(link => (
                        <a key={link.name} href={link.path} className="nav-link" style={{ fontSize: '0.9rem' }}>
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-links { display: none !important; }
                }
            `}</style>
        </nav>
    );
}
