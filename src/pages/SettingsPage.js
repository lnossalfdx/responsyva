// Em: src/pages/SettingsPage.js
import React, { useState } from 'react';

function SettingsPage() {
  // Criamos "memórias" (estados) para cada campo do formulário
  const [apiKey, setApiKey] = useState('');
  const [language, setLanguage] = useState('pt-br');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  // Esta função será chamada quando o formulário for enviado
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue
    const settingsData = {
      apiKey,
      language,
      whatsappNumber,
    };
    // Por enquanto, apenas exibimos os dados no console para teste
    console.log('Configurações salvas:', settingsData);
    alert('Configurações salvas! (Verifique o console)');
  };

  return (
    <div>
      {/* O page-title agora é controlado pelo App.js, então removemos daqui */}
      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          {/* Campo Chave de API */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Chave de API</label>
            <input 
              type="password" 
              placeholder="••••••••••••••••••••" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--cor-borda-vidro)', background: 'rgba(0,0,0,0.2)', color: 'white' }} 
            />
          </div>

          {/* NOVO CAMPO: NÚMERO DE WHATSAPP */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Número de WhatsApp (Opcional)</label>
            <input 
              type="tel" // Usamos 'tel' para números de telefone
              placeholder="+55 (41) 99999-9999" 
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--cor-borda-vidro)', background: 'rgba(0,0,0,0.2)', color: 'white' }} 
            />
            <p style={{fontSize: '0.8rem', opacity: 0.7, marginTop: '8px'}}>
              Cadastre seu número para interagir com os modelos de IA diretamente do seu WhatsApp.
            </p>
          </div>

          {/* Campo Idioma Padrão */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Idioma Padrão</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--cor-borda-vidro)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            >
              <option value="pt-br">Português (Brasil)</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', background: 'var(--cor-principal)', color: 'white', cursor: 'pointer' }}>Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;