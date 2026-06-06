import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, AlertTriangle, Check, Settings } from 'lucide-react';
import { getFestividades, createFestividad, updateFestividad, deleteFestividad } from '../api';

const ESTADO_INICIAL = {
  nombre: '', fecha: '', mes: 1, tipo: 'Tradicional',
  ubicacion: '', descripcion: '', actividades: [],
  imagen: '', galeria: [], destacado: false
};

export default function Admin() {
  const [festividades, setFestividades] = useState([]);
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [editando, setEditando] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actInput, setActInput] = useState('');

  const cargarDatos = () => { setLoading(true); getFestividades().then(data => { setFestividades(data); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { cargarDatos(); }, []);

  const showToast = (msg, tipo = 'exito') => { setToast({ msg, tipo }); setTimeout(() => setToast(null), 3000); };

  const abrirCrear = () => { setForm(ESTADO_INICIAL); setEditando(null); setModalOpen(true); };
  const abrirEditar = (fest) => { setForm({ ...fest }); setEditando(fest.id); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) { await updateFestividad(editando, form); showToast('Festividad actualizada'); }
      else { await createFestividad(form); showToast('Festividad creada'); }
      setModalOpen(false); setEditando(null); cargarDatos();
    } catch { showToast('Error al guardar', 'error'); }
  };

  const handleDelete = async (id) => {
    try { await deleteFestividad(id); showToast('Festividad eliminada'); setConfirmDelete(null); cargarDatos(); }
    catch { showToast('Error al eliminar', 'error'); }
  };

  const agregarActividad = () => { if (actInput.trim()) { setForm(prev => ({ ...prev, actividades: [...prev.actividades, actInput.trim()] })); setActInput(''); } };
  const quitarActividad = (index) => { setForm(prev => ({ ...prev, actividades: prev.actividades.filter((_, i) => i !== index) })); };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-white dark:bg-night-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-sm font-semibold mb-2"><Settings size={14} className="inline mr-1" />Panel de Administracion</span>
            <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Gestionar <span className="text-gradient-gold">Festividades</span></h1>
          </div>
          <button onClick={abrirCrear} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-black font-bold text-sm transition-all"><Plus size={18} />Nueva Festividad</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="rounded-2xl border border-gray-200 dark:border-night-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-night-800">
                    {['ID','Nombre','Fecha','Tipo','Ubicacion','Acciones'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {festividades.map(f => (
                    <tr key={f.id} className="border-t border-gray-200 dark:border-night-700 hover:bg-gray-50 dark:hover:bg-night-800/50">
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{f.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{f.nombre}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{f.fecha}</td>
                      <td className="px-4 py-3"><span className="badge bg-gold-500/10 text-gold-600 dark:text-gold-400">{f.tipo}</span></td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{f.ubicacion}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => abrirEditar(f)} className="p-1.5 rounded-lg hover:bg-gold-500/10 text-gold-500" title="Editar"><Pencil size={16} /></button>
                          <button onClick={() => setConfirmDelete(f.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500" title="Eliminar"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {festividades.length === 0 && <div className="text-center py-10 text-gray-400">No hay festividades. Crea una!</div>}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="bg-white dark:bg-night-800 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-night-700">
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">{editando ? 'Editar Festividad' : 'Nueva Festividad'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-night-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nombre *</label>
                <input type="text" required value={form.nombre} onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none text-sm" placeholder="Ej: Virgen de la Candelaria" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Fecha *</label>
                  <input type="text" required value={form.fecha} onChange={e => setForm(prev => ({ ...prev, fecha: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm" placeholder="Ej: 1 al 14 de Febrero" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Mes</label>
                  <select value={form.mes} onChange={e => setForm(prev => ({ ...prev, mes: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm">
                    {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tipo</label>
                  <select value={form.tipo} onChange={e => setForm(prev => ({ ...prev, tipo: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm">
                    <option>Religiosa</option><option>Ceremonial</option><option>Tradicional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ubicacion</label>
                  <input type="text" value={form.ubicacion} onChange={e => setForm(prev => ({ ...prev, ubicacion: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm" placeholder="Capachica, Puno" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Descripcion</label>
                <textarea value={form.descripcion} onChange={e => setForm(prev => ({ ...prev, descripcion: e.target.value }))} rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm resize-none" placeholder="Describe la festividad..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">URL de Imagen</label>
                <input type="text" value={form.imagen} onChange={e => setForm(prev => ({ ...prev, imagen: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Actividades</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={actInput} onChange={e => setActInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); agregarActividad(); } }}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-night-600 bg-white dark:bg-night-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/50 outline-none text-sm" placeholder="Agregar actividad..." />
                  <button type="button" onClick={agregarActividad} className="px-3 py-2 rounded-xl bg-gold-500/10 text-gold-500 hover:bg-gold-500/20"><Plus size={18} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.actividades.map((act, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-night-700 text-xs text-gray-700 dark:text-gray-300">{act}<button type="button" onClick={() => quitarActividad(i)} className="text-red-400 hover:text-red-600"><X size={12} /></button></span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="destacado" checked={form.destacado} onChange={e => setForm(prev => ({ ...prev, destacado: e.target.checked }))} className="w-4 h-4 accent-gold-500" />
                <label htmlFor="destacado" className="text-sm text-gray-700 dark:text-gray-300">Marcar como destacado</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-black font-bold text-sm transition-all"><Save size={16} />{editando ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-night-700">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white dark:bg-night-800 rounded-2xl p-6 max-w-sm mx-4 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"><AlertTriangle size={28} className="text-red-500" /></div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Eliminar Festividad</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Esta accion no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-night-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-night-700">Cancelar</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast px-5 py-3 rounded-xl font-medium text-sm shadow-lg ${toast.tipo === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
          <div className="flex items-center gap-2">{toast.tipo === 'error' ? <X size={16} /> : <Check size={16} />}{toast.msg}</div>
        </div>
      )}
    </div>
  );
}