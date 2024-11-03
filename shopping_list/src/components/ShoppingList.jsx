import React, { useState } from 'react';
import Product from './Product';
import AddItemModal from './AddItemModal'; 
import './ShoppingList.css'; 

function ShoppingList({ 
  list, 
  userId, 
  onUpdateListName,  
  onToggleItemResolved, 
  onRemoveItem,
  onAddItem 
}) {
  const [filter, setFilter] = useState('all'); 
  const [isEditing, setIsEditing] = useState(false); 
  const [newListName, setNewListName] = useState(list.name); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMember = list.members.includes(userId);

  const handleEditListName = () => {
    if (isEditing) {
      onUpdateListName(newListName); 
      setIsEditing(false); 
    } else {
      setIsEditing(true); 
    }
  };

  const filteredItems = list.items.filter((item) => {
    if (filter === 'resolved') return item.resolved;
    if (filter === 'unresolved') return !item.resolved;
    return true; // 'all'
  });

  return (
    <div>
      <div className="shopping-list-header">
        {isEditing ? (
          <input 
            type="text" 
            value={newListName} 
            onChange={(e) => setNewListName(e.target.value)} 
            placeholder={list.name} 
            className="list-name-input" 
          />
        ) : (
          <h2 className="list-name">{list.name}</h2>
        )}
        {list.ownerId === userId && (
          <button className="edit-save-button" onClick={handleEditListName}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        )}
      </div>

      <div className="filter-add-container">
        <button className="filter-button" onClick={() => setFilter('all')}>Show All</button>
        <button className="filter-button" onClick={() => setFilter('unresolved')}>Show Unresolved</button>
        <button className="filter-button" onClick={() => setFilter('resolved')}>Show Resolved</button>

        {isMember && (
          <button className="add-item-button" onClick={() => setIsModalOpen(true)}>+</button>
        )}
      </div>

      {isModalOpen && (
        <AddItemModal 
          onAddItem={onAddItem} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <ul>
        {filteredItems.map((item) => (
          <Product
            key={item.id}
            item={item}
            onToggleResolved={onToggleItemResolved} 
            onRemove={onRemoveItem} 
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
