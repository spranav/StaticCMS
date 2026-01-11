import ReactMarkdown from 'react-markdown';

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
                        <img {...props} style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)', margin: 'var(--space-4) 0' }} />
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
