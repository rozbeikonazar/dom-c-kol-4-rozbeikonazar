import React from 'react';
import Product from './Product'; 

function ProductsList({ products, onToggleResolved, onRemove }) {
  return (
    <main>
      <h2>Products</h2>
      <ul>
        {products.map((item) => (
          <Product 
            key={item.id} 
            item={item} 
            onToggleResolved={onToggleResolved} 
            onRemove={onRemove} 
          />
        ))}
      </ul>
    </main>
  );
}

export default ProductsList;
