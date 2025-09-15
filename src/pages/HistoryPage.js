import React, { useState } from 'react';
import { FiSearch, FiArrowRight, FiTrash2 } from 'react-icons/fi';

// Nova estrutura de dados, mais rica
const conversationsData = [
  { id: 1, title: 'Explorando Fotossíntese', date: '14 de Set, 2025', preview: 'A fotossíntese é o processo pelo qual as plantas, algas e algumas bactérias convertem luz solar em energia química...' },
  { id: 2, title: 'Ideias para Jantar Rápido', date: '13 de Set, 2025', preview: 'Claro! Aqui estão algumas ideias: macarrão ao pesto com tomates cereja, frango grelhado com legumes assados, ou uma salada...' },
  { id: 3, title: 'Resumo do Livro "1984"', date: '13 de Set, 2025', preview: 'George Orwell descreve uma sociedade distópica sob o regime totalitário do Partido, liderado pelo Grande Irmão...' },
  { id: 4, title: 'Debugando Código Python', date: '11 de Set, 2025', preview: 'O erro "IndentationError" geralmente significa que há um problema com os espaços ou tabs no seu código. Verifique a linha 42...' },
  { id: 5, title: 'Planejamento de Viagem', date: '10 de Set, 2025', preview: 'Para uma viagem de 5 dias à Patagônia, recomendo focar na região de El Chaltén, conhecida como a capital do trekking...'},
];

function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra as conversas com base no termo de busca
  const filteredConversations = conversationsData.filter(convo => 
    convo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <div className="search-bar glass-card">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar no histórico..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="history-list">
        {filteredConversations.map(convo => (
          <div key={convo.id} className="history-item glass-card">
            <div className="history-item-info">
              <h4 className="history-item-title">{convo.title}</h4>
              <p className="history-item-preview">{convo.preview}</p>
              <span className="history-item-date">{convo.date}</span>
            </div>
            <div className="history-item-actions">
              <button title="Abrir conversa"><FiArrowRight /></button>
              <button title="Excluir conversa" className="delete-button"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;