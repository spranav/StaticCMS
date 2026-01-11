import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../lib/cms';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPost(slug).then((data) => {
            if (data) {
                setPost(data);
            } else {
                setError(true);
            }
            setLoading(false);
        });
    }, [slug]);

    if (loading) return <div className="container" style={{ marginTop: 'var(--space-12)' }}>Loading...</div>;

    if (error || !post) {
        return (
            <div className="container" style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
                <h1>Post Not Found</h1>
                <Link to="/" className="btn btn-secondary">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', color: 'var(--color-text-muted)' }}>
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <article>
                <header style={{ marginBottom: 'var(--space-8)' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>{post.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-muted)' }}>
                        <Calendar size={18} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                </header>

                <div className="post-content">
                    <MarkdownRenderer>{post.content}</MarkdownRenderer>
                </div>
            </article>
        </div>
    );
}
