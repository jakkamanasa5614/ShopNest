window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('product-container');

  try {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = `<p style="color:red">Failed to load products.</p>`;
    console.error('Fetch error:', err);
  }
});
