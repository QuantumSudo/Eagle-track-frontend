import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Search from './components/Search';
import ThemeToggle from './components/ThemeToggle';
import logo from './assets/logo.png'; 
import { createGlobalStyle } from 'styled-components';

// Global style for theme switching
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#fff')};
    color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
    transition: all 0.3s ease;
  }
`;

const App = () => {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  // URL for your deployed backend on Render
  const API_URL = 'https://eagle-track-backend-4.onrender.com/items'; // Use your backend deployed URL

  // Fetch data from the backend on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setItems(response.data);  // Update state with fetched items
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []); // Empty dependency array to only fetch data on mount

  // Add a new item
  const addItem = (newItem) => {
    axios.post(API_URL, newItem)
      .then((response) => {
        setItems([...items, response.data]);  // Add new item to state
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  // Update an existing item
  const updateItem = (updatedItem) => {
    axios.put(`${API_URL}/${updatedItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));  // Update item in state
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  // Delete an item
  const deleteItem = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));  // Remove item from state
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <GlobalStyle theme={theme} />
      <div className="container mx-auto p-5">
        <header className="flex justify-between items-center mb-8">
          <img src={logo} alt="Logo" className="h-36" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Routes>
          <Route
            path="/"
            element={<ItemList items={filteredItems} deleteItem={deleteItem} updateItem={updateItem} />}
          />
          <Route path="/add" element={<ItemForm addItem={addItem} />} />
          <Route path="/edit/:id" element={<ItemForm updateItem={updateItem} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
