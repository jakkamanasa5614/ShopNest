function placeOrder() {
  const token = localStorage.getItem("token");
  const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  fetch('http://localhost:5000/api/orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      items: cart,
      total,
      paymentMethod: selectedPayment
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.order) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "order-confirmation.html";
      } else {
        alert(data.message || "Order failed.");
      }
    })
    .catch(err => {
      alert("Server error while placing order");
    });
}
