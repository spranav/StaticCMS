import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentAuth } from '../../hooks/useContentAuth';
import { Lock, Github, Key, Database } from 'lucide-react';

export default function Login() {
    const { isEncrypted, setup, login, loading, clearStorage } = useContentAuth();
    const navigate = useNavigate();

    const [passphrase, setPassphrase] = useState('');
    const [rawToken, setRawToken] = useState('');
    const [repoPath, setRepoPath] = useState('');
    const [error, setError] = useState('');
    const [isSetupMode, setIsSetupMode] = useState(false);

    if (loading) return null;

    // Mode decision: If no encrypted token, force setup
    const showSetup = !isEncrypted || isSetupMode;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Attempting login...");
        try {
            login(passphrase);
            console.log("Login function completed, navigating...");
            navigate('/admin/dashboard');
        } catch (err) {
            console.error("Login failed:", err);
            setError("Incorrect passphrase.");
        }
    };

    const handleSetup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const cleanToken = rawToken.trim();
            const cleanRepo = repoPath.trim();
            await setup(cleanToken, passphrase, cleanRepo);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || "Failed to setup. Check token validity.");
        }
    };

    return (
        <div className="container" style={{ marginTop: 'var(--space-12)', maxWidth: '400px' }}>
            <div className="card">
                <header style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                        {showSetup ? 'Setup CMS' : 'Admin Login'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {showSetup ? 'Configure your GitHub access' : 'Enter passphrase to decrypt token'}
                    </p>
                </header>

                {error && (
                    <div style={{ background: '#fee2e2', color: '#dc2626', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                {showSetup ? (
                    <form onSubmit={handleSetup} style={{ display: 'grid', gap: 'var(--space-4)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>GitHub Repository (user/repo)</label>
                            <div style={{ position: 'relative' }}>
                                <Database size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-muted)' }} />
                                <input type="text" value={repoPath} onChange={(e) => setRepoPath(e.target.value)} placeholder="e.g. username/my-blog" style={{ paddingLeft: '35px' }} required />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>GitHub Personal Access Token</label>
                            <div style={{ position: 'relative' }}>
                                <Github size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-muted)' }} />
                                <input type="password" value={rawToken} onChange={(e) => setRawToken(e.target.value)} placeholder="ghp_..." style={{ paddingLeft: '35px' }} required />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>Set a Passphrase (Encryption Key)</label>
                            <div style={{ position: 'relative' }}>
                                <Key size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-muted)' }} />
                                <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} placeholder="Secret phrase" style={{ paddingLeft: '35px' }} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save & Encrypt</button>
                        {isEncrypted && <button type="button" onClick={() => setIsSetupMode(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Cancel Setup</button>}
                    </form>
                ) : (
                    <form onSubmit={handleLogin} style={{ display: 'grid', gap: 'var(--space-4)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>Enter Passphrase</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-muted)' }} />
                                <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} style={{ paddingLeft: '35px' }} autoFocus required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Unlock Admin</button>
                        <div style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
                            <button type="button" onClick={() => { if (confirm('Reset all credentials?')) clearStorage(); }} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.8rem', textDecoration: 'underline' }}>
                                Reset Credentials
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
