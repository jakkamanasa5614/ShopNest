const apiBase = 'http://localhost:5000/api';

// ---------- Show Product Listing on index.html ----------
if (window.location.pathname.includes('index.html')) {
  fetch(`${apiBase}/products`)
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById('product-list');
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${p.imageUrl}" width="100" />
          <h3>${p.title}</h3>
          <p>₹${p.price}</p>
          <a href="product.html?id=${p._id}"><button>View</button></a>
        `;
        list.appendChild(div);
      });
    });
}

// ---------- Show Product Detail on product.html ----------
if (window.location.pathname.includes('product.html')) {
  const id = new URLSearchParams(window.location.search).get('id');
  fetch(`${apiBase}/products/${id}`)
    .then(res => res.json())
    .then(product => {
      const div = document.getElementById('product-detail');
      div.innerHTML = `
        <img src="${product.imageUrl}" width="150" />
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <h3>Price: ₹${product.price}</h3>
      `;
      // Save current product to localStorage for cart
      localStorage.setItem('selectedProduct', JSON.stringify(product));
    });
}

function addToCart() {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ ...product, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

// ---------- Show Cart Items ----------
if (window.location.pathname.includes('cart.html')) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDiv = document.getElementById('cart-items');
  let total = 0;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${item.title} - ₹${item.price} x ${item.quantity}</h4>
    `;
    cartDiv.appendChild(div);
  });

  document.getElementById('total').textContent = total;
}
