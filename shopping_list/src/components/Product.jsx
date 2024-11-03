import React from 'react';
import './Product.css';

function Product({ item, onToggleResolved, onRemove }) {
  return (
    <li className="product-item">
      {item.resolved && (
        <span className="tick-icon">✔️</span>
      )}
      <span className={`product-name ${item.resolved ? 'resolved' : ''}`}>
        {item.name}
      </span>
      <button onClick={() => onToggleResolved(item.id)} className="done-button">
        {item.resolved ? 'Undo' : 'Done'}
      </button>
      <button onClick={() => onRemove(item.id)} className="remove-button">
        Remove
      </button>
    </li>
  );
}

export default Product;
