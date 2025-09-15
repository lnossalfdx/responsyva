import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function EditCardModal({ card, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [value, setValue] = useState(0);
  const [priority, setPriority] = useState('Média');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setContent(card.content || '');
      setValue(card.value || 0);
      setPriority(card.priority || 'Média');
      setTags((card.tags || []).join(', '));
    }
  }, [card]);

  if (!card) {
    return null;
  }
  
  const handleSave = () => {
    onSave({
      ...card,
      title,
      content,
      value: Number(value),
      priority,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}><FiX /></button>
        <h3 className="modal-title">Editar Detalhes do Negócio</h3>
        
        <div className="modal-grid">
          <div>
            <label className="modal-label">Título do Negócio</label>
            <input type="text" className="modal-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="modal-label">Valor (R$)</label>
            <input type="number" className="modal-input" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
        </div>

        <label className="modal-label">Descrição</label>
        <textarea className="modal-textarea" value={content} onChange={(e) => setContent(e.target.value)} rows="3"></textarea>
        
        <div className="modal-grid">
          <div>
            <label className="modal-label">Prioridade</label>
            <select className="modal-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>
          </div>
          <div>
            <label className="modal-label">Etiquetas (separadas por vírgula)</label>
            <input type="text" className="modal-input" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
        </div>
        
        <button className="modal-save-button" onClick={handleSave}>Salvar Alterações</button>
      </div>
    </div>
  );
}

export default EditCardModal;