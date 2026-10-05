export type CaptureType = 'Enlace' | 'Texto' | 'Idea' | 'Fotografía' | 'Captura' | 'Documento' | 'Nota';
export type Capture = { id: string; type: CaptureType; title: string; content: string; description?: string; image?: string; source?: string; tags: string[]; collection: string; status: 'pending' | 'organized' | 'archived' | 'trash'; created: string; modified: string; notes: string; fileName?: string; fileSize?: number };
export const collections = ['Diseño e inspiración', 'Aprender algo nuevo', 'Mi próximo viaje', 'Ideas de producto'];
export const types: CaptureType[] = ['Enlace', 'Texto', 'Idea', 'Fotografía', 'Captura', 'Documento', 'Nota'];
const base = { status: 'pending' as const, collection: '', created: '2026-10-04T09:30:00', modified: '2026-10-04T09:30:00', notes: '' };
export const examples: Capture[] = [
  { ...base, id: '1', type: 'Enlace', title: 'El buen diseño es tan poco diseño como sea posible', content: 'https://www.vitsoe.com/rw/about/good-design', description: 'Los diez principios de Dieter Rams. Una manera de pensar el diseño que sigue siendo relevante.', source: 'vitsoe.com', tags: ['diseño', 'inspiración'], image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=900&auto=format&fit=crop&q=85' },
  { ...base, id: '2', type: 'Idea', title: 'Una pequeña idea para Captura', content: '¿Y si guardar algo fuera tan natural como dejar una nota en tu escritorio?\n\nMenos decisiones al capturar. Más espacio para pensar después.', tags: ['producto'] },
  { ...base, id: '3', type: 'Fotografía', title: 'Un lugar al que quiero volver', content: 'Referencia visual para el próximo viaje.', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&auto=format&fit=crop&q=85', source: 'Imagen de ejemplo · Unsplash', tags: ['viajes'] },
  { ...base, id: '4', type: 'Documento', title: 'Guía de identidad — proyecto personal', content: 'Documento de ejemplo. Captura tu propio archivo para conservarlo en esta sesión.', fileName: 'guia-de-identidad.pdf', source: 'Archivo de ejemplo', tags: ['diseño', 'referencia'] },
  { ...base, id: '5', type: 'Texto', title: 'Sobre la atención y las pequeñas cosas', content: '“La verdadera generosidad para con el porvenir consiste en darlo todo al presente.”', description: 'Una frase para volver a leer con calma.', source: 'Fragmento guardado · Albert Camus', tags: ['para leer'] },
  { ...base, id: '6', type: 'Enlace', title: 'Una colección de interfaces que inspiran', content: 'https://www.are.na', description: 'Conexiones, referencias y nuevas maneras de mirar. Un rincón de internet para explorar sin prisa.', source: 'are.na', tags: ['inspiración', 'web'], image: 'https://images.unsplash.com/photo-1509223197845-458d87318791?w=900&auto=format&fit=crop&q=85' },
  { ...base, id: '7', type: 'Nota', title: 'Lo que me llevo de la reunión', content: 'Simplificar el primer paso.\nDiseñar para lo cotidiano, no para lo excepcional.\nDejar espacio para que el producto respire.', tags: ['trabajo'] },
  { ...base, id: '8', type: 'Captura', title: 'Una paleta para el otoño', content: 'Referencia de color para explorar más tarde.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&auto=format&fit=crop&q=85', source: 'Imagen de ejemplo · Unsplash', tags: ['color', 'inspiración'] },
];
export function loadCaptures(): Capture[] {
  try { const stored = localStorage.getItem('captura-items'); return stored ? JSON.parse(stored) : examples; } catch { return examples; }
}
