import './gallery.css';

export default function Home() {
  return (
    <div className="gallery-bg">
      <div className="container">
        <section className="hero">
          <div className="hero-eyebrow">Permanence on Ethereum</div>
          <h1 className="hero-title">Beyond</h1>
          <p className="hero-subtitle">A growing collection of permanent ENS sites.</p>
          <a href="/claim/" className="hero-claim">
            Claim a name →
          </a>
          <div className="hero-credit">
            by{' '}
            <a href="https://10102.io" target="_blank" rel="noopener noreferrer">
              10102
            </a>
          </div>
        </section>

        <section>
          <div className="section-label">The Portfolio</div>
          <h2 className="section-title">Built to outlast their authors.</h2>

          <div className="tile-grid">
            <a href="https://rogerfederer.eth.limo" target="_blank" rel="noopener noreferrer" className="tile">
              <div className="tile-header">
                <span className="tile-name">rogerfederer.eth</span>
                <span className="tile-status live">Live</span>
              </div>
              <div className="tile-category">Tribute</div>
              <div className="tile-title">The Disruptor</div>
              <div className="tile-description">
                Tribute to Roger Federer&apos;s transformation of tennis: a study in disruption, drawing a Bitcoin
                parallel.
              </div>
              <div className="tile-arrow">Visit →</div>
            </a>

            <a href="https://qubic.eth.limo" target="_blank" rel="noopener noreferrer" className="tile">
              <div className="tile-header">
                <span className="tile-name">qubic.eth</span>
                <span className="tile-status live">Live</span>
              </div>
              <div className="tile-category">Manifesto</div>
              <div className="tile-title">The bare metal blockchain</div>
              <div className="tile-description">
                10102&apos;s thesis on Qubic: bare metal, tickchain, useful proof of work. Where computation has a
                purpose.
              </div>
              <div className="tile-arrow">Visit →</div>
            </a>

            <div className="tile upcoming" aria-disabled="true">
              <div className="tile-header">
                <span className="tile-name">cyborg.eth</span>
                <span className="tile-status">Soon</span>
              </div>
              <div className="tile-category">Project</div>
              <div className="tile-title">Identity for agents</div>
              <div className="tile-description">
                An ENS identity layer for autonomous agents: the address an AI can sign with, remember, and be known by.
              </div>
              <div className="tile-arrow">Visit →</div>
            </div>

            <a href="https://tokenpot.eth.limo" target="_blank" rel="noopener noreferrer" className="tile">
              <div className="tile-header">
                <span className="tile-name">tokenpot.eth</span>
                <span className="tile-status live">Live</span>
              </div>
              <div className="tile-category">Archive</div>
              <div className="tile-title">Tokenpot Capital</div>
              <div className="tile-description">
                Archive of the private cryptocurrency investment fund that operated 2015 to 2019. Predecessor to 10102.
              </div>
              <div className="tile-arrow">Visit →</div>
            </a>

            <div className="tile upcoming" aria-disabled="true">
              <div className="tile-header">
                <span className="tile-name">10102.eth</span>
                <span className="tile-status">Soon</span>
              </div>
              <div className="tile-category">Manifesto</div>
              <div className="tile-title">10102 on Ethereum</div>
              <div className="tile-description">
                The brand manifesto, native to ENS. Self-sovereign Computing: the onchain expression of what 10102.io is
                on the open web.
              </div>
              <div className="tile-arrow">Visit →</div>
            </div>

            <a href="mailto:info@10102.io?subject=Beyond%20inquiry" className="tile invite">
              <div className="tile-header">
                <span className="tile-name">your-name.eth</span>
                <span className="tile-status invite">Open</span>
              </div>
              <div className="tile-category">Open seat</div>
              <div className="tile-title">Your site, here</div>
              <div className="tile-description">
                A seat in the collection. Permanent ENS sites for people, projects, and cultural moments. Tell us what
                you have in mind.
              </div>
              <div className="tile-arrow">Get in touch →</div>
            </a>
          </div>
        </section>

        <section className="cta-section">
          <div className="section-label">For what should outlast</div>
          <h2 className="section-title">Have something worth preserving?</h2>
          <p className="cta-body">
            10102 builds permanent ENS sites at beyond.eth, for people, projects, and cultural moments. Tell us what you
            have in mind.
          </p>
          <a href="mailto:info@10102.io?subject=Beyond%20inquiry" className="cta-button">
            Get in touch →
          </a>
        </section>

        <section className="philosophy">
          <p className="philosophy-quote">
            Code that runs for eternity. Protocols that operate independently of any intermediary. Tools for true
            digital permanence.
          </p>
          <div className="philosophy-attribution">The 10102 Thesis</div>
        </section>

        <footer className="footer">
          <div className="footer-text">
            Built by{' '}
            <a href="https://10102.io" target="_blank" rel="noopener noreferrer">
              10102
            </a>{' '}
            · permanence and self-custody on Ethereum
          </div>
          <div className="footer-meta">beyond.eth · hosted on IPFS · works in any ENS-aware browser</div>
        </footer>
      </div>
    </div>
  );
}
