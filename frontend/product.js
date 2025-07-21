document.getElementById('productForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;

  const res = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, price, image })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Product added successfully!");
  } else {
    alert(data.message || "Failed to add product.");
  }
});
