import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminLayout from './AdminLayout';

export default function Settings() {
    const { repo, clearStorage } = useAuth();

    const handleReset = () => {
        if (confirm("Are you sure? You will need to re-enter your GitHub Token and Passphrase.")) {
            clearStorage();
            window.location.reload();
        }
    };

    return (
        <AdminLayout title="Settings">
            <div className="card" style={{ maxWidth: '600px' }}>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Connection Details</h3>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Connected Repository</label>
                    <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{repo || 'Not Connected'}</div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
                    <h3 style={{ marginBottom: 'var(--space-2)', color: '#dc2626' }}>Danger Zone</h3>
                    <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-muted)' }}>
                        Resetting will remove the encrypted token from your browser. You will remain logged out until you set it up again.
                    </p>
                    <button onClick={handleReset} className="btn" style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }}>
                        Reset Credentials & Logout
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
