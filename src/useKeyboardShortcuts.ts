import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function useKeyboardShortcuts(modalOpen: boolean, openCapture: () => void) {
  const navigate = useNavigate();

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        navigate('/busqueda');
        setTimeout(() => document.getElementById('search')?.focus(), 50);
        return;
      }

      const target = event.target as HTMLElement;
      if (modalOpen || target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (event.key.toLowerCase() === 'n' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        openCapture();
      }
      if (event.key === '/') {
        event.preventDefault();
        document.getElementById('search')?.focus();
      }
    };

    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [navigate, modalOpen, openCapture]);
}
