import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getManifest } from '../../lib/cms';
import Fuse from 'fuse.js';
import AdminLayout from './AdminLayout';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function Dashboard() {
    const { token, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !token) {
            navigate('/admin/login');
        }
    }, [authLoading, token, navigate]);

    useEffect(() => {
        if (!token) return;
        getManifest().then((data) => {
            // Sort by date desc
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(sorted);
            setLoading(false);
        });
    }, [token]);

    // Search Logic
    const fuse = new Fuse(posts, { keys: ['title', 'slug'] });
    const filteredPosts = search ? fuse.search(search).map(r => r.item) : posts;

    if (authLoading || (!token)) return null;

    return (
        <AdminLayout title="Content Dashboard">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ paddingLeft: '35px' }}
                    />
                </div>
                <Link to="/admin/editor" className="btn btn-primary">
                    <Plus size={18} /> Create New
                </Link>
            </div>

            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                    {filteredPosts.map(post => (
                        <div key={post.slug} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-1)' }}>{post.title}</h3>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                    /{post.slug} • {new Date(post.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                <Link to={`/admin/editor/${post.slug}`} className="btn btn-secondary">
                                    <Edit size={16} /> Edit
                                </Link>
                                {/* Delete could be implemented here, simplified for now */}
                            </div>
                        </div>
                    ))}

                    {filteredPosts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
                            No posts found.
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
