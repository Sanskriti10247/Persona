import Link from "next/link";
import { personas } from "./lib/personas";

const highlights = [
  {
    title: "Separate history 🎀",
    copy: "Each persona keeps its own local thread.",
  },
  {
    title: "Better prompts 🩷",
    copy: "Starter prompts now match their distinct voice.",
  },
];

export default function Home() {
  return (
    <main className="landing-page">
      {/* Floating Decorations */}
      <img src="/hello-kitty-bow.svg" alt="" className="floating-decor decor-one" />
      <img src="/paw-print.svg" alt="" className="floating-decor decor-two" />
      <img src="/hello-kitty-face.svg" alt="" className="floating-decor decor-three" />
      <img src="/hello-kitty-bow.svg" alt="" className="floating-decor decor-four" />

      <section className="landing-hero">
        <div className="hero-copy glass-card">
          <p className="eyebrow">🎀 Personafy</p>
          <h1>Distinct personas. One refined chat.</h1>
          <p className="hero-description">Pick a voice, keep its history, and switch without losing context. Each persona remembers everything. 🩷</p>

          <div className="hero-actions">
            <Link href={`/person/${personas[0].id}`} className="primary-btn">
              ✨ Start Chatting 🎀
            </Link>
            <a href="#personas" className="secondary-btn">
              Explore All Voices 🐱
            </a>
          </div>

          <div className="hero-stats">
            <div style={{ animation: "slideInLeft 0.6s ease-out 0.5s both" }}>
              <strong>{personas.length}</strong>
              <span>unique voices</span>
            </div>
            <div style={{ animation: "slideInLeft 0.6s ease-out 0.6s both" }}>
              <strong>∞</strong>
              <span>conversations</span>
            </div>
            <div style={{ animation: "slideInLeft 0.6s ease-out 0.7s both" }}>
              <strong>Smooth</strong>
              <span>animated UI</span>
            </div>
          </div>
        </div>

        <div className="hero-side glass-card">
          <p className="eyebrow">Live Preview 🩷</p>
          <h2>Crafted with precision.</h2>
          <p>Experience smooth animations and responsive design across all devices.</p>

          <div className="mini-card-stack">
            {personas.map((persona, idx) => (
              <Link key={persona.id} href={`/person/${persona.id}`} className="mini-persona-card" style={{ borderColor: persona.glow }}>
                <div>
                  <strong>{persona.name}</strong>
                  <span>{persona.title}</span>
                </div>
                <span aria-hidden="true" style={{ fontSize: "1.2em", color: "var(--accent-bright)" }}>🎀</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="highlights-grid">
        {highlights.map((item, idx) => (
          <article key={item.title} className="glass-card highlight-card">
            <div style={{ opacity: 0.8, marginBottom: "8px", fontSize: "2em" }}>
              {idx === 0 ? "🧵" : idx === 1 ? "🎯" : "✨"}
            </div>
            <p className="eyebrow">Experience</p>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      <section id="personas" className="persona-showcase">
        <div className="section-heading">
          <p className="eyebrow">Choose Your Voice 🐱</p>
          <h2>Three Distinct Personas</h2>
        </div>

        <div className="persona-grid">
          {personas.map((persona, index) => (
            <Link 
              key={persona.id} 
              href={`/person/${persona.id}`} 
              className="persona-preview glass-card" 
              style={{ 
                ["--accent" as string]: persona.accent, 
                ["--glow" as string]: persona.glow,
                borderColor: persona.glow
              }}
            >
              <div className="persona-preview-top">
                <span className="persona-index">0{index + 1}</span>
                <span className="persona-dot" />
              </div>
              <h3>{persona.name}</h3>
              <p>{persona.tagline}</p>
              <div className="persona-snippets">
                {persona.prompts.slice(0, 2).map((prompt, pIdx) => (
                  <span key={prompt} style={{ animation: `slideInLeft 0.4s ease-out ${0.3 + pIdx * 0.1}s both` }}>{prompt}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
