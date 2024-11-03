import React, { useState } from 'react';
import ShoppingList from './components/ShoppingList';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const userId = 2; // to log as an owner put 1 here, to log as a member put number between 2-4
  const users = {
    1: 'Alice',
    2: 'Bob',
    3: 'Charlie',
    4: 'Robert'
  };

  const [shoppingList, setShoppingList] = useState({
    id: 1,
    name: 'Weekly Groceries',
    ownerId: 1,
    members: [1, 2, 3],
    items: [
      { id: 1, name: 'Milk', resolved: false },
      { id: 2, name: 'Bread', resolved: false },
    ],
  });

  const updateListName = (newName) => {
    if (shoppingList.ownerId === userId) {
      setShoppingList((prevList) => ({
        ...prevList,
        name: newName,
      }));
    }
  };

  const kickMember = (memberId) => {
    if (shoppingList.ownerId === userId) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: prevList.members.filter((id) => id !== memberId),
      }));
    }
  };

  const leaveList = () => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((id) => id !== userId),
    }));
  };

  const toggleItemResolved = (itemId) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    }));
  };

  const addItem = (newItemName) => {
    const newItem = {
      id: shoppingList.items.length + 1, 
      name: newItemName,
      resolved: false,
    };

    setShoppingList((prevList) => ({
      ...prevList,
      items: [...prevList.items, newItem], 
    }));
  };

  const removeItem = (itemId) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== itemId), 
    }));
  };

  const addMember = (newMemberId) => {
    if (shoppingList.ownerId === userId && !shoppingList.members.includes(newMemberId)) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: [...prevList.members, newMemberId], 
      }));
    }
  };

  const invitedUsers = shoppingList.members
    .map(memberId => ({ id: memberId, name: users[memberId] }))
    .filter(user => user.id !== shoppingList.ownerId);

  return (
    <div className="App">
      <Header
        invitedUsers={invitedUsers}
        onKickMember={kickMember}
        onInviteUser={addMember}
        ownerId={shoppingList.ownerId}
        userId={userId}
        users={users}
        onLeaveList={leaveList}
      />
      <ShoppingList
        list={shoppingList}
        userId={userId}
        onUpdateListName={updateListName}
        onKickMember={kickMember}
        onToggleItemResolved={toggleItemResolved}
        onAddItem={addItem} 
        onRemoveItem={removeItem} 
        onAddMember={addMember} 
        users={users}
      />
      <Footer ownerName={users[shoppingList.ownerId]}/> 
    </div>
  );
}

export default App;
