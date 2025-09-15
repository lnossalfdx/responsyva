import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Função auxiliar para gerar os dias do mês (exemplo simples)
const generateDays = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
};

function CalendarPage() {
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const daysInMonth = generateDays();

  return (
    <div className="glass-card">
      <div className="calendar-header">
        <button className="calendar-nav-button"><FiChevronLeft /></button>
        <h2>Setembro 2025</h2>
        <button className="calendar-nav-button"><FiChevronRight /></button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {daysInMonth.map(day => (
          <div key={day} className="calendar-day">
            {day}
            {/* Exemplo de evento no calendário */}
            {day === 18 && <div className="calendar-event">Reunião</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarPage;