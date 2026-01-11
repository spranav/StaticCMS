import ReactMarkdown from 'react-markdown';

const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const REPO = 'spranav/StaticCMS';
    const BRANCH = 'main';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `https://raw.githubusercontent.com/${REPO}/${BRANCH}/public/${cleanPath}`;
};

/**
 * Renders Markdown content safely.
 * @param {string} children - The markdown string
 */
export default function MarkdownRenderer({ children }) {
    return (
        <div className="markdown-content">
            <ReactMarkdown
                components={{
                    img: ({ node, ...props }) => (
                        <img {...props} src={getImageUrl(props.src)} style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)', margin: 'var(--space-4) 0' }} />
                    ),
                    code: ({ node, ...props }) => (
                        <code {...props} style={{ background: 'var(--color-surface-200)', padding: '0.2em 0.4em', borderRadius: '4px' }} />
                    ),
                    pre: ({ node, ...props }) => (
                        <pre {...props} style={{ background: 'var(--color-surface-900)', color: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', overflowX: 'auto' }} />
                    )
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
