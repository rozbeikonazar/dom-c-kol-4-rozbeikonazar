import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingLists from './components/ShoppingLists'; 
import ShoppingList from './components/ShoppingList'; 
import './App.css';
import LanguageSwitcher from './components/LanguageSwitcher'; 

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

  const translations = {
    en: {
      yourShoppingLists: 'Your Shopping Lists',
      newListName: 'New List Name',
      addList: 'Add List',
      all: 'All',
      active: 'Active',
      archived: 'Archived',
      totalItems: 'Total Items',
      resolved: 'Resolved',
      unresolved: 'Unresolved',
      archivedStatus: 'Archived',
      activeStatus: 'Active',
      unarchive: 'Unarchive',
      archive: 'Archive',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete',
      cancel: 'Cancel',
      itemStatus: 'Item Status',
      showAll: 'Show All',
      showResolved: 'Show Resolved',
      showUnresolved: 'Show Unresolved',
      listNotFound: 'Shopping list not found',
      edit: 'Edit',
      save: 'Save',
      inviteUser: "Invite"
    },
    cs: {
      yourShoppingLists: 'Vaše nákupní seznamy',
      newListName: 'Název nového seznamu',
      addList: 'Přidat seznam',
      all: 'Vše',
      active: 'Aktivní',
      archived: 'Archivováno',
      totalItems: 'Celkový počet položek',
      resolved: 'Vyřešeno',
      unresolved: 'Nevyřešeno',
      archivedStatus: 'Archivováno',
      activeStatus: 'Aktivní',
      unarchive: 'Obnovit',
      archive: 'Archivovat',
      delete: 'Smazat',
      confirmDelete: 'Opravdu chcete smazat',
      cancel: 'Zrušit',
      itemStatus: 'Stav položek',
      showAll: 'Zobrazit vše',
      showResolved: 'Zobrazit vyřešené',
      showUnresolved: 'Zobrazit nevyřešené',
      listNotFound: 'Nákupní seznam nebyl nalezen',
      edit: 'Upravit',
      save: 'Uložit',
      inviteUser: "Pozvat"
    }
  };

  const [language, setLanguage] = useState('en'); 
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const response = await fetch('http://localhost:8080/shoppingLists');
        if (!response.ok) {
          throw new Error('Failed to fetch shopping lists');
        }

        const data = await response.json();
        setShoppingLists(data); 
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShoppingLists();
  }, []); 

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addList = async (listName) => {
    const newList = {
      id: shoppingLists.length + 1,
      name: listName,
      ownerId: userId,
      members: [userId],
      items: [],
      archived: false,
    };

    try {
      const response = await fetch('http://localhost:8080/shoppingLists', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error('Failed to add list');
      }

      const addedList = await response.json();
      setShoppingLists([...shoppingLists, addedList]);
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      const response = await fetch(`http://localhost:8080/shoppingLists/${listId}`, { 
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete list');
      }

      setShoppingLists(shoppingLists.filter(list => list.id !== listId || list.ownerId !== userId));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const updateShoppingList = async (updatedList) => {
    try {
      const response = await fetch(`http://localhost:8080/shoppingLists/${updatedList.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedList),
      });

      if (!response.ok) {
        throw new Error('Failed to update list');
      }

      const updatedData = await response.json();
      setShoppingLists(shoppingLists.map(list => (list.id === updatedData.id ? updatedData : list)));
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  return (
    <Router>
      <div>
        <LanguageSwitcher onChangeLanguage={changeLanguage} />
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        {isLoading ? (
          <p>Loading shopping lists...</p> 
        ) : (
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
                  translations={translations[language]}
                  onChangeLanguage={changeLanguage} 
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
                  translations={translations[language]} 
                />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
