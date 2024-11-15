import React from "react";
import { Link } from "react-router-dom";

const ItemList = ({ items, deleteItem, updateItem }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inventory List</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow-md hover:bg-gray-50">
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: KSh {item.price}</p>
            </div>
            <div className="flex space-x-4">
              {/* Edit Button */}
              <Link
                to={`/edit/${item.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit
              </Link>
              {/* Delete Button */}
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;