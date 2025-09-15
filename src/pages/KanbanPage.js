import React, { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCorners, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { FiPlus } from 'react-icons/fi';
import { KanbanColumn, KanbanCard } from './KanbanColumn'; // Importa o KanbanCard também
import EditCardModal from './EditCardModal';

// Nova estrutura de dados, mais rica
const initialColumns = [
  {
    id: 'prospects',
    title: 'Prospects',
    cards: [
      { id: '1', title: 'Lead Frio - Empresa X', content: 'Primeiro contato agendado.', priority: 'Baixa', value: 5000, tags: ['marketing', 'B2B'] },
      { id: '2', title: 'Lead Quente - Empresa Y', content: 'Demonstração marcada para sexta.', priority: 'Alta', value: 25000, tags: ['vendas'] },
    ],
  },
  {
    id: 'contacted',
    title: 'Contato Realizado',
    cards: [{ id: '3', title: 'Follow-up - Empresa Z', content: 'Enviar proposta amanhã.', priority: 'Média', value: 12000, tags: ['follow-up'] }],
  },
  {
    id: 'negotiation',
    title: 'Em Negociação',
    cards: [{ id: '4', title: 'Contrato - Empresa W', content: 'Aguardando revisão do jurídico.', priority: 'Alta', value: 55000, tags: ['contrato', 'jurídico'] }],
  },
];

function KanbanPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [editingCard, setEditingCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null); // Estado para o cartão sendo arrastado

  const addCard = (columnId) => {
    const newCard = {
      id: `card-${new Date().getTime()}`,
      title: 'Novo Lead',
      content: '',
      priority: 'Média',
      value: 0,
      tags: [],
    };
    const newColumns = columns.map(col => {
      if (col.id === columnId) {
        return { ...col, cards: [...col.cards, newCard] };
      }
      return col;
    });
    setColumns(newColumns);
  };

  const addColumn = () => {
    const newColumn = {
      id: `column-${new Date().getTime()}`,
      title: 'Nova Etapa',
      cards: [],
    };
    setColumns([...columns, newColumn]);
  };
  
  const handleColumnTitleChange = (columnId, newTitle) => {
    const newColumns = columns.map(col => (col.id === columnId ? { ...col, title: newTitle } : col));
    setColumns(newColumns);
  };

  const onDragStart = (event) => {
    const { active } = event;
    const card = columns.flatMap(col => col.cards).find(c => c.id === active.id);
    setActiveCard(card);
  };

  const onDragEnd = (event) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const sourceColumn = columns.find(col => col.cards.some(card => card.id === active.id));
    let destColumn = columns.find(col => col.id === over.id || col.cards.some(card => card.id === over.id));
    if (!destColumn) destColumn = columns.find(col => col.id === over.data.current?.sortable.containerId);
    if (!sourceColumn || !destColumn) return;
    
    const activeIndex = sourceColumn.cards.findIndex(card => card.id === active.id);
    const [movedCard] = sourceColumn.cards.splice(activeIndex, 1);
    
    if (sourceColumn.id === destColumn.id) {
      const overIndex = destColumn.cards.findIndex(card => card.id === over.id);
      destColumn.cards.splice(overIndex, 0, movedCard);
    } else {
      let overIndex = destColumn.cards.findIndex(card => card.id === over.id);
      if (overIndex === -1) overIndex = destColumn.cards.length;
      destColumn.cards.splice(overIndex, 0, movedCard);
    }

    setColumns([...columns]);
  };

  const handleCardClick = (card) => setEditingCard(card);

  const handleSaveCard = (updatedCard) => {
    const newColumns = columns.map(column => ({
      ...column,
      cards: column.cards.map(card => card.id === updatedCard.id ? updatedCard : card)
    }));
    setColumns(newColumns);
    setEditingCard(null);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  return (
    <>
      <div className="kanban-header">
        <button className="kanban-action-button" onClick={() => addCard(columns[0]?.id)}>
          <FiPlus /> Criar Cartão
        </button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              onTitleChange={handleColumnTitleChange}
              onCardClick={handleCardClick}
            />
          ))}
          <button className="add-column-button" onClick={addColumn}>
            <FiPlus /> Adicionar Etapa
          </button>
        </div>
        <DragOverlay>
          {activeCard ? <KanbanCard card={activeCard} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
      
      <EditCardModal 
        card={editingCard}
        onClose={() => setEditingCard(null)}
        onSave={handleSaveCard}
      />
    </>
  );
}

export default KanbanPage;