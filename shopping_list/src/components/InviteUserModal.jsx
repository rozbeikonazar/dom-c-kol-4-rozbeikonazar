import React, { useState } from 'react';
import "./Components.css";

function InviteUserModal({ onInviteUser, onClose, users, invitedUsers }) {
    console.log(users, "InviteUserModal.jsx");
    console.log(invitedUsers, "Invited users")

    
    const [userId, setUserId] = useState('');

    const handleInvite = () => {
        const id = Number(userId);

        if (id > 1 && users[id]) {
            const isAlreadyInvited = invitedUsers.some(user => user.id === id); 
            if (isAlreadyInvited) {
                alert(`${users[id]} is already a member.`);
            } else {
                onInviteUser(id); 
                alert(`${users[id]} has been invited!`); 
                onClose(); 
                setUserId('');
            }
        } else if (id <= 1) {
            alert('User ID must be greater than 1');
        } else {
            alert('Invalid user ID');
        }
    };


    return (
        <div className="modal">
            <h2>Invite User</h2>
            <input
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="Enter User ID"
            />
            <button onClick={handleInvite}>Invite User</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default InviteUserModal;
