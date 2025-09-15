import React from 'react';
// Importando os ícones que precisamos
import { SiOpenai, SiGooglegemini, SiX, SiProbot, SiAnthropic, SiNvidia } from 'react-icons/si';

// Nova lista de modelos com seus respectivos ícones
const models = [
  { 
    name: 'GPT-5',
    icon: <SiOpenai size={30} color="#74AA9C" />,
    description: "Futura geração de modelos da OpenAI."
  },
  { 
    name: 'Gemini 2.5 Pro',
    icon: <SiGooglegemini size={30} color="#89B4F8" />,
    description: "Versão avançada do modelo multimodal do Google."
  },
  { 
    name: 'Claude 3.5 Sonnet',
    icon: <SiAnthropic size={30} color="#D97757" />,
    description: "Novo modelo da Anthropic com foco em velocidade e custo-benefício."
  },
  { 
    name: 'Grok-2',
    icon: <SiX size={30} color="#FFFFFF" />,
    description: "Modelo da xAI com acesso a informações em tempo real e contexto longo."
  },
  { 
    name: 'DeepSeek-V2',
    icon: <SiProbot size={30} color="#9A77D9" />, // Ícone genérico de 'robô'
    description: "Modelo de código aberto com forte capacidade em programação."
  },
  {
    name: 'NVIDIA Nemotron-4',
    icon: <SiNvidia size={30} color="#76B900" />,
    description: "Modelo otimizado para geração de dados sintéticos para treinamento."
  }
];

function ModelsPage() {
  return (
    <div className="models-grid">
      {models.map((model) => (
        <div key={model.name} className="glass-card model-card">
          <div className="model-icon-container">
            {model.icon}
          </div>
          <div className="model-info">
            <h3 className="model-name">{model.name}</h3>
            <p className="model-description">{model.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ModelsPage;