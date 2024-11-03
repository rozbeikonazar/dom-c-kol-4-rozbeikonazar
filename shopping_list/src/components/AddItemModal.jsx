import React, { useState } from 'react';
import "./Components.css"

function AddItemModal({ onAddItem, onClose }) {
  const [newItemName, setNewItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (newItemName.trim()) {
      onAddItem(newItemName); 
      setNewItemName('');
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
        />
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default AddItemModal;
