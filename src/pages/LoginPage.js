import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

// Este componente recebe uma função 'onLogin' do seu pai (App.js)
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Como você pediu, qualquer coisa digitada funciona.
    // Apenas chamamos a função que recebemos para dizer "o login foi feito!".
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card">
        <h1 className="login-title">Responsyva</h1>
        <p className="login-subtitle">Acesse sua conta para continuar</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            <FiLogIn />
            <span>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;