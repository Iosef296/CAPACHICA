import { useState, useEffect, useCallback } from 'react';

const IA = import.meta.env.PUBLIC_IA_URL || 'http://localhost:5000';

interface Entry { id: number; categoria: string; pregunta: string; respuesta: string; }
interface Knowledge { conocimiento: Entry[]; contexto_base: string; nombre_ia: string; descripcion: string; }

const CATS = ['general','precios','actividades','alojamiento','transporte','gastronomia','cultura','clima','reservas','festividades'];

const s = {
  input: {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(45,212,191,0.20)',
    borderRadius: 10, color: '#f0ede8',
    fontSize: 14, outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  } as React.CSSProperties,
  card: {
    background: 'rgba(10,22,40,0.70)',
    border: '1px solid rgba(45,212,191,0.12)',
    borderRadius: 16, padding: '20px 22px',
  } as React.CSSProperties,
  label: { fontSize: 11, color: 'rgba(240,237,232,0.50)', display: 'block', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' } as React.CSSProperties,
};

export default function IAConfig() {
  const [data, setData]         = useState<Knowledge | null>(null);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [catFilter, setCat]     = useState('');
  const [form, setForm]         = useState({ categoria: 'general', pregunta: '', respuesta: '' });
  const [ctx, setCtx]           = useState('');
  const [showCtx, setShowCtx]   = useState(false);
  const [toast, setToast]       = useState('');
  const [editId, setEditId]     = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ pregunta: '', respuesta: '', categoria: '' });

  const msg = (t: string) => { setToast(t); setTimeout(() => setToast(''), 3000); };

  const load = useCallback(async () => {
    try {
      const r = await fetch(`${IA}/api/admin/conocimiento`);
      const d: Knowledge = await r.json();
      setData(d); setCtx(d.contexto_base || '');
    } catch { msg('❌ No se pudo conectar al backend IA (puerto 5000)'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async () => {
    if (!form.pregunta.trim() || !form.respuesta.trim()) { msg('⚠️ Pregunta y Respuesta son obligatorias'); return; }
    await fetch(`${IA}/api/admin/conocimiento`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    });
    setForm({ categoria: 'general', pregunta: '', respuesta: '' });
    msg('✅ Conocimiento agregado'); load();
  };

  const del = async (id: number) => {
    if (!confirm('¿Eliminar esta entrada?')) return;
    await fetch(`${IA}/api/admin/conocimiento/${id}`, { method: 'DELETE' });
    msg('✅ Eliminado'); load();
  };

  const saveEdit = async () => {
    if (!editId) return;
    await fetch(`${IA}/api/admin/conocimiento/${editId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    }).catch(() => {});
    setEditId(null); msg('✅ Actualizado'); load();
  };

  const saveCtx = async () => {
    await fetch(`${IA}/api/admin/contexto`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contexto_base: ctx }),
    });
    setShowCtx(false); msg('✅ Contexto guardado'); load();
  };

  const filtered = (data?.conocimiento ?? []).filter(e =>
    (!catFilter || e.categoria === catFilter) &&
    (!search || e.pregunta.toLowerCase().includes(search.toLowerCase()) ||
      e.respuesta.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', padding: '80px 0 60px', color: '#f0ede8' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🤖</div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,32px)', fontWeight: 700, margin: 0 }}>Configuración de Inti IA</h1>
              <p style={{ color: 'rgba(45,212,191,0.80)', fontSize: 13, margin: 0 }}>Capachica Turismo · {IA}</p>
            </div>
          </div>
          {data && (
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 12 }}>
              {[
                { label: 'Entradas', val: data.conocimiento.length, color: '#2dd4bf' },
                { label: 'Categorías', val: [...new Set(data.conocimiento.map(e => e.categoria))].length, color: '#fbbf24' },
              ].map(s => (
                <div key={s.label} style={{ ...s, background: 'rgba(10,22,40,0.55)', border: `1px solid ${s.color}22`, borderRadius: 12, padding: '10px 20px', textAlign: 'center' }}>
                  <div style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ color: 'rgba(240,237,232,0.55)', fontSize: 11 }}>{s.label}</div>
                </div>
              ))}
              <button onClick={() => setShowCtx(v => !v)} style={{
                padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(212,168,67,0.30)',
                background: showCtx ? 'rgba(212,168,67,0.12)' : 'transparent',
                color: '#fbbf24', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>⚙️ {showCtx ? 'Cerrar' : 'Editar'} contexto base</button>
            </div>
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div style={{ marginBottom: 20, padding: '12px 18px', borderRadius: 12, fontSize: 14, fontWeight: 500,
            background: toast.startsWith('❌') ? 'rgba(248,113,113,0.12)' : toast.startsWith('⚠️') ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.12)',
            border: `1px solid ${toast.startsWith('❌') ? 'rgba(248,113,113,0.30)' : toast.startsWith('⚠️') ? 'rgba(251,191,36,0.30)' : 'rgba(52,211,153,0.30)'}`,
            color: toast.startsWith('❌') ? '#f87171' : toast.startsWith('⚠️') ? '#fbbf24' : '#34d399',
          }}>{toast}</div>
        )}

        {/* Contexto base */}
        {showCtx && (
          <div style={{ ...s.card, marginBottom: 28, borderColor: 'rgba(212,168,67,0.25)' }}>
            <label style={s.label}>Contexto base del sistema (instrucciones globales de Inti)</label>
            <textarea value={ctx} onChange={e => setCtx(e.target.value)} rows={10}
              style={{ ...s.input, resize: 'vertical', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.7 }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={saveCtx} style={{ padding: '9px 20px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>💾 Guardar contexto</button>
              <button onClick={() => { setCtx(data?.contexto_base ?? ''); setShowCtx(false); }}
                style={{ padding: '9px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(240,237,232,0.70)', fontSize: 13, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Agregar nuevo */}
        <div style={{ ...s.card, marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 18, color: '#f0ede8' }}>+ Agregar conocimiento</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={s.label}>Categoría</label>
              <select value={form.categoria} onChange={e => setForm(p => ({ ...p, categoria: e.target.value }))}
                style={{ ...s.input, cursor: 'pointer' }}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>Pregunta *</label>
              <input value={form.pregunta} onChange={e => setForm(p => ({ ...p, pregunta: e.target.value }))}
                placeholder="¿Cuánto cuesta el kayak?" style={s.input}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.55)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.20)'}
              />
            </div>
            <div>
              <label style={s.label}>Respuesta *</label>
              <input value={form.respuesta} onChange={e => setForm(p => ({ ...p, respuesta: e.target.value }))}
                placeholder="El kayak cuesta S/. 30 por persona..." style={s.input}
                onKeyDown={e => e.key === 'Enter' && add()}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.55)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.20)'}
              />
            </div>
          </div>
          <button onClick={add} style={{
            padding: '10px 24px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)',
            color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>+ Agregar a Inti</button>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Buscar pregunta o respuesta..."
            style={{ ...s.input, maxWidth: 320, flex: 1 }}
            onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.55)'}
            onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(45,212,191,0.20)'}
          />
          <select value={catFilter} onChange={e => setCat(e.target.value)}
            style={{ ...s.input, width: 180, cursor: 'pointer' }}>
            <option value=''>Todas las categorías</option>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={load} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(45,212,191,0.20)', background: 'transparent', color: 'rgba(45,212,191,0.8)', fontSize: 13, cursor: 'pointer' }}>🔄</button>
        </div>

        <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: 12, marginBottom: 14 }}>
          {filtered.length} entradas{catFilter ? ` en "${catFilter}"` : ''}{search ? ` · "${search}"` : ''}
        </p>

        {/* Lista */}
        {loading && <p style={{ color: 'rgba(240,237,232,0.45)' }}>Cargando...</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(e => (
            <div key={e.id} style={{
              ...s.card,
              borderColor: editId === e.id ? 'rgba(45,212,191,0.35)' : 'rgba(45,212,191,0.10)',
            }}>
              {editId === e.id ? (
                /* Edit mode */
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10, marginBottom: 10 }}>
                    <div>
                      <label style={s.label}>Categoría</label>
                      <select value={editForm.categoria} onChange={e2 => setEditForm(p => ({ ...p, categoria: e2.target.value }))}
                        style={{ ...s.input, cursor: 'pointer' }}>
                        {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={s.label}>Pregunta</label>
                      <input value={editForm.pregunta} onChange={e2 => setEditForm(p => ({ ...p, pregunta: e2.target.value }))} style={s.input} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={s.label}>Respuesta</label>
                    <textarea value={editForm.respuesta} onChange={e2 => setEditForm(p => ({ ...p, respuesta: e2.target.value }))}
                      rows={3} style={{ ...s.input, resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={saveEdit} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>💾 Guardar</button>
                    <button onClick={() => setEditId(null)} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(240,237,232,0.60)', fontSize: 12, cursor: 'pointer' }}>Cancelar</button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.06em', flexShrink: 0, marginTop: 3,
                    background: 'rgba(45,212,191,0.10)', color: 'rgba(45,212,191,0.85)',
                    border: '1px solid rgba(45,212,191,0.18)',
                  }}>{e.categoria}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: '#f0ede8' }}>{e.pregunta}</div>
                    <div style={{ color: 'rgba(240,237,232,0.62)', fontSize: 13, lineHeight: 1.6 }}>{e.respuesta}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => { setEditId(e.id); setEditForm({ pregunta: e.pregunta, respuesta: e.respuesta, categoria: e.categoria }); }}
                      style={{ padding: '6px 11px', borderRadius: 8, border: '1px solid rgba(251,191,36,0.25)', background: 'transparent', color: '#fbbf24', fontSize: 12, cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => del(e.id)}
                      style={{ padding: '6px 11px', borderRadius: 8, border: '1px solid rgba(248,113,113,0.25)', background: 'transparent', color: '#f87171', fontSize: 12, cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {!loading && filtered.length === 0 && (
            <div style={{ ...s.card, textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
              <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: 14 }}>
                {data?.conocimiento.length === 0 ? 'No hay conocimiento aún. Agrega la primera entrada arriba.' : 'Ninguna entrada coincide con los filtros.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
