import React from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FiDollarSign } from 'react-icons/fi';

// Mapeamento de prioridades para cores
const priorityColors = {
  'Baixa': '#5A6983',
  'Média': '#4A83DE',
  'Alta': '#E65649',
};

// Componente para um cartão individual, agora exportado para ser usado no DragOverlay
export const KanbanCard = ({ card, onCardClick, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: card.id,
    data: { type: 'Card', card },
  });
  
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.3 : 1, // Esconde o original enquanto arrasta
    cursor: isOverlay ? 'grabbing' : 'grab', // Muda o cursor
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="kanban-card"
      onClick={() => onCardClick && onCardClick(card)}
    >
      <div 
        className="card-priority-indicator" 
        style={{ backgroundColor: priorityColors[card.priority] || '#5A6983' }}
      ></div>
      <div className="card-content">
        <h4>{card.title}</h4>
        <p>{card.content}</p>
        <div className="card-footer">
          <div className="card-value">
            <FiDollarSign size={14} />
            <span>{card.value.toLocaleString('pt-BR')}</span>
          </div>
          <div className="card-tags">
            {card.tags.map(tag => <span key={tag} className="card-tag">{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};


export const KanbanColumn = ({ column, onTitleChange, onCardClick }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  
  return (
    <SortableContext id={column.id} items={column.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className="kanban-column">
        <input
          className="kanban-column-title-input"
          value={column.title}
          onChange={(e) => onTitleChange(column.id, e.target.value)}
        />
        <div className="kanban-cards">
          {column.cards.map(card => (
            <KanbanCard key={card.id} card={card} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};