import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';
import AddItemModal from './AddItemModal';
import './ShoppingList.css';

function ShoppingList({
  shoppingLists,
  userId,
  onUpdateShoppingList,
  users
}) {
  const { id } = useParams(); 
  const listId = parseInt(id, 10); 
  const list = shoppingLists.find((l) => l.id === listId);

  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(list.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMember = list.members.includes(userId);

  if (!list) {
    return <div>Shopping List not found</div>;
  }

  const handleEditListName = () => {
    if (isEditing) {
      const updatedList = { ...list, name: newListName };
      onUpdateShoppingList(updatedList);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleAddItem = (itemName) => {
    const newItem = {
      id: list.items.length + 1,
      name: itemName,
      resolved: false,
    };
    const updatedList = {
      ...list,
      items: [...list.items, newItem],
    };
    onUpdateShoppingList(updatedList);
    setIsModalOpen(false);
  };

  const handleToggleItemResolved = (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    };
    onUpdateShoppingList(updatedList);
  };

  const handleRemoveItem = (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.filter((item) => item.id !== itemId),
    };
    onUpdateShoppingList(updatedList);
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
          onAddItem={handleAddItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <ul>
        {filteredItems.map((item) => (
          <Product
            key={item.id}
            item={item}
            onToggleResolved={() => handleToggleItemResolved(item.id)}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
