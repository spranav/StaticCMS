import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContentAuth } from '../../hooks/useContentAuth';
import { getPost, getManifest } from '../../lib/cms';
import { getFileSha, uploadFile, uploadAsset } from '../../lib/github';
import AdminLayout from './AdminLayout';
import { Save, ArrowLeft, Image as ImageIcon, Loader } from 'lucide-react';

export default function Editor() {
    const { slug: urlSlug } = useParams(); // If present, we are editing
    const { token, repo, loading: authLoading } = useContentAuth();
    const navigate = useNavigate();

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');

    // System State
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [postSha, setPostSha] = useState(null); // For concurrency
    const [manifestSha, setManifestSha] = useState(null); // For concurrency
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!authLoading && !token) navigate('/admin/login');
    }, [authLoading, token, navigate]);

    // Load Data
    useEffect(() => {
        if (!token || !repo) return;

        const load = async () => {
            setLoading(true);
            try {
                // 1. Get Manifest SHA (we will need this to save)
                // We fetch the file metadata from GitHub API to get the SHA
                const mSha = await getFileSha(repo, 'public/content/manifest.json', token);
                setManifestSha(mSha);

                // 2. If editing, load post
                if (urlSlug) {
                    const postData = await getPost(urlSlug);
                    if (postData) {
                        setTitle(postData.title);
                        setSlug(urlSlug);
                        setDate(postData.date.split('T')[0]);
                        setContent(postData.content);
                        const manifest = await getManifest();
                        const entry = manifest.find(p => p.slug === urlSlug);
                        if (entry) setExcerpt(entry.excerpt || '');

                        // Get Post SHA for concurrency
                        const pSha = await getFileSha(repo, `public/content/posts/${urlSlug}.json`, token);
                        setPostSha(pSha);
                    }
                } else {
                    // New Post
                    setSlug(''); // Will auto-gen
                }
            } catch (err) {
                console.error(err);
                setStatus('Error loading data. Check console.');
            }
            setLoading(false);
        };
        load();
    }, [urlSlug, token, repo]);

    // Auto-generate slug from title if new
    useEffect(() => {
        if (!urlSlug && title) {
            setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    }, [title, urlSlug]);

    // Image Upload Logic
    const handleImagePasteProp = useCallback(async (e) => {
        // Basic drop/paste handler for textarea could be added here
        // For now, we use a button
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setStatus('Uploading image...');
        try {
            const arrayBuffer = await file.arrayBuffer();
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
            const path = `public/assets/images/${filename}`;

            await uploadAsset(repo, path, arrayBuffer, token);

            // Append Markdown
            const imageMd = `\n![${file.name}](/assets/images/${filename})\n`;
            setContent(prev => prev + imageMd);
            setStatus('Image uploaded!');
        } catch (err) {
            console.error(err);
            setStatus('Image upload failed.');
        }
    };

    const handleSave = async () => {
        if (!title || !slug || !content) {
            alert("Title, Slug, and Content are required.");
            return;
        }

        setSaving(true);
        setStatus('Saving...');

        try {
            // Extract first image from markdown for cover
            const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
            const coverImage = imageMatch ? imageMatch[1] : null;

            // 1. Prepare Data
            const postData = {
                title,
                date: new Date(date).toISOString(),
                content,
                coverImage // Save to post file too
            };

            const manifestEntry = {
                slug,
                title,
                date: new Date(date).toISOString(),
                excerpt: excerpt || content.substring(0, 150) + '...',
                coverImage // Add to manifest for listing
            };

            // 2. Commit Manifest first (or last? If we do manifest first, we claim the slug)
            // Let's Refresh Manifest SHA first to be safe
            const currentManifest = await getManifest();
            const currentManifestSha = await getFileSha(repo, 'public/content/manifest.json', token);

            // Update Manifest Array
            let newManifest = [...currentManifest];
            const existingIndex = newManifest.findIndex(p => p.slug === slug);
            if (existingIndex >= 0) {
                // Update existing
                newManifest[existingIndex] = { ...newManifest[existingIndex], ...manifestEntry };
            } else {
                // Add new
                newManifest.unshift(manifestEntry);
            }

            // Upload Manifest
            await uploadFile(
                repo,
                'public/content/manifest.json',
                JSON.stringify(newManifest, null, 2),
                `Update manifest for ${slug}`,
                token,
                currentManifestSha
            );

            // 3. Upload Post Content
            await uploadFile(
                repo,
                `public/content/posts/${slug}.json`,
                JSON.stringify(postData, null, 2),
                `Update post ${slug}`,
                token,
                postSha // Might be null if new
            );

            setStatus('Saved successfully!');
            setManifestSha(await getFileSha(repo, 'public/content/manifest.json', token)); // Update SHAs
            setPostSha(await getFileSha(repo, `public/content/posts/${slug}.json`, token));

            // If new, navigate to edit URL
            if (!urlSlug) {
                navigate(`/admin/editor/${slug}`, { replace: true });
            }
        } catch (err) {
            console.error(err);
            setStatus(`Error saving: ${err.message} `);
        }
        setSaving(false);
    };

    if (loading) return <AdminLayout>Loading...</AdminLayout>;

    return (
        <AdminLayout title={urlSlug ? 'Edit Post' : 'New Post'}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>

                <div className="card">
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <input
                            type="text"
                            placeholder="Post Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={{ fontSize: '1.5rem', fontWeight: 'bold', border: 'none', borderBottom: '1px solid var(--color-border)', borderRadius: 0, paddingLeft: 0 }}
                        />
                    </div>

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="# Write your magic here..."
                        style={{ width: '100%', minHeight: '500px', fontFamily: 'monospace', resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {/* Actions */}
                    <div className="card">
                        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-2)' }}>
                            {saving ? <Loader className="spin" size={16} /> : <Save size={16} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        {status && <div style={{ fontSize: '0.85rem', color: status.includes('Error') ? 'red' : 'green', textAlign: 'center' }}>{status}</div>}
                    </div>

                    {/* Metadata */}
                    <div className="card">
                        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-4)' }}>Metadata</h3>
                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Slug</label>
                            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} disabled={!!urlSlug} />
                            <small style={{ color: 'var(--color-text-muted)' }}>URL identifier</small>
                        </div>
                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Date</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Excerpt</label>
                            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} />
                        </div>
                    </div>

                    {/* Assets */}
                    <div className="card">
                        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-4)' }}>Assets</h3>
                        <label className="btn btn-secondary" style={{ width: '100%', cursor: 'pointer' }}>
                            <ImageIcon size={16} /> Upload Image
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                        </label>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
