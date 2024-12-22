import React, { useState } from 'react';
import './Components.css';
import InviteUserModal from './InviteUserModal';

function Header({
  invitedUsers, 
  onKickMember, 
  ownerId, 
  userId, 
  onInviteUser, 
  onLeaveList, 
  users,
  onToggleTheme, // Function to toggle the theme
  onChangeLanguage // Function to change the language
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKickMember = (memberId) => {
    if (onKickMember && memberId !== ownerId) {
      onKickMember(memberId);
    }
  };

  const filteredInvitedUsers = invitedUsers.filter((user) => user.id !== ownerId);

  return (
    <header className="header">
      {/* Invite User Button or Leave List Button */}
      {userId === ownerId ? (
        <button className="invite-user-btn" onClick={() => setIsModalOpen(true)}>
          Invite User
        </button>
      ) : (
        invitedUsers.some((user) => user.id === userId) && (
          <button onClick={onLeaveList} className="leave-list-button">
            Leave List
          </button>
        )
      )}

      {/* Invite User Modal */}
      {isModalOpen && (
        <InviteUserModal
          onInviteUser={onInviteUser}
          onClose={() => setIsModalOpen(false)}
          users={users}
          invitedUsers={invitedUsers}
        />
      )}

      {/* Dropdown for Invited Users */}
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleDropdown}>Invited Users</button>
        <div className="dropdown-content">
          {filteredInvitedUsers.map((user) => (
            <div key={user.id} className="dropdown-item">
              <span>{user.name}</span>
              {userId === ownerId && (
                <span
                  className="kick-icon"
                  onClick={() => handleKickMember(user.id)}
                >
                  &times;
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button onClick={onToggleTheme} className="theme-toggle-btn">
        Toggle Theme
      </button>

      {/* Language Switcher Buttons */}
      <div className="language-switcher">
        <button onClick={() => onChangeLanguage('en')} className="language-btn">English</button>
        <button onClick={() => onChangeLanguage('cs')} className="language-btn">Czech</button>
      </div>
    </header>
  );
}

export default Header;
