import { useState, useRef, useEffect, useCallback } from 'react';

const AI_URL = import.meta.env.PUBLIC_IA_URL || 'http://localhost:5000';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
  accion?: string;
  mapa_url?: string;
}

interface WidgetCfg {
  bot_name:     string;
  bot_subtitle: string;
  welcome_msg:  string;
  quick_prompts: string[];
  placeholder:  string;
}

const DEFAULT_CFG: WidgetCfg = {
  bot_name:     'Inti · Asistente IA',
  bot_subtitle: 'Capachica Turismo',
  welcome_msg:  '¡Hola! Soy Inti, tu guía virtual de Capachica 🌊\n¿En qué te puedo ayudar?',
  quick_prompts: ['¿Qué es Capachica?', '¿Cómo llegar?', 'Quiero reservar'],
  placeholder:  'Escribe tu pregunta...',
};

export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [cfg, setCfg]         = useState<WidgetCfg>(DEFAULT_CFG);
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [stream, setStream]   = useState('');
  const [unread, setUnread]   = useState(0);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const historyRef = useRef<Msg[]>(msgs);

  useEffect(() => {
    fetch(`${AI_URL}/api/widget/config`)
      .then(r => r.json())
      .then((data: WidgetCfg) => {
        setCfg({ ...DEFAULT_CFG, ...data });
        setMsgs([{ role: 'assistant', content: data.welcome_msg || DEFAULT_CFG.welcome_msg }]);
      })
      .catch(() => {
        setMsgs([{ role: 'assistant', content: DEFAULT_CFG.welcome_msg }]);
      });
  }, []);

  useEffect(() => { historyRef.current = msgs; }, [msgs]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, stream]);
  useEffect(() => { if (open) { inputRef.current?.focus(); setUnread(0); } }, [open]);

  const sendMsg = useCallback(async (text: string) => {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput('');
    const userMsg: Msg = { role: 'user', content: msg };
    const history = historyRef.current;
    setMsgs(prev => [...prev, userMsg]);
    setLoading(true);
    setStream('');

    try {
      const res = await fetch(`${AI_URL}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: msg, historial: history }),
      });
      if (!res.ok || !res.body) throw new Error('Server error');

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let meta: { accion?: string; mapa_url?: string } = {};
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') continue;
          try {
            const evt = JSON.parse(raw) as { type: string; text?: string; fullText?: string; respuesta?: string; accion?: string; mapa_url?: string };
            if (evt.type === 'meta')               { meta = { accion: evt.accion, mapa_url: evt.mapa_url }; }
            if (evt.type === 'token' && evt.text)  { full += evt.text; setStream(full); }
            if (evt.type === 'done' && evt.fullText){ full = evt.fullText; }
            if (evt.type === 'reserva_confirmada') { full = evt.respuesta ?? ''; meta.accion = 'reserva_confirmada'; }
            if (evt.type === 'reserva_incompleta') { full = evt.respuesta ?? ''; }
          } catch {}
        }
      }

      const aiMsg: Msg = { role: 'assistant', content: full, ...meta };
      setMsgs(prev => [...prev, aiMsg]);
      setStream('');
      if (!open) setUnread(u => u + 1);
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'No pude conectar con el asistente. Asegúrate de que el servidor IA esté activo en el puerto 5000.' }]);
      setStream('');
    }
    setLoading(false);
  }, [loading, open]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input); }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente IA'}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 10000,
          width: 58, height: 58, borderRadius: '50%', border: 'none',
          background: 'linear-gradient(135deg,#2dd4bf 0%,#0ea5e9 100%)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(45,212,191,0.50), 0 2px 8px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            background: '#f472b6', color: '#fff', borderRadius: '50%',
            width: 20, height: 20, fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #080f1c',
          }}>{unread}</span>
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 94, right: 24, zIndex: 9999,
          width: 370, maxWidth: 'calc(100vw - 32px)',
          height: 520, maxHeight: 'calc(100vh - 120px)',
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(180deg,#0d1b2e 0%,#070e1b 100%)',
          border: '1px solid rgba(45,212,191,0.22)',
          borderRadius: 22,
          boxShadow: '0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(45,212,191,0.07)',
          overflow: 'hidden',
          animation: 'chatPanelIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}>

          {/* Header */}
          <div style={{
            padding: '13px 16px',
            borderBottom: '1px solid rgba(45,212,191,0.10)',
            background: 'rgba(45,212,191,0.04)',
            display: 'flex', alignItems: 'center', gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>🤖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#f0ede8', fontWeight: 700, fontSize: 14 }}>{cfg.bot_name}</div>
              <div style={{ color: 'rgba(45,212,191,0.75)', fontSize: 11 }}>{cfg.bot_subtitle}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399', display: 'inline-block' }}/>
              <span style={{ color: 'rgba(240,237,232,0.45)', fontSize: 11 }}>En línea</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '14px 12px 8px',
            display: 'flex', flexDirection: 'column', gap: 10,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(45,212,191,0.15) transparent',
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 8 }}>
                {m.role === 'assistant' && (
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, marginTop: 2 }}>🤖</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '9px 13px',
                  borderRadius: m.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg,#2dd4bf,#0ea5e9)'
                    : 'rgba(255,255,255,0.065)',
                  border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  color: '#f0ede8', fontSize: 13, lineHeight: 1.65,
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>
                  {m.content}
                  {m.mapa_url && (
                    <a href={m.mapa_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      marginTop: 8, color: '#2dd4bf', fontSize: 12, fontWeight: 600,
                      textDecoration: 'none',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Ver en Google Maps →
                    </a>
                  )}
                  {m.accion === 'reserva_confirmada' && (
                    <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(52,211,153,0.14)', borderRadius: 8, fontSize: 11, color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>
                      ✅ Reserva registrada
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Streaming */}
            {stream && (
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, marginTop: 2 }}>🤖</div>
                <div style={{
                  maxWidth: '78%', padding: '9px 13px',
                  borderRadius: '4px 18px 18px 18px',
                  background: 'rgba(255,255,255,0.065)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#f0ede8', fontSize: 13, lineHeight: 1.65,
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>
                  {stream}<span style={{ opacity: 0.4, fontSize: 10 }}>▊</span>
                </div>
              </div>
            )}

            {/* Loading dots */}
            {loading && !stream && (
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, marginTop: 2 }}>🤖</div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '4px 18px 18px 18px',
                  background: 'rgba(255,255,255,0.065)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(j => (
                    <span key={j} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'rgba(45,212,191,0.7)',
                      display: 'inline-block',
                      animation: `chatDot 1.2s ${j * 0.2}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick prompts — only on first message */}
          {msgs.length === 1 && !loading && (
            <div style={{ padding: '4px 12px 8px', display: 'flex', gap: 6, flexWrap: 'wrap', flexShrink: 0 }}>
              {cfg.quick_prompts.map(q => (
                <button key={q}
                  onClick={() => sendMsg(q)}
                  style={{
                    padding: '5px 11px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                    background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.22)',
                    color: 'rgba(45,212,191,0.9)', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(45,212,191,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(45,212,191,0.08)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{
            padding: '8px 10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', gap: 8, alignItems: 'center',
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={cfg.placeholder}
              disabled={loading}
              style={{
                flex: 1, padding: '9px 14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(45,212,191,0.15)',
                borderRadius: 100, color: '#f0ede8', fontSize: 13,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.45)'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.15)'; }}
            />
            <button
              onClick={() => sendMsg(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: '50%', border: 'none', flexShrink: 0,
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg,#2dd4bf,#0ea5e9)'
                  : 'rgba(255,255,255,0.07)',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke={input.trim() && !loading ? '#fff' : 'rgba(255,255,255,0.3)'}
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
