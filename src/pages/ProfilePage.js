import React from 'react';
import { FiUser, FiEdit2, FiLogOut } from 'react-icons/fi';

// O componente agora recebe a função onLogout
function ProfilePage({ onLogout }) {
  return (
    <div className="profile-page">
      <div className="glass-card profile-card">
        <div className="profile-avatar">
          <FiUser size={50} />
        </div>
        <h3 className="profile-name">Logan Nossal</h3>
        <p className="profile-email">exemplo@email.com</p>
        
        <div className="profile-actions">
          <button className="profile-button">
            <FiEdit2 />
            <span>Editar Perfil</span>
          </button>
          {/* O botão de sair agora chama a função onLogout quando clicado */}
          <button className="profile-button logout-button" onClick={onLogout}>
            <FiLogOut />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;