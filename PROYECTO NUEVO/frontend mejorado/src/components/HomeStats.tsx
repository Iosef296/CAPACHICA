import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 8,    suffix: "+", label: "Comunidades",        icon: "🏘️" },
  { value: 3820, suffix: "",  label: "metros sobre el mar", icon: "🏔️" },
  { value: 500,  suffix: "+", label: "años de historia",   icon: "📜" },
  { value: 12,   suffix: "",  label: "islas cercanas",     icon: "🏝️" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString("es")}{suffix}</span>;
}

export default function HomeStats() {
  return (
    <section style={{
      padding: "64px 0",
      background: "linear-gradient(90deg, rgba(7,13,26,0.98), rgba(10,22,40,0.4), rgba(7,13,26,0.98))",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "2rem",
        }}>
          {stats.map((s, i) => (
            <div key={i} className="reveal" style={{
              textAlign: "center",
              padding: "1.5rem 1rem",
              borderRadius: "var(--radius)",
              background: "rgba(45,212,191,0.04)",
              border: "1px solid var(--border)",
              transition: "all 0.3s",
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
              (e.currentTarget as HTMLElement).style.background = "rgba(45,212,191,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "rgba(45,212,191,0.04)";
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)",
                fontWeight: 800, color: "var(--accent)", lineHeight: 1,
              }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text3)", marginTop: "0.5rem", letterSpacing: "0.04em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
