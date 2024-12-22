import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Product from './Product';
import AddItemModal from './AddItemModal';
import InviteUserModal from './InviteUserModal';
import './ShoppingList.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ShoppingList({ shoppingLists, userId, onUpdateShoppingList, users, translations }) {
  const { id } = useParams();
  const listId = parseInt(id, 10);
  const list = shoppingLists.find((l) => l.id === listId);

  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(list.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false); 

  if (!list) {
    return <div>{translations.listNotFound}</div>;
  }

  const resolvedCount = list.items.filter((item) => item.resolved).length;
  const unresolvedCount = list.items.length - resolvedCount;

  const pieData = {
    labels: [translations.resolved, translations.unresolved],
    datasets: [
      {
        label: translations.itemStatus,
        data: [resolvedCount, unresolvedCount],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#45a049', '#e53935'],
      },
    ],
  };

  const handleEditListName = () => {
    if (isEditing) {
      const updatedList = { ...list, name: newListName };
      onUpdateShoppingList(updatedList);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

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
            {isEditing ? translations.save : translations.edit}
          </button>
        )}
      </div>

      <div className="chart-container" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <h3>{translations.itemStatus}</h3>
        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
      </div>

      <div className="filter-add-container">
        <button className="filter-button" onClick={() => setFilter('all')}>{translations.showAll}</button>
        <button className="filter-button" onClick={() => setFilter('unresolved')}>{translations.showUnresolved}</button>
        <button className="filter-button" onClick={() => setFilter('resolved')}>{translations.showResolved}</button>
        <button className="add-item-button" onClick={() => setIsModalOpen(true)}>+</button>
        <button className="invite-user-button" onClick={() => setIsInviteModalOpen(true)}>
          {translations.inviteUser}
        </button>
      </div>

      {isModalOpen && (
        <AddItemModal
          onAddItem={(itemName) => {
            const newItem = { id: list.items.length + 1, name: itemName, resolved: false };
            const updatedList = { ...list, items: [...list.items, newItem] };
            onUpdateShoppingList(updatedList);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isInviteModalOpen && (
        <InviteUserModal
          onInviteUser={(id) => {
            console.log(`User with ID ${id} invited!`);
          }}
          onClose={() => setIsInviteModalOpen(false)}
          users={users}
          invitedUsers={[]} 
        />
      )}

      <ul>
        {list.items.filter((item) => {
          if (filter === 'resolved') return item.resolved;
          if (filter === 'unresolved') return !item.resolved;
          return true;
        }).map((item) => (
          <Product
            key={item.id}
            item={item}
            onToggleResolved={() => {
              const updatedList = {
                ...list,
                items: list.items.map((i) => (i.id === item.id ? { ...i, resolved: !i.resolved } : i)),
              };
              onUpdateShoppingList(updatedList);
            }}
            onRemove={() => {
              const updatedList = { ...list, items: list.items.filter((i) => i.id !== item.id) };
              onUpdateShoppingList(updatedList);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
