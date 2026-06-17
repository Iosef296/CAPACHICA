import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'react';

const AI_URL = "http://localhost:5000";
const QUICK = ["¿Qué es Capachica?", "¿Cómo llegar?", "Quiero reservar"];
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "¡Hola! Soy Inti, tu guía virtual de Capachica 🌊\n¿En qué te puedo ayudar?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState("");
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef(msgs);
  useEffect(() => {
    historyRef.current = msgs;
  }, [msgs]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, stream]);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setUnread(0);
    }
  }, [open]);
  const sendMsg = useCallback(async (text) => {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput("");
    const userMsg = { role: "user", content: msg };
    const history = historyRef.current;
    setMsgs((prev) => [...prev, userMsg]);
    setLoading(true);
    setStream("");
    try {
      const res = await fetch(`${AI_URL}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: msg, historial: history })
      });
      if (!res.ok || !res.body) throw new Error("Server error");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let meta = {};
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") continue;
          try {
            const evt = JSON.parse(raw);
            if (evt.type === "meta") {
              meta = { accion: evt.accion, mapa_url: evt.mapa_url };
            }
            if (evt.type === "token" && evt.text) {
              full += evt.text;
              setStream(full);
            }
            if (evt.type === "done" && evt.fullText) {
              full = evt.fullText;
            }
            if (evt.type === "reserva_confirmada") {
              full = evt.respuesta ?? "";
              meta.accion = "reserva_confirmada";
            }
            if (evt.type === "reserva_incompleta") {
              full = evt.respuesta ?? "";
            }
          } catch {
          }
        }
      }
      const aiMsg = { role: "assistant", content: full, ...meta };
      setMsgs((prev) => [...prev, aiMsg]);
      setStream("");
      if (!open) setUnread((u) => u + 1);
    } catch {
      setMsgs((prev) => [...prev, { role: "assistant", content: "No pude conectar con el asistente. Asegúrate de que el servidor IA esté activo en el puerto 5000." }]);
      setStream("");
    }
    setLoading(false);
  }, [loading, open]);
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg(input);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        "aria-label": open ? "Cerrar asistente" : "Abrir asistente IA",
        style: {
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1e4,
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg,#2dd4bf 0%,#0ea5e9 100%)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(45,212,191,0.50), 0 2px 8px rgba(0,0,0,0.3)",
          transition: "transform 0.2s, box-shadow 0.2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "scale(1)";
        },
        children: [
          open ? /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.5", strokeLinecap: "round", children: [
            /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] }) : /* @__PURE__ */ jsx("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          !open && unread > 0 && /* @__PURE__ */ jsx("span", { style: {
            position: "absolute",
            top: -4,
            right: -4,
            background: "#f472b6",
            color: "#fff",
            borderRadius: "50%",
            width: 20,
            height: 20,
            fontSize: 11,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #080f1c"
          }, children: unread })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { style: {
      position: "fixed",
      bottom: 94,
      right: 24,
      zIndex: 9999,
      width: 370,
      maxWidth: "calc(100vw - 32px)",
      height: 520,
      maxHeight: "calc(100vh - 120px)",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg,#0d1b2e 0%,#070e1b 100%)",
      border: "1px solid rgba(45,212,191,0.22)",
      borderRadius: 22,
      boxShadow: "0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(45,212,191,0.07)",
      overflow: "hidden",
      animation: "chatPanelIn 0.22s cubic-bezier(0.34,1.56,0.64,1)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "13px 16px",
        borderBottom: "1px solid rgba(45,212,191,0.10)",
        background: "rgba(45,212,191,0.04)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#2dd4bf,#0ea5e9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0
        }, children: "🤖" }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx("div", { style: { color: "#f0ede8", fontWeight: 700, fontSize: 14 }, children: "Inti · Asistente IA" }),
          /* @__PURE__ */ jsx("div", { style: { color: "rgba(45,212,191,0.75)", fontSize: 11 }, children: "Capachica Turismo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 5 }, children: [
          /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399", display: "inline-block" } }),
          /* @__PURE__ */ jsx("span", { style: { color: "rgba(240,237,232,0.45)", fontSize: 11 }, children: "En línea" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        flex: 1,
        overflowY: "auto",
        padding: "14px 12px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(45,212,191,0.15) transparent"
      }, children: [
        msgs.map((m, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8 }, children: [
          m.role === "assistant" && /* @__PURE__ */ jsx("div", { style: { width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#2dd4bf,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 2 }, children: "🤖" }),
          /* @__PURE__ */ jsxs("div", { style: {
            maxWidth: "78%",
            padding: "9px 13px",
            borderRadius: m.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
            background: m.role === "user" ? "linear-gradient(135deg,#2dd4bf,#0ea5e9)" : "rgba(255,255,255,0.065)",
            border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
            color: "#f0ede8",
            fontSize: 13,
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }, children: [
            m.content,
            m.mapa_url && /* @__PURE__ */ jsxs("a", { href: m.mapa_url, target: "_blank", rel: "noopener noreferrer", style: {
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 8,
              color: "#2dd4bf",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none"
            }, children: [
              /* @__PURE__ */ jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
                /* @__PURE__ */ jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
              ] }),
              "Ver en Google Maps →"
            ] }),
            m.accion === "reserva_confirmada" && /* @__PURE__ */ jsx("div", { style: { marginTop: 8, padding: "6px 10px", background: "rgba(52,211,153,0.14)", borderRadius: 8, fontSize: 11, color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }, children: "✅ Reserva registrada" })
          ] })
        ] }, i)),
        stream && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsx("div", { style: { width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#2dd4bf,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 2 }, children: "🤖" }),
          /* @__PURE__ */ jsxs("div", { style: {
            maxWidth: "78%",
            padding: "9px 13px",
            borderRadius: "4px 18px 18px 18px",
            background: "rgba(255,255,255,0.065)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#f0ede8",
            fontSize: 13,
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }, children: [
            stream,
            /* @__PURE__ */ jsx("span", { style: { opacity: 0.4, fontSize: 10 }, children: "▊" })
          ] })
        ] }),
        loading && !stream && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsx("div", { style: { width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#2dd4bf,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 2 }, children: "🤖" }),
          /* @__PURE__ */ jsx("div", { style: {
            padding: "12px 16px",
            borderRadius: "4px 18px 18px 18px",
            background: "rgba(255,255,255,0.065)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            gap: 5,
            alignItems: "center"
          }, children: [0, 1, 2].map((j) => /* @__PURE__ */ jsx("span", { style: {
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(45,212,191,0.7)",
            display: "inline-block",
            animation: `chatDot 1.2s ${j * 0.2}s ease-in-out infinite`
          } }, j)) })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: bottomRef })
      ] }),
      msgs.length === 1 && !loading && /* @__PURE__ */ jsx("div", { style: { padding: "4px 12px 8px", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }, children: QUICK.map((q) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => sendMsg(q),
          style: {
            padding: "5px 11px",
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 600,
            background: "rgba(45,212,191,0.08)",
            border: "1px solid rgba(45,212,191,0.22)",
            color: "rgba(45,212,191,0.9)",
            cursor: "pointer",
            transition: "all 0.2s"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.background = "rgba(45,212,191,0.15)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.background = "rgba(45,212,191,0.08)";
          },
          children: q
        },
        q
      )) }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "8px 10px 12px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexShrink: 0
      }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: handleKey,
            placeholder: "Escribe tu pregunta...",
            disabled: loading,
            style: {
              flex: 1,
              padding: "9px 14px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(45,212,191,0.15)",
              borderRadius: 100,
              color: "#f0ede8",
              fontSize: 13,
              outline: "none",
              transition: "border-color 0.2s"
            },
            onFocus: (e) => {
              e.target.style.borderColor = "rgba(45,212,191,0.45)";
            },
            onBlur: (e) => {
              e.target.style.borderColor = "rgba(45,212,191,0.15)";
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => sendMsg(input),
            disabled: loading || !input.trim(),
            style: {
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "none",
              flexShrink: 0,
              background: input.trim() && !loading ? "linear-gradient(135deg,#2dd4bf,#0ea5e9)" : "rgba(255,255,255,0.07)",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            },
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                width: "15",
                height: "15",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.3)",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
                  /* @__PURE__ */ jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                ]
              }
            )
          }
        )
      ] })
    ] })
  ] });
}

export { ChatWidget as C };
