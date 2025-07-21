// File: frontend/js/orders.js

async function fetchOrders() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to view your orders");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/orders/my", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const orders = await res.json();
    const ordersDiv = document.getElementById("orders");

    if (orders.length === 0) {
      ordersDiv.innerHTML = "<p>No orders found.</p>";
      return;
    }

    ordersDiv.innerHTML = ""; // clear loading text

    orders.forEach(order => {
      const div = document.createElement("div");
      div.classList.add("order-box");

      div.innerHTML = `
        <h3>🧾 Order ID: ${order._id}</h3>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>
        <h4>Items:</h4>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} x${item.quantity} – ₹${item.price}</li>
          `).join('')}
        </ul>
      `;

      ordersDiv.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    document.getElementById("orders").innerHTML = "<p>Error loading orders.</p>";
  }
}

window.onload = fetchOrders;
