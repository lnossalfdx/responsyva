import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import ModelsPage from './pages/ModelsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import KanbanPage from './pages/KanbanPage';
import CalendarPage from './pages/CalendarPage';
import ProfileAnalysisPage from './pages/ProfileAnalysisPage'; // <-- 1. Importe a nova página
import './App.css';
import { FiMessageSquare, FiClock, FiCpu, FiSettings, FiUser, FiTrello, FiCalendar, FiBarChart2 } from 'react-icons/fi'; // <-- 2. Importe o novo ícone

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/': return 'Chat Principal';
    case '/analise-perfil': return 'Análise de Perfil'; // <-- 3. Adicione o título
    case '/historico': return 'Histórico de Conversas';
    case '/modelos': return 'Modelos de IA';
    case '/kanban': return 'Funil Kanban';
    case '/calendario': return 'Calendário';
    case '/configuracoes': return 'Configurações';
    case '/perfil': return 'Minha Conta';
    default: return 'Responsyva';
  }
};

const MainLayout = ({ onLogout }) => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
          <h1 className="sidebar-title-text">PlataformaIA</h1>
        </div>
        <nav className="sidebar-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiMessageSquare className="nav-icon" />
            <span className="nav-text">Chat Principal</span>
          </NavLink>
          {/* 4. ADICIONE O NOVO LINK AQUI */}
          <NavLink to="/analise-perfil" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiBarChart2 className="nav-icon" />
            <span className="nav-text">Análise de Perfil</span>
          </NavLink>
          <NavLink to="/historico" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiClock className="nav-icon" />
            <span className="nav-text">Histórico</span>
          </NavLink>
          <NavLink to="/modelos" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiCpu className="nav-icon" />
            <span className="nav-text">Modelos de IA</span>
          </NavLink>
          <NavLink to="/kanban" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiTrello className="nav-icon" />
            <span className="nav-text">Funil Kanban</span>
          </NavLink>
          <NavLink to="/calendario" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiCalendar className="nav-icon" />
            <span className="nav-text">Calendário</span>
          </NavLink>
          <NavLink to="/configuracoes" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiSettings className="nav-icon" />
            <span className="nav-text">Configurações</span>
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h2 className="page-title">{pageTitle}</h2>
          <Link to="/perfil" className="profile-link">
            <div className="user-profile"><FiUser size={22} /></div>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/analise-perfil" element={<ProfileAnalysisPage />} /> {/* <-- 5. Adicione a nova rota */}
          <Route path="/historico" element={<HistoryPage />} />
          <Route path="/modelos" element={<ModelsPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="/perfil" element={<ProfilePage onLogout={onLogout} />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => { setIsLoggedIn(true); navigate('/'); };
  const handleLogout = () => setIsLoggedIn(false);
  return isLoggedIn ? <MainLayout onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
