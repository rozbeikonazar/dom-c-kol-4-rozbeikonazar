import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingLists from './components/ShoppingLists'; 
import ShoppingList from './components/ShoppingList'; 
import './App.css';

function App() {
  const userId = 2; 
  const users = {
    1: 'Alice',
    2: 'Bob',
    3: 'Charlie',
    4: 'Robert'
  };

  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Weekly Groceries',
      ownerId: 1,
      members: [1, 2, 3],
      items: [
        { id: 1, name: 'Milk', resolved: false },
        { id: 2, name: 'Bread', resolved: false },
      ],
      archived: false,
    },
    {
      id: 2,
      name: 'Party Supplies',
      ownerId: 2,
      members: [2, 3],
      items: [
        { id: 1, name: 'Balloons', resolved: false },
        { id: 2, name: 'Snacks', resolved: true },
      ],
      archived: true,
    },
  ]);

  const addList = (listName) => {
    const newList = {
      id: shoppingLists.length + 1,
      name: listName,
      ownerId: userId,
      members: [userId],
      items: [],
      archived: false,
    };
    setShoppingLists([...shoppingLists, newList]);
  };

  const deleteList = (listId) => {
    setShoppingLists(shoppingLists.filter(list => list.id !== listId || list.ownerId !== userId));
  };

  const updateShoppingList = (updatedList) => {
    setShoppingLists(shoppingLists.map(list => (list.id === updatedList.id ? updatedList : list)));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ShoppingLists
              userId={userId}
              shoppingLists={shoppingLists}
              onAddList={addList}
              onDeleteList={deleteList}
              onUpdateShoppingList={updateShoppingList}
              users={users}
            />
          }
        />
        <Route
          path="/list/:id"
          element={
            <ShoppingList
              userId={userId}
              shoppingLists={shoppingLists}
              onUpdateShoppingList={updateShoppingList}
              users={users}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
