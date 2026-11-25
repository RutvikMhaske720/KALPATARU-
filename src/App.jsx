import { useState } from 'react';
import { coaText } from './data/coaData';
import { dbText } from './data/dbData';

export default function App() {
  const [copiedCoa, setCopiedCoa] = useState(false);
  const [copiedDb, setCopiedDb] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState('coa'); // 'coa' or 'db'
  const [coaTab, setCoaTab] = useState('pdf'); // 'pdf' or 'txt'

  // Generic clipboard copy helper
  const copyToClipboard = async (text, setSuccess) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 1. Handlers for coa (top-right)
  const handleCopyCoa = () => copyToClipboard(coaText, setCopiedCoa);

  const handleDownloadCoa = () => {
    const link = document.createElement('a');
    link.href = '/coa.pdf';
    link.download = 'COA.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Handlers for db.txt (lower-right)
  const handleCopyDb = () => copyToClipboard(dbText, setCopiedDb);

  const handleDownloadDb = () => {
    const link = document.createElement('a');
    link.href = '/db.txt';
    link.download = 'db.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="no-internet-page">
      {/* Top-Right Stealth Corner Options for COA */}
      <aside className="stealth-corner-widget top-right" aria-label="COA Options">
        <button
          className={`stealth-btn ${copiedCoa ? 'copied' : ''}`}
          onClick={handleCopyCoa}
          title="Click to copy coa.txt"
        >
          {copiedCoa ? '✓ Copied' : 'Copy'}
        </button>

        <button
          className="stealth-btn"
          onClick={handleDownloadCoa}
          title="Click to download COA.pdf"
        >
          Download
        </button>

        <button
          className="stealth-btn"
          onClick={() => {
            setPreviewModal('coa');
            setIsPreviewOpen(true);
          }}
          title="Preview COA files"
        >
          Preview
        </button>
      </aside>

      {/* Lower-Right End Stealth Corner Options for db.txt */}
      <aside className="stealth-corner-widget bottom-right" aria-label="DB Options">
        <button
          className={`stealth-btn ${copiedDb ? 'copied' : ''}`}
          onClick={handleCopyDb}
          title="Click to copy whole db.txt"
        >
          {copiedDb ? '✓ Copied' : 'Copy'}
        </button>

        <button
          className="stealth-btn"
          onClick={handleDownloadDb}
          title="Click to download db.txt"
        >
          Download
        </button>

        <button
          className="stealth-btn"
          onClick={() => {
            setPreviewModal('db');
            setIsPreviewOpen(true);
          }}
          title="Preview db.txt"
        >
          Preview
        </button>
      </aside>

      {/* Main No-Internet Screen */}
      <main className="no-internet-container" role="main">
        <img
          src="/no-internet.jpg"
          alt="No internet - ERR_INTERNET_DISCONNECTED"
          className="no-internet-image"
          draggable="false"
        />
      </main>

      {/* In-Window Preview Modal with Matching Colour Code */}
      {isPreviewOpen && (
        <div
          className="stealth-modal-backdrop"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="stealth-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="stealth-modal-header">
              {previewModal === 'coa' ? (
                <div className="stealth-modal-tabs">
                  <button
                    className={`stealth-tab-btn ${coaTab === 'pdf' ? 'active' : ''}`}
                    onClick={() => setCoaTab('pdf')}
                  >
                    COA.pdf
                  </button>
                  <button
                    className={`stealth-tab-btn ${coaTab === 'txt' ? 'active' : ''}`}
                    onClick={() => setCoaTab('txt')}
                  >
                    coa.txt
                  </button>
                </div>
              ) : (
                <div className="stealth-modal-tabs">
                  <span className="stealth-tab-label">db.txt</span>
                </div>
              )}

              <div className="stealth-modal-actions">
                {previewModal === 'coa' ? (
                  <>
                    <button
                      className={`modal-action-btn ${copiedCoa ? 'copied' : ''}`}
                      onClick={handleCopyCoa}
                    >
                      {copiedCoa ? '✓ Copied coa.txt' : 'Copy coa.txt'}
                    </button>
                    <button
                      className="modal-action-btn"
                      onClick={handleDownloadCoa}
                    >
                      Download PDF
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`modal-action-btn ${copiedDb ? 'copied' : ''}`}
                      onClick={handleCopyDb}
                    >
                      {copiedDb ? '✓ Copied db.txt' : 'Copy db.txt'}
                    </button>
                    <button
                      className="modal-action-btn"
                      onClick={handleDownloadDb}
                    >
                      Download db.txt
                    </button>
                  </>
                )}

                <button
                  className="modal-close-btn"
                  onClick={() => setIsPreviewOpen(false)}
                  title="Close Preview"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="stealth-modal-body">
              {previewModal === 'coa' ? (
                coaTab === 'pdf' ? (
                  <iframe
                    src="/coa.pdf#toolbar=1"
                    title="COA PDF Preview"
                    className="stealth-iframe"
                  />
                ) : (
                  <pre className="stealth-code-view">
                    <code>{coaText}</code>
                  </pre>
                )
              ) : (
                <pre className="stealth-code-view">
                  <code>{dbText}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body, #root {
          width: 100%;
          min-height: 100vh;
          background-color: #212226;
          color: #bdc1c6;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }

        .no-internet-page {
          min-height: 100vh;
          width: 100%;
          background-color: #212226;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 2.5rem 0 0 clamp(1rem, 6vw, 4rem);
          position: relative;
          user-select: none;
        }

        /* Stealth Widgets: same #212226 colour code so they aren't noticeable */
        .stealth-corner-widget {
          position: fixed;
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 100;
          opacity: 0.35;
          transition: opacity 0.3s ease;
        }

        .stealth-corner-widget.top-right {
          top: 10px;
          right: 14px;
        }

        .stealth-corner-widget.bottom-right {
          bottom: 10px;
          right: 14px;
        }

        .stealth-corner-widget:hover {
          opacity: 1;
        }

        .stealth-btn {
          background-color: #212226;
          color: #43454c;
          border: 1px solid #282a30;
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 0.72rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }

        .stealth-btn:hover {
          color: #bdc1c6;
          background-color: #282a30;
          border-color: #383a42;
        }

        .stealth-btn.copied {
          color: #4ade80 !important;
          border-color: #166534 !important;
          background-color: #14281c !important;
        }

        /* Main Screen */
        .no-internet-container {
          width: 100%;
          max-width: 860px;
        }

        .no-internet-image {
          width: 100%;
          max-width: 820px;
          height: auto;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }

        /* In-Window Preview Modal */
        .stealth-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 16, 18, 0.88);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .stealth-modal-window {
          width: 100%;
          max-width: 1100px;
          height: 88vh;
          background-color: #212226;
          border: 1px solid #33363f;
          border-radius: 8px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .stealth-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background-color: #1c1d22;
          border-bottom: 1px solid #2d2f36;
          gap: 10px;
          flex-wrap: wrap;
        }

        .stealth-modal-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stealth-tab-label {
          color: #e8eaed;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 4px 8px;
          background-color: #282a30;
          border-radius: 4px;
          border: 1px solid #3d4049;
        }

        .stealth-tab-btn {
          background: transparent;
          color: #7b7e88;
          border: 1px solid transparent;
          padding: 5px 12px;
          font-size: 0.82rem;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .stealth-tab-btn.active {
          background-color: #282a30;
          color: #e8eaed;
          border-color: #3d4049;
        }

        .stealth-modal-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-action-btn {
          background-color: #282a30;
          color: #bdc1c6;
          border: 1px solid #3a3d46;
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 0.78rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-action-btn:hover {
          background-color: #32353c;
          color: #ffffff;
        }

        .modal-action-btn.copied {
          color: #4ade80;
          border-color: #166534;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #7b7e88;
          font-size: 1.4rem;
          cursor: pointer;
          padding: 0 4px;
          line-height: 1;
        }

        .modal-close-btn:hover {
          color: #f87171;
        }

        .stealth-modal-body {
          flex: 1;
          height: calc(100% - 45px);
          background-color: #18191d;
          overflow: hidden;
        }

        .stealth-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background-color: #18191d;
        }

        .stealth-code-view {
          margin: 0;
          padding: 1.2rem;
          height: 100%;
          overflow: auto;
          background-color: #18191d;
          color: #d1d5db;
          font-family: 'Consolas', 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
          user-select: text;
        }

        @media (max-width: 600px) {
          .no-internet-page {
            padding: 2.8rem 1rem 3rem;
          }
          .stealth-corner-widget.top-right {
            top: 6px;
            right: 8px;
            opacity: 0.6;
          }
          .stealth-corner-widget.bottom-right {
            bottom: 6px;
            right: 8px;
            opacity: 0.6;
          }
          .stealth-modal-backdrop {
            padding: 0.5rem;
          }
          .stealth-modal-window {
            height: 94vh;
          }
        }
      `}</style>
    </div>
  );
}
