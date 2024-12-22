import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingLists.css';

const ShoppingLists = ({
  userId,
  shoppingLists,
  onAddList,
  onDeleteList,
  onUpdateShoppingList,
  users
}) => {
  const [newListName, setNewListName] = useState('');
  const [filter, setFilter] = useState('all');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const filteredLists = shoppingLists.filter((list) => {
    if (filter === 'archived') return list.archived;
    if (filter === 'active') return !list.archived;
    return true; // 'all'
  });

  const handleAddList = () => {
    if (newListName.trim()) {
      onAddList(newListName);
      setNewListName('');
    }
  };

  const handleArchiveToggle = (list) => {
    const updatedList = { ...list, archived: !list.archived };
    onUpdateShoppingList(updatedList);
  };

  const handleDelete = () => {
    if (listToDelete) {
      onDeleteList(listToDelete.id);
      setListToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <div className="shopping-lists">
      <h1>Your Shopping Lists</h1>

      <div className="add-list">
        <input
          type="text"
          placeholder="New List Name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={handleAddList}>Add List</button>
      </div>

      <div className="filter-container">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="list-grid">
        {filteredLists.map((list) => {
          const resolvedCount = list.items.filter((item) => item.resolved).length;
          const unresolvedCount = list.items.length - resolvedCount;

          return (
            <div
              key={list.id}
              className={`list-tile ${list.archived ? 'archived' : 'active'}`}
            >
              <Link to={`/list/${list.id}`}>
                <h3>{list.name}</h3>
                <p>Total Items: {list.items.length}</p>
                <p>Resolved: {resolvedCount}</p>
                <p>Unresolved: {unresolvedCount}</p>
              </Link>
              <p className={list.archived ? 'archived-text' : 'active-text'}>
                {list.archived ? 'Archived' : 'Active'}
              </p>

              <button
                className={`archive-button ${list.archived ? 'archived' : 'active'}`}
                onClick={() => handleArchiveToggle(list)}
              >
                {list.archived ? 'Unarchive' : 'Archive'}
              </button>

              {list.ownerId === userId && (
                <button
                  className="delete-button"
                  onClick={() => {
                    setListToDelete(list);
                    setIsConfirmModalOpen(true);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>

      {isConfirmModalOpen && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>Are you sure you want to delete "{listToDelete?.name}"?</p>
            <div className="modal-buttons">
              <button onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingLists;
