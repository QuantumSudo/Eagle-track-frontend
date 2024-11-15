import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ItemForm = ({ addItem, updateItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/items/${id}`)
        .then((response) => {
          const { name, quantity, price } = response.data;
          setName(name);
          setQuantity(quantity);
          setPrice(price);
        })
        .catch((error) => console.error("Error fetching item data:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, quantity, price };

    if (id) {
      newItem.id = id;
      updateItem(newItem);
    } else {
      addItem(newItem);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
