import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getManifest } from '../lib/cms';
import Fuse from 'fuse.js';
import { Calendar, ArrowRight, Lightbulb, Users, Globe, BookOpen, Brain, Zap, Search } from 'lucide-react';

// Helper to get raw image URL
const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const REPO = 'spranav/StaticCMS';
    const BRANCH = 'main';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `https://raw.githubusercontent.com/${REPO}/${BRANCH}/public/${cleanPath}`;
};

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getManifest().then((data) => {
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(sorted);
            setLoading(false);
        });
    }, []);

    // Search Logic
    const fuse = new Fuse(posts, { keys: ['title', 'excerpt'] });
    const filteredPosts = search ? fuse.search(search).map(r => r.item) : posts;

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section" style={{ background: 'linear-gradient(180deg, var(--color-surface-50) 0%, transparent 100%)' }}>
                <div className="container">
                    <div style={{ marginBottom: 'var(--space-4)', display: 'inline-block', padding: '4px 12px', background: 'var(--color-brand-50)', color: 'var(--color-brand-600)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
                        Welcome to the Future of Research
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--space-6)', lineHeight: '1.1' }}>
                        Accelerate Research with <br />
                        <span className="text-gradient">Mission 2031</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
                        A global, inclusive knowledge-sharing system designed to accelerate scientific discovery and collaborative imagination for a sustainable future.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                        <a href="#articles" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
                            Start Reading
                        </a>
                        <a href="#about" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Purpose Section */}
            <section id="about" className="section">
                <div className="container">
                    <h2 className="section-title">Purpose of the Platform</h2>
                    <div className="grid-3">
                        <div className="card">
                            <div style={{ color: 'var(--color-brand-600)', marginBottom: 'var(--space-4)' }}><Globe size={32} /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Global Inclusivity</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Provide a voice and visibility to formal and informal researchers across the globe.</p>
                        </div>
                        <div className="card">
                            <div style={{ color: 'var(--color-brand-600)', marginBottom: 'var(--space-4)' }}><Zap size={32} /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Accelerate Discovery</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Accelerate scientific and intellectual research through Multilevel Scientific Research (MSR).</p>
                        </div>
                        <div className="card">
                            <div style={{ color: 'var(--color-brand-600)', marginBottom: 'var(--space-4)' }}><Brain size={32} /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Collaborative Imagination</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Enable idea generation, validation, and application for long-term sustainability.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Users */}
            <section className="section" style={{ background: 'var(--color-surface-50)' }}>
                <div className="container">
                    <h2 className="section-title">Who is this for?</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
                        {['Students & Scholars', 'Informal Researchers', 'Formal Scientists', 'Policy Thinkers', 'Innovators'].map(user => (
                            <div key={user} style={{ background: 'white', padding: '1rem 2rem', borderRadius: '50px', boxShadow: 'var(--shadow-sm)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Users size={18} className="text-gradient" /> {user}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Types / Latest Articles */}
            <section id="articles" className="section">
                <div className="container">
                    <h2 className="section-title">Articles & Ideas</h2>
                    <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--space-8)', color: 'var(--color-text-muted)' }}>
                        Explore scientific articles, philosophical postulates, and creative research content.
                    </p>

                    {/* Search Bar */}
                    <div style={{ maxWidth: '400px', margin: '0 auto var(--space-8)', position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ paddingLeft: '40px', borderRadius: '50px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
                        />
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading content...</div>
                    ) : (
                        <div className="grid-3">
                            {filteredPosts.map((post) => (
                                <article key={post.slug} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    {post.coverImage && (
                                        <div style={{ height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                                            <img
                                                src={getImageUrl(post.coverImage)}
                                                alt={post.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    )}
                                    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-3)' }}>
                                            <Calendar size={14} />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                            <span style={{ margin: '0 4px' }}>•</span>
                                            <BookOpen size={14} />
                                            <span>Article</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-3)', lineHeight: '1.3' }}>
                                            <Link to={`/post/${post.slug}`} style={{ color: 'var(--color-text-main)' }}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', flex: 1 }}>
                                            {post.excerpt}
                                        </p>
                                        <Link to={`/post/${post.slug}`} style={{ color: 'var(--color-brand-600)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                    {filteredPosts.length === 0 && !loading && (
                        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
                            {search ? 'No matches found.' : 'No posts found.'}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
