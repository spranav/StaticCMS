import { Quote, User, Target, Globe, BookOpen } from 'lucide-react';

export default function About() {
    return (
        <div style={{ paddingBottom: 'var(--space-12)' }}>
            {/* Header Section */}
            <div style={{ background: 'var(--color-surface-50)', padding: 'var(--space-12) 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>

                        {/* Image */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: '10px -10px -10px 10px', background: 'var(--gradient-brand)', borderRadius: 'var(--radius-xl)', opacity: 0.2 }}></div>
                            <img
                                src="/assets/images/founder.jpg"
                                alt="Mr. B. P. Thirupalu"
                                style={{ width: '100%', borderRadius: 'var(--radius-xl)', position: 'relative', boxShadow: 'var(--shadow-lg)' }}
                            />
                        </div>

                        {/* Title Info */}
                        <div>
                            <div style={{ display: 'inline-block', padding: 'var(--space-2) var(--space-4)', background: 'var(--color-brand-100)', color: 'var(--color-brand-700)', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
                                Founder & Visionary
                            </div>
                            <h1 className="text-gradient" style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: 'var(--space-4)' }}>
                                Mr. B. P. Thirupalu
                            </h1>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '400', marginBottom: 'var(--space-6)' }}>
                                Visionary Educator and Catalyst for Civilizational Advancement
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                                A distinguished mathematics faculty member with over two decades of experience at a premier institution under the Government of India. Driven by an innate spirit of creativity, innovation, and a profound concern for humanity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: 'var(--space-12)' }}>
                {/* Philosophy Section */}
                <section className="section">
                    <div className="card" style={{ borderLeft: '4px solid var(--color-brand-500)' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                            <Quote size={40} style={{ color: 'var(--color-brand-200)', flexShrink: 0 }} />
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>The Philosophy</h3>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: 'var(--space-4)' }}>
                                    Recognizing the urgent need to revitalize teaching methodologies, Mr. Thirupalu initially focused on pioneering fun-filled and effective educational techniques. This led him to a broader realization:
                                    <strong> education is intrinsically linked to the larger system of human civilization</strong>, interconnected with facets such as economy, society, and governance.
                                </p>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                                    "Weak democracies and unregulated capitalism are critical threats to global stability and human flourishing."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission 2031 Section */}
                <section className="section">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--color-surface-100)', padding: 'var(--space-2) var(--space-6)', borderRadius: '50px', color: 'var(--color-text-main)', fontWeight: '600' }}>
                            <Target size={20} className="text-gradient" /> The Initiative
                        </div>
                        <h2 className="section-title" style={{ marginTop: 'var(--space-4)' }}>Mission 2031</h2>
                    </div>

                    <div className="grid-3">
                        <div className="card" style={{ background: 'var(--gradient-brand)', color: 'white' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <Globe size={24} /> Strengthen Democracies
                            </h3>
                            <p style={{ opacity: 0.9 }}>Through a globally educated populace, creating informed citizens capable of sustaining free societies.</p>
                        </div>
                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-brand-600)' }}>
                                <BookOpen size={24} /> Accelerate Science
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Accelerate scientific development to unprecedented levels by democratizing research and inquiry.</p>
                        </div>
                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-brand-600)' }}>
                                <User size={24} /> Sustainable Habitat
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Transform Earth into a truly joyful and sustainable habitat, securing the long-term future of human civilization.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
                        As part of this mission, Mr. Thirupalu has developed innovative, cost-effective, and joyful teaching techniques, successfully implementing them in his classrooms. He has also formulated groundbreaking postulates across diverse fields—including economics, education, religion, and science—which he believes can unlock new pathways to progress.
                    </div>
                </section>

                {/* MSR Platform Section */}
                <section className="section" style={{ background: 'var(--color-surface-50)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>Multilevel Scientific Research (MSR)</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: 'var(--space-4)' }}>
                                This website serves as a vital platform to foster <strong>Multilevel Scientific Research (MSR)</strong>. It invites individuals from all backgrounds, not exclusively formal scientists, to contribute their unique insights, experiences, and imaginative ideas.
                            </p>
                            <div style={{ padding: 'var(--space-6)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--color-brand-600)' }}>
                                    "By democratizing research and providing a platform for collaboration, MSR seeks to accelerate scientific discovery, nurture the inherent spirit of inquiry in every human, and channel collective intelligence towards solving humanity's most pressing challenges."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="section" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-6)' }}>Join the Mission</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', maxWidth: '700px', margin: '0 auto var(--space-8)' }}>
                        Mr. Thirupalu warmly invites individuals, institutions, and organizations to join hands with him in realizing the transformative objectives of Mission 2031.
                    </p>
                    <a href="mailto:contact@mission2031.org" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                        Get in Touch
                    </a>
                </section>
            </div>
        </div>
    );
}
