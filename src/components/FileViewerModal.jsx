import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, FileText, Download, Copy, Check, X, ExternalLink, Search } from 'lucide-react';
import { mainCppSource } from '../data/mainCppCode';

// Safe HTML escaper
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// C++ Syntax Highlighter for individual lines
function highlightCppLine(rawLine) {
  if (!rawLine.trim()) return '&nbsp;';

  // Check if whole line or rest is a single-line comment
  const commentIdx = rawLine.indexOf('//');
  let codePart = commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine;
  const commentPart = commentIdx !== -1 ? rawLine.slice(commentIdx) : '';

  let html = escapeHtml(codePart);

  // Preprocessor directives (#include, #define, etc.)
  if (/^\s*#\w+/.test(codePart)) {
    html = html.replace(/(^\s*#\w+)(\s*&lt;[^&gt;]+&gt;|\s*"[^"]+")?/, (m, dir, header) => {
      let res = `<span class="syn-preproc">${dir}</span>`;
      if (header) {
        res += `<span class="syn-string">${header}</span>`;
      }
      return res;
    });
  } else {
    // Strings
    html = html.replace(/(&quot;.*?&quot;)/g, '<span class="syn-string">$1</span>');

    // Keywords
    const keywords = /\b(class|public|private|protected|virtual|void|int|float|double|char|bool|long|short|unsigned|struct|enum|using|namespace|return|if|else|for|while|do|switch|case|break|continue|new|delete|this|sizeof|true|false)\b/g;
    html = html.replace(keywords, '<span class="syn-keyword">$1</span>');

    // Standard library keywords
    const stdKeywords = /\b(std|cin|cout|endl|string|vector|pair|map|set|stack|queue|sort|max|min)\b/g;
    html = html.replace(stdKeywords, '<span class="syn-std">$1</span>');

    // Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="syn-number">$1</span>');
  }

  if (commentPart) {
    html += `<span class="syn-comment">${escapeHtml(commentPart)}</span>`;
  }

  return html;
}

