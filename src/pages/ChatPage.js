import React, { useState, useEffect, useRef } from 'react';
// Importamos o ícone de envio da biblioteca que já instalamos
import { FiSend } from 'react-icons/fi';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { author: 'ai', content: 'Olá, como posso te ajudar hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Efeito para rolar o chat para a última mensagem
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Função para enviar a mensagem
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { author: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Lembre-se de substituir pela sua URL de teste do n8n
    const N8N_WEBHOOK_URL = 'https://flow.responsyva.com.br/webhook-test/33a99111-7daf-48a0-86ea-30f2dd7da2de';

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi "ok"');
      }
      
      const aiResponseText = await response.text();
      const aiMessage = { author: 'ai', content: aiResponseText };
      
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Erro ao conectar com o n8n:", error);
      const errorMessage = { author: 'ai', content: 'Desculpe, não consegui me conectar ao meu cérebro. Tente novamente.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // A parte visual do componente
  return (
    <>
      <div className="chat-window" ref={chatWindowRef}>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.author}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {/* Mostra a mensagem "Digitando..." enquanto espera a resposta */}
        {isLoading && (
          <div className="message ai">
            <p>Digitando...</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="glass-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder={isLoading ? "Aguarde a resposta..." : "Digite sua mensagem aqui..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading}>
          <FiSend size={20} />
        </button>
      </form>
    </>
  );
}

export default ChatPage;