import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ItemForm = ({ addItem, updateItem }) => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  // Fetch item data when editing
  useEffect(() => {
    if (id) {
      // Make sure we're getting the item correctly
      axios
        .get(`http://localhost:5000/items/${id}`)
        .then((response) => {
          const { name, quantity, price } = response.data;
          setName(name);
          setQuantity(quantity);
          setPrice(price);
        })
        .catch((error) => {
          console.error("Error fetching item data:", error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { name, quantity, price };

    if (id) {
      // Add the id to the item object when updating
      newItem.id = id;
      updateItem(newItem); // Update the item if it exists
    } else {
      addItem(newItem); // Otherwise, create a new item
    }

    navigate("/"); // Redirect to the list page
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ItemForm;