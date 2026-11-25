export default function App() {
  return (
    <div className="no-internet-page">
      <main className="no-internet-container" role="main">
        <img
          src="/no-internet.jpg"
          alt="No internet - ERR_INTERNET_DISCONNECTED"
          className="no-internet-image"
          draggable="false"
        />
      </main>

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
          user-select: none;
        }

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

        @media (max-width: 600px) {
          .no-internet-page {
            padding: 1.5rem 1rem 0;
          }
        }
      `}</style>
    </div>
  );
}
