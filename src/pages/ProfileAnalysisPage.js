import React, { useState } from 'react';
import { FiAward, FiZap, FiMessageCircle, FiUsers, FiTarget, FiStar } from 'react-icons/fi'; // Importe FiTarget e FiStar

function ProfileAnalysisPage() {
  const [showImprovements, setShowImprovements] = useState(false); // Estado para controlar a visibilidade das melhorias

  const analysisData = {
    personalityType: 'O Estrategista Criativo',
    keywords: ['Inovação', 'Tecnologia', 'Liderança', 'Design'],
    focusScore: 88, // Nova métrica: Pontuação de Foco
    adaptabilityScore: 75, // Nova métrica: Pontuação de Adaptabilidade
    achievements: [
      { icon: <FiAward />, title: 'Mestre da Eficiência', description: 'Completou 10 tarefas de alta prioridade.' },
      { icon: <FiZap />, title: 'Inovador Veloz', description: 'Criou 5 projetos do zero.' },
      { icon: <FiMessageCircle />, title: 'Comunicador Nato', description: 'Histórico de conversas com alta clareza.' },
    ],
    improvements: [
      'Desenvolver habilidades de delegação para otimizar a carga de trabalho.',
      'Explorar novas ferramentas de análise de dados para aprimorar decisões.',
      'Praticar o feedback construtivo para fortalecer a equipe.',
      'Dedicar tempo para a reflexão estratégica semanalmente.',
    ],
  };

  const StatBar = ({ label, percentage, icon }) => (
    <div className="stat-bar-container">
      <div className="stat-bar-label">
        {icon}
        <span>{label}</span>
      </div>
      <div className="stat-bar-background">
        <div
          className="stat-bar-foreground"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="analysis-page">
      <div className="glass-card analysis-summary">
        <h4>A IA te vê como:</h4>
        <h2>{analysisData.personalityType}</h2>
        <p>Com base nas suas interações, seu perfil é focado em soluções inovadoras e pensamento estratégico. Suas palavras-chave mais frequentes são:</p>
        <div className="tags-container">
          {analysisData.keywords.map(tag => <span key={tag} className="card-tag analysis-tag">{tag}</span>)}
        </div>
      </div>

      <div className="glass-card">
        <h3 className="section-title">Métricas de Perfil</h3>
        {/* Novas métricas e ícones */}
        <StatBar label="Pontuação de Foco" percentage={analysisData.focusScore} icon={<FiTarget />} />
        <StatBar label="Pontuação de Adaptabilidade" percentage={analysisData.adaptabilityScore} icon={<FiStar />} />
      </div>

      <div className="glass-card">
        <h3 className="section-title">Conquistas Desbloqueadas</h3>
        <div className="achievements-grid">
          {analysisData.achievements.map((ach, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{ach.icon}</div>
              <div className="achievement-info">
                <h4>{ach.title}</h4>
                <p>{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card improvements-section">
        <h3 className="section-title">Melhorias de Perfil</h3>
        <div className={`blurred-content ${showImprovements ? 'unblurred' : ''}`}>
          {analysisData.improvements.map((item, index) => (
            <p key={index} className="improvement-item">
              <FiTarget className="improvement-icon" /> {item}
            </p>
          ))}
        </div>
        {!showImprovements && (
          <button className="unlock-button" onClick={() => setShowImprovements(true)}>
            Desbloquear Melhorias!
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileAnalysisPage;