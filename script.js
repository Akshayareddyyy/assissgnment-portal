// Replace the URL below with your actual deployed backend URL
const API_URL = "https://your-backend-url.onrender.com/api/intern";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById('name').textContent = data.name;
    document.getElementById('code').textContent = data.referralCode;
    document.getElementById('donations').textContent = data.donations;
  })
  .catch(err => {
    console.error("Error fetching data", err);
  });