export default function FileViewerModal({ isOpen, onClose, initialTab = 'cpp' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [copied, setCopied] = useState(false);
  const [codeText, setCodeText] = useState(mainCppSource);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const codeContainerRef = useRef(null);

  // Sync initial tab when modal opens and fetch freshest main.cpp
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
      // Always fetch freshest main.cpp from public directory
      fetch(`/main.cpp?t=${Date.now()}`)
        .then((res) => (res.ok ? res.text() : null))
        .then((text) => {
          if (text && text.trim().length > 0) {
            setCodeText(text);
          }
        })
        .catch(() => {});
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Code lines memo
  const allLines = useMemo(() => {
    return codeText.split('\n');
  }, [codeText]);

  // Filtered or search lines
  const displayedLines = useMemo(() => {
    if (!filterQuery.trim()) {
      return allLines.map((line, idx) => ({ line, originalIdx: idx + 1 }));
    }
    const q = filterQuery.toLowerCase();
    return allLines
      .map((line, idx) => ({ line, originalIdx: idx + 1 }))
      .filter((item) => item.line.toLowerCase().includes(q));
  }, [allLines, filterQuery]);

  // Copy code handler
  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Download trigger
  const handleDownload = (fileName) => {
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="file-viewer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="file-viewer-modal"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="fvm-header">
            <div className="fvm-tabs">
              <button
                className={`fvm-tab ${activeTab === 'cpp' ? 'active' : ''}`}
                onClick={() => setActiveTab('cpp')}
              >
                <FileCode size={18} className="tab-icon" />
                <span className="tab-title">main.cpp</span>
                <span className="tab-badge">{(new Blob([codeText]).size / 1024).toFixed(1)} KB • C++</span>
              </button>

              <button
                className={`fvm-tab ${activeTab === 'pdf' ? 'active' : ''}`}
                onClick={() => setActiveTab('pdf')}
              >
                <FileText size={18} className="tab-icon" />
                <span className="tab-title">MTP.pdf</span>
                <span className="tab-badge">295 KB • PDF</span>
              </button>
            </div>

            {/* Quick Actions in Header */}
            <div className="fvm-header-actions">
              {activeTab === 'cpp' ? (
                <>
                  <button
                    className={`fvm-action-btn copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopyCode}
                    title="Copy full main.cpp code to clipboard"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
                  </button>

                  <button
                    className="fvm-action-btn download-btn"
                    onClick={() => handleDownload('main.cpp')}
                    title="Download main.cpp file"
                  >
                    <Download size={16} />
                    <span>Download main.cpp</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/MTP.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fvm-action-btn outline-btn"
                    title="Open MTP.pdf in a new tab"
                  >
                    <ExternalLink size={16} />
                    <span>Open in New Tab</span>
                  </a>

                  <button
                    className="fvm-action-btn download-btn"
                    onClick={() => handleDownload('MTP.pdf')}
                    title="Download MTP.pdf file"
                  >
                    <Download size={16} />
                    <span>Download MTP.pdf</span>
                  </button>
                </>
              )}

              <button
                className="fvm-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="fvm-body">
            {activeTab === 'cpp' ? (
              <div className="fvm-code-section">
                {/* Code sub-toolbar */}
                <div className="code-sub-bar">
                  <div className="code-info-meta">
                    <span className="code-lang-tag">C++ 20</span>
                    <span className="code-meta-item">{allLines.length.toLocaleString()} lines</span>
                    <span className="code-meta-item">{new Blob([codeText]).size.toLocaleString()} bytes</span>
                  </div>

                  <div className="code-search-box">
                    <Search size={14} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Filter / Search code..."
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                      className="code-search-input"
                    />
                    {filterQuery && (
                      <button
                        className="clear-search-btn"
                        onClick={() => setFilterQuery('')}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {filterQuery && (
                  <div className="search-status-bar">
                    Showing {displayedLines.length} matching lines out of {allLines.length}.
                    <button className="reset-filter-link" onClick={() => setFilterQuery('')}>
                      Show all code
                    </button>
                  </div>
                )}

                {/* Code Editor Styled Container */}
                <div className="code-scroll-container" ref={codeContainerRef}>
                  <pre className="code-pre">
                    <table className="code-table">
                      <tbody>
                        {displayedLines.map((item) => (
                          <tr key={item.originalIdx} className="code-row">
                            <td className="code-line-number" user-select="none">
                              {item.originalIdx}
                            </td>
                            <td
                              className="code-line-text"
                              dangerouslySetInnerHTML={{
                                __html: highlightCppLine(item.line)
                              }}
                            />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="fvm-pdf-section">
                <iframe
                  src="/MTP.pdf#toolbar=1"
                  title="MTP PDF Document"
                  className="fvm-pdf-iframe"
                />
              </div>
            )}
          </div>
        </motion.div>

        <style>{`
          .file-viewer-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(10, 15, 12, 0.85);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
          }

          .file-viewer-modal {
            position: relative;
            width: 100%;
            max-width: 1300px;
            height: 90vh;
            background: #111815;
            border-radius: var(--radius-lg);
            border: 1px solid rgba(212, 175, 55, 0.35);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.12);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            color: #E2E8F0;
          }

          /* Header */
          .fvm-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 1.25rem;
            background: #0C120F;
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            gap: 1rem;
            flex-wrap: wrap;
          }

          .fvm-tabs {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .fvm-tab {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.6rem 1.1rem;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid transparent;
            color: #A0AEC0;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: var(--font-body);
            font-size: 0.9rem;
          }

          .fvm-tab:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #FAF7F2;
          }

          .fvm-tab.active {
            background: rgba(212, 175, 55, 0.15);
            border-color: rgba(212, 175, 55, 0.5);
            color: var(--gold);
            font-weight: 600;
          }

          .tab-badge {
            font-size: 0.72rem;
            padding: 0.15rem 0.45rem;
            background: rgba(0, 0, 0, 0.35);
            border-radius: 12px;
            color: #CBD5E0;
          }

          .fvm-tab.active .tab-badge {
            background: rgba(212, 175, 55, 0.25);
            color: var(--gold-light);
          }

          .fvm-header-actions {
            display: flex;
            align-items: center;
            gap: 0.6rem;
          }

          .fvm-action-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.55rem 1.1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            font-family: var(--font-body);
            letter-spacing: 0.02em;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            border: none;
          }

          .fvm-action-btn.copy-btn {
            background: rgba(212, 175, 55, 0.15);
            color: var(--gold);
            border: 1px solid rgba(212, 175, 55, 0.4);
          }

          .fvm-action-btn.copy-btn:hover {
            background: rgba(212, 175, 55, 0.25);
            transform: translateY(-1px);
          }

          .fvm-action-btn.copy-btn.copied {
            background: #1B4D3E;
            color: #A3E635;
            border-color: #22C55E;
          }

          .fvm-action-btn.download-btn {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            color: #0D2818;
            box-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
          }

          .fvm-action-btn.download-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.45);
          }

          .fvm-action-btn.outline-btn {
            background: transparent;
            color: #CBD5E0;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .fvm-action-btn.outline-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #FAF7F2;
          }

          .fvm-close-btn {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #CBD5E0;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .fvm-close-btn:hover {
            background: rgba(220, 38, 38, 0.25);
            border-color: rgba(220, 38, 38, 0.5);
            color: #F87171;
          }

          /* Body */
          .fvm-body {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #0E1612;
          }

          /* Code Section */
          .fvm-code-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .code-sub-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 1.25rem;
            background: #131E18;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            gap: 1rem;
            flex-wrap: wrap;
          }

          .code-info-meta {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-size: 0.8rem;
            color: #94A3B8;
          }

          .code-lang-tag {
            padding: 0.15rem 0.5rem;
            background: rgba(212, 175, 55, 0.18);
            color: var(--gold);
            border-radius: 4px;
            font-weight: 600;
            font-family: monospace;
          }

          .code-search-box {
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 0.3rem 0.8rem;
            gap: 0.4rem;
            width: 240px;
          }

          .code-search-input {
            background: transparent;
            border: none;
            color: #FAF7F2;
            font-size: 0.82rem;
            outline: none;
            width: 100%;
          }

          .code-search-input::placeholder {
            color: #64748B;
          }

          .clear-search-btn {
            background: none;
            border: none;
            color: #94A3B8;
            font-size: 1rem;
            cursor: pointer;
            padding: 0 2px;
          }

          .search-status-bar {
            background: rgba(212, 175, 55, 0.08);
            padding: 0.35rem 1.25rem;
            font-size: 0.78rem;
            color: var(--gold-light);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          }

          .reset-filter-link {
            background: none;
            border: none;
            color: var(--gold);
            text-decoration: underline;
            cursor: pointer;
            font-size: 0.78rem;
          }

          .code-scroll-container {
            flex: 1;
            overflow: auto;
            padding: 1rem 0;
            background: #0B110E;
          }

          .code-pre {
            margin: 0;
            font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', monospace;
            font-size: 0.88rem;
            line-height: 1.55;
          }

          .code-table {
            width: 100%;
            border-collapse: collapse;
          }

          .code-row {
            transition: background 0.1s ease;
          }

          .code-row:hover {
            background: rgba(255, 255, 255, 0.035);
          }

          .code-line-number {
            width: 55px;
            text-align: right;
            padding: 0 1rem 0 0.8rem;
            color: #475569;
            user-select: none;
            font-size: 0.8rem;
            border-right: 1px solid rgba(255, 255, 255, 0.07);
            vertical-align: top;
          }

          .code-line-text {
            padding: 0 1rem;
            white-space: pre-wrap;
            word-break: break-word;
            color: #D1D5DB;
          }

          /* Syntax Colors */
          .syn-preproc { color: #E5C058; font-weight: 600; }
          .syn-keyword { color: #60A5FA; font-weight: 600; }
          .syn-std { color: #34D399; font-weight: 600; }
          .syn-string { color: #F87171; }
          .syn-comment { color: #64748B; font-style: italic; }
          .syn-number { color: #F59E0B; }

          /* PDF Section */
          .fvm-pdf-section {
            flex: 1;
            height: 100%;
            overflow: hidden;
            background: #1A2420;
          }

          .fvm-pdf-iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
          }

          @media (max-width: 768px) {
            .file-viewer-backdrop {
              padding: 0.5rem;
            }
            .file-viewer-modal {
              height: 96vh;
            }
            .fvm-header {
              flex-direction: column;
              align-items: stretch;
            }
            .fvm-header-actions {
              justify-content: flex-end;
              flex-wrap: wrap;
            }
            .tab-badge {
              display: none;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
