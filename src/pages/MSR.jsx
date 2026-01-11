import { Globe, Zap, ShieldCheck, Microscope, Network, Lightbulb, ArrowLeftRight, ArrowUp, Repeat, Send } from 'lucide-react';

export default function MSR() {
    return (
        <div style={{ paddingBottom: 'var(--space-12)' }}>
            {/* Header / Hero */}
            <div style={{ background: 'var(--color-surface-50)', padding: 'var(--space-12) 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--color-brand-100)', color: 'var(--color-brand-700)', padding: 'var(--space-2) var(--space-4)', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: 'var(--space-6)' }}>
                        <Microscope size={18} /> Multilevel Scientific Research
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: 'var(--space-6)' }}>
                        The MSR Framework
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        Bridging the gap between theoretical science and practical, informal knowledge to accelerate discovery.
                    </p>
                </div>
            </div>

            <div className="container" style={{ marginTop: 'var(--space-12)' }}>

                {/* What is MSR? (New Section) */}
                <section className="section" style={{ marginBottom: 'var(--space-8)' }}>
                    <div style={{ background: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>What is MSR?</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
                            MSR is the core methodology of Mission 2031. It is designed to create a bridge between formal academia and the vast repository of informal, practical knowledge held by people globally. By validating diverse sources of insight, we accelerate solving the world's most pressing challenges.
                        </p>
                    </div>
                </section>

                {/* Original Framework Grid */}
                <div className="grid-3">
                    {/* Inclusive Inquiry */}
                    <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', borderTop: '4px solid #10b981' }}>
                        <div style={{ background: '#ecfdf5', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: '#10b981' }}>
                            <Globe size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)' }}>Inclusive Inquiry</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            Validating questions from school students, farmers, and artisans alongside PhD scholars. Democratizing the source of scientific curiosity.
                        </p>
                    </div>

                    {/* Rapid Validation */}
                    <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', borderTop: '4px solid #f59e0b' }}>
                        <div style={{ background: '#fffbeb', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: '#f59e0b' }}>
                            <Zap size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)' }}>Rapid Validation</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            Collaborative peer reviews and AI-assisted cross-checking of hypotheses to drastically reduce the time from idea to proof.
                        </p>
                    </div>

                    {/* Credit Protection */}
                    <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', borderTop: '4px solid #6366f1' }}>
                        <div style={{ background: '#e0e7ff', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: '#6366f1' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)' }}>Credit Protection</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            Strict IP tracking ensures originators maintain a majority stake in their ideas, fostering trust and encouraging open sharing.
                        </p>
                    </div>
                </div>

                {/* Our Key Principles (New Section) */}
                <section className="section" style={{ marginTop: 'var(--space-8)' }}>
                    <h2 className="section-title">Our Key Principles</h2>
                    <div className="grid-3">
                        <div className="card" style={{ background: 'var(--color-surface-50)' }}>
                            <div style={{ color: 'var(--color-brand-600)', marginBottom: 'var(--space-4)' }}><ArrowLeftRight size={32} /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Horizontal Integration</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Connecting researchers across different domains—for example, a quantum chemist working directly with a traditional textile dyer to uncover new material properties.
                            </p>
                        </div>
                        <div className="card" style={{ background: 'var(--color-surface-50)' }}>
                            <div style={{ color: 'var(--color-brand-600)', marginBottom: 'var(--space-4)' }}><ArrowUp size={32} /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Vertical Inclusivity</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Validating knowledge regardless of the researcher's formal educational background. We focus on the merit of the postulate rather than the prestige of the degree.
                            </p>
                        </div>
                        <div className="card" style={{ background: 'var(--color-surface-50)' }}>
                            <div style={{ color: 'var(--color-brand-600)', marginBottom: 'var(--space-4)' }}><Repeat size={32} /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Iterative Proofing</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Using rapid prototyping and AI cross-validation to test postulates in real-time, allowing for faster failure, learning, and breakthrough discovery.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why MSR Matters? (Original Section) */}
                <div className="section">
                    <div className="card" style={{ background: 'var(--color-surface-900)', color: 'white', display: 'flex', alignItems: 'center', gap: 'var(--space-8)', padding: 'var(--space-8)', flexDirection: 'column', md: { flexDirection: 'row' } }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <Network size={28} style={{ color: 'var(--color-brand-500)' }} /> Why MSR Matters?
                            </h3>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', opacity: 0.9 }}>
                                Traditional research is often siloed and slow. MSR breaks down these barriers by creating a decentralized, interconnected network of minds. Whether you are a farmer observing crop patterns or a physicist studying quantum mechanics, your observations contribute to the greater whole.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)' }}>
                            <Lightbulb size={40} style={{ color: '#fbbf24', marginBottom: 'var(--space-2)' }} />
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1000+</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Ideas Validated</div>
                        </div>
                    </div>
                </div>

                {/* Call To Action (New Section) */}
                <section className="section" style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                    <div style={{ background: 'var(--color-brand-50)', padding: 'var(--space-12)', borderRadius: 'var(--radius-xl)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>Ready to contribute to the mission?</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
                            Apply MSR principles to your own ideas and share them with our global network of experts and peers.
                        </p>
                        <a href="mailto:research@mission2031.org" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                            <Send size={20} /> Submit a Research Proposal
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
}
