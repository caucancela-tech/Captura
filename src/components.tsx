import { useEffect, useRef, type ReactNode } from 'react';
import { Link2, Lightbulb, AlignLeft, Image, Scan, FileText, StickyNote, X, ArrowUpRight, MoreHorizontal, Check } from 'lucide-react';
import type { Capture, CaptureType } from './model';
export const typeIcons = { Enlace: Link2, Texto: AlignLeft, Idea: Lightbulb, Fotografía: Image, Captura: Scan, Documento: FileText, Nota: StickyNote };
export function TypeIcon({ type, size = 15 }: { type: CaptureType; size?: number }) { const Icon = typeIcons[type]; return <Icon size={size} />; }
export function Modal({ title, children, close, wide = false }: { title: string; children: ReactNode; close: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const elements = ref.current?.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href]');
        if (!elements?.length) return;
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => { document.removeEventListener('keydown', handler); previous?.focus(); };
  }, [close]);
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}><div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className={`modal ${wide ? 'wide' : ''}`}><div className="modal-heading"><h2>{title}</h2><button className="icon-button" aria-label="Cerrar" onClick={close}><X size={20} /></button></div>{children}</div></div>;
}
export function CaptureCard({ item, selected, select, open, menu, compact }: { item: Capture; selected: boolean; select: () => void; open: () => void; menu: () => void; compact: boolean }) {
  return <article className={`capture-card type-${item.type} ${selected ? 'selected' : ''} ${compact ? 'compact' : ''}`}>
    {item.image && <button className="card-image" onClick={open} aria-label={`Abrir ${item.title}`}><img src={item.image} alt={item.title} /><span className="image-type"><TypeIcon type={item.type} />{item.type === 'Enlace' ? 'Enlace' : item.type}</span></button>}
    <div className="card-body"><div className="card-top"><span className={`type-label type-label-${item.type}`}><TypeIcon type={item.type} />{item.type}</span><div className="card-controls"><button className={`selection-button ${selected ? 'checked' : ''}`} onClick={select} aria-label={`Seleccionar ${item.title}`} aria-pressed={selected}>{selected && <Check size={12} />}</button><button className="icon-button" onClick={menu} aria-label={`Acciones para ${item.title}`}><MoreHorizontal size={18} /></button></div></div>
    {item.type === 'Documento' && <div className="document-preview"><div className="pdf-icon"><FileText size={27} /><span>PDF</span></div><div><strong>{item.fileName || 'Documento'}</strong><small>{item.fileSize ? `${(item.fileSize / 1024).toFixed(0)} KB` : 'Documento de ejemplo'}<span> · </span>{item.fileName?.split('.').pop()?.toUpperCase()}</small></div></div>}
    <button className="card-content" onClick={open}><h3>{item.title || 'Sin título'}</h3>{item.type !== 'Fotografía' && item.type !== 'Captura' && item.type !== 'Documento' && <p>{item.description || item.content}</p>}</button>
    {item.source && <span className="card-source">{item.type === 'Enlace' && <span className="favicon">{item.source[0].toUpperCase()}</span>}{item.source}{item.type === 'Enlace' && <ArrowUpRight size={12} />}</span>}
    <div className="card-tags">{item.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><div className="card-footer"><span>{new Date(item.created).toLocaleDateString('es', { day: 'numeric', month: 'short' })} · {new Date(item.created).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}</span><span className={`review-dot ${item.status === 'organized' ? 'done' : ''}`} title={item.status === 'pending' ? 'Pendiente de revisar' : item.status} /></div></div>
  </article>;
}
