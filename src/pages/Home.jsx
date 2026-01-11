import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getManifest } from '../lib/cms';
import { Calendar, ArrowRight } from 'lucide-react';

// Helper to get raw image URL
const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const REPO = 'spranav/StaticCMS';
    const BRANCH = 'main';
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `https://raw.githubusercontent.com/${REPO}/${BRANCH}/public/${cleanPath}`;
};

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getManifest().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);


    if (loading) {
        return (
            <div className="container" style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
            <header style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>The Static Blog</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Powered by Serverless JS CMS</p>
            </header>

            <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
                {posts.map((post) => (
                    <article key={post.slug} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        {post.coverImage && (
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={getImageUrl(post.coverImage)}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div style={{ padding: '2em' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                                <Link to={`/post/${post.slug}`} style={{ color: 'var(--color-text-main)' }}>
                                    {post.title}
                                </Link>
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
                                <Calendar size={16} />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-muted)' }}>{post.excerpt}</p>
                            <Link to={`/post/${post.slug}`} className="btn btn-primary">
                                Read Article <ArrowRight size={16} />
                            </Link>
                        </div>
                    </article>
                ))}

                {posts.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No posts found.</p>
                )}
            </div>
        </div>
    );
}
