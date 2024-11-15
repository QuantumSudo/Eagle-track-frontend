import React from "react";
import { Link } from "react-router-dom";

const ItemList = ({ items, deleteItem, updateItem }) => (
  <div>
    <h2>Inventory List</h2>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </div>
          <div>
            <Link to={`/edit/${item.id}`}>Edit</Link>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ItemList;
