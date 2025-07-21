const apiBase = 'http://localhost:5000/api';

async function placeOrder() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!token || !userId) {
    alert('Please login first');
    return;
  }

  const order = {
    userId,
    items: cart.map(p => ({ productId: p._id, quantity: p.quantity })),
    totalAmount: cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
  };

  const res = await fetch(`${apiBase}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(order)
  });

  const data = await res.json();
  if (res.status === 201) {
    alert('Order Placed!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  } else {
    alert(data.error || 'Order failed');
  }
}
