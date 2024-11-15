import React, { useState, useEffect } from 'react';

// In ItemForm.js, directly use the API_URL
const API_URL = 'https://eagle-track-backend-4.onrender.com';  // Define API_URL here as well

const ItemForm = ({ addItem, updateItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  // Fetch item data if updating an existing item
  useEffect(() => {
    if (updateItem) {
      const itemId = 1;  // Replace with dynamic param for editing an item
      fetch(`${API_URL}/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setItemName(data.name);
          setItemDescription(data.description);
        })
        .catch((error) => console.error('Error fetching item:', error));
    }
  }, [updateItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name: itemName, description: itemDescription };

    if (updateItem) {
      // Call updateItem function from App.js
      updateItem(newItem);
    } else {
      // Add new item using addItem function from App.js
      addItem(newItem);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </label>
      <label>
        Item Description:
        <input
          type="text"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
      </label>
      <button type="submit">{updateItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
};

export default ItemForm;
