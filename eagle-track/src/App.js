import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Search from './components/Search';
import ThemeToggle from './components/ThemeToggle';
import logo from './assets/logo.png'; 
import { createGlobalStyle } from 'styled-components';


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

  useEffect(() => {
    axios.get('http://localhost:5000/items').then((response) => setItems(response.data));
  }, []);

  const addItem = (newItem) => {
    axios.post('http://localhost:5000/items', newItem).then((response) => {
      setItems([...items, response.data]);
    });
  };

  const updateItem = (updatedItem) => {
    axios.put(`http://localhost:5000/items/${updatedItem.id}`, updatedItem).then(() => {
      setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

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
