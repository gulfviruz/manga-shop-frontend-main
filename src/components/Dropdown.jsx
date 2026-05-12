import { useState, useRef, useEffect } from 'react';
import '../assets/css/dropdown.css';

export default function Dropdown({ options, onSelect, defaultLabel = 'Выберите' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        {defaultLabel} ▼
      </button>
      {open && (
        <div className="dropdown-menu">
          {options.map(opt => (
            <button key={opt.value} onClick={() => {
              onSelect(opt.value);
              setOpen(false);
            }}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}