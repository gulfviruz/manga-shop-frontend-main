import '../assets/css/modal.css';

export default function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Да</button>
          <button className="cancel-btn" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}