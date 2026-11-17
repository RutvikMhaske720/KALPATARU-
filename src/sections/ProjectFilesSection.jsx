import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, FileText, Download, Copy, Check, Eye, ExternalLink } from 'lucide-react';
import { mainCppSource } from '../data/mainCppCode';

export default function ProjectFilesSection({ onOpenFileModal }) {
  const [copiedCpp, setCopiedCpp] = useState(false);

  const handleCopyCpp = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(mainCppSource);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = mainCppSource;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedCpp(true);
      setTimeout(() => setCopiedCpp(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="project-files-section" id="project-files" aria-label="Project Files and Documentation">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">Downloads &amp; Documentation</span>
          <h2 className="section-title">Project Files &amp; Source Code</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Download the core algorithmic code (<strong>main.cpp</strong>) and technical documentation (<strong>MTP.pdf</strong>),
            or preview them immediately in this window with instant code-copying.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="files-grid">
          {/* Card 1: main.cpp */}
          <motion.div
            className="file-card file-card-cpp"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="card-top-icon">
              <div className="icon-badge cpp-icon-badge">
                <FileCode size={36} />
              </div>
              <div className="card-status-badges">
                <span className="badge-tag">C++ Source</span>
                <span className="badge-tag">28.5 KB</span>
                <span className="badge-tag">1,764 Lines</span>
              </div>
            </div>

            <div className="card-body">
              <h3 className="file-name">main.cpp</h3>
              <p className="file-desc">
                Core algorithmic modules, data structures, array rotations, and processing routines engineered for the Kalpataru backend.
              </p>

              <div className="code-features-list">
                <span className="feature-pill">Rotation Algorithms</span>
                <span className="feature-pill">Data Structures</span>
                <span className="feature-pill">Performance Logic</span>
              </div>
            </div>

            <div className="card-actions">
              <button
                className="action-btn download-primary-btn"
                onClick={() => handleDownload('main.cpp')}
                title="Download main.cpp file"
              >
                <Download size={18} />
                <span>Download main.cpp</span>
              </button>

              <div className="action-row-split">
                <button
                  className="action-btn view-btn"
                  onClick={() => onOpenFileModal('cpp')}
                  title="View main.cpp in window"
                >
                  <Eye size={16} />
                  <span>View in Window</span>
                </button>

                <button
                  className={`action-btn copy-btn ${copiedCpp ? 'copied' : ''}`}
                  onClick={handleCopyCpp}
                  title="Copy full main.cpp code to clipboard"
                >
                  {copiedCpp ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedCpp ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: MTP.pdf */}
          <motion.div
            className="file-card file-card-pdf"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card-top-icon">
              <div className="icon-badge pdf-icon-badge">
                <FileText size={36} />
              </div>
              <div className="card-status-badges">
                <span className="badge-tag">PDF Document</span>
                <span className="badge-tag">295 KB</span>
                <span className="badge-tag">Technical Report</span>
              </div>
            </div>

            <div className="card-body">
              <h3 className="file-name">MTP.pdf</h3>
              <p className="file-desc">
                Major Technical Project (MTP) report detailing project architecture, problem statement, methodologies, evaluation, and system outcomes.
              </p>

              <div className="code-features-list">
                <span className="feature-pill">Project Report</span>
                <span className="feature-pill">Architecture Design</span>
                <span className="feature-pill">Evaluation &amp; Impact</span>
              </div>
            </div>

            <div className="card-actions">
              <button
                className="action-btn download-primary-btn"
                onClick={() => handleDownload('MTP.pdf')}
                title="Download MTP.pdf file"
              >
                <Download size={18} />
                <span>Download MTP.pdf</span>
              </button>

              <div className="action-row-split">
                <button
                  className="action-btn view-btn"
                  onClick={() => onOpenFileModal('pdf')}
                  title="View MTP.pdf in window"
                >
                  <Eye size={16} />
                  <span>View in Window</span>
                </button>

                <a
                  href="/MTP.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn external-btn"
                  title="Open MTP.pdf in new browser tab"
                >
                  <ExternalLink size={16} />
                  <span>New Tab</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .project-files-section {
          padding: 6rem 1.5rem;
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          position: relative;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          padding: 0.3rem 0.9rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--green-deep);
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .section-divider {
          width: 70px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 0 auto 1.2rem;
        }

        .section-subtitle {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          align-items: stretch;
        }

        .file-card {
          background: var(--bg-primary);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: var(--radius-lg);
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .file-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--green-emerald));
          opacity: 0.8;
          transition: height 0.3s ease;
        }

        .file-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 0 25px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .file-card:hover::before {
          height: 5px;
        }

        .card-top-icon {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .icon-badge {
          width: 68px;
          height: 68px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .file-card:hover .icon-badge {
          transform: scale(1.05);
        }

        .cpp-icon-badge {
          background: rgba(37, 99, 235, 0.1);
          color: #2563EB;
          border: 1px solid rgba(37, 99, 235, 0.25);
        }

        [data-theme='dark'] .cpp-icon-badge {
          background: rgba(96, 165, 250, 0.15);
          color: #60A5FA;
          border-color: rgba(96, 165, 250, 0.3);
        }

        .pdf-icon-badge {
          background: rgba(220, 38, 38, 0.1);
          color: #DC2626;
          border: 1px solid rgba(220, 38, 38, 0.25);
        }

        [data-theme='dark'] .pdf-icon-badge {
          background: rgba(248, 113, 113, 0.15);
          color: #F87171;
          border-color: rgba(248, 113, 113, 0.3);
        }

        .card-status-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.35rem;
        }

        .badge-tag {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.2rem 0.6rem;
          background: var(--bg-secondary);
          color: var(--text-muted);
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.15);
        }

        .file-name {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }

        .file-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .code-features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .feature-pill {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--gold-dark);
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 6px;
          padding: 0.25rem 0.6rem;
        }

        [data-theme='dark'] .feature-pill {
          color: var(--gold-light);
        }

        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          border-radius: 30px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .download-primary-btn {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: #0D2818;
          border: 1px solid transparent;
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.3);
        }

        .download-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.45);
        }

        .action-row-split {
          display: flex;
          gap: 0.6rem;
        }

        .action-row-split .action-btn {
          flex: 1;
        }

        .view-btn {
          background: rgba(212, 175, 55, 0.08);
          color: var(--gold-dark);
          border: 1px solid var(--gold);
        }

        [data-theme='dark'] .view-btn {
          color: var(--gold);
        }

        .view-btn:hover {
          background: rgba(212, 175, 55, 0.18);
          transform: translateY(-2px);
        }

        .copy-btn {
          background: rgba(45, 90, 63, 0.08);
          color: var(--green-emerald);
          border: 1px solid rgba(45, 90, 63, 0.3);
        }

        [data-theme='dark'] .copy-btn {
          color: #34D399;
          border-color: rgba(52, 211, 153, 0.4);
        }

        .copy-btn:hover {
          background: rgba(45, 90, 63, 0.18);
          transform: translateY(-2px);
        }

        .copy-btn.copied {
          background: #10B981 !important;
          color: #FFFFFF !important;
          border-color: #059669 !important;
        }

        .external-btn {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid rgba(138, 130, 120, 0.3);
        }

        .external-btn:hover {
          background: rgba(0, 0, 0, 0.05);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .action-row-split {
            flex-direction: column;
          }
          .file-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
