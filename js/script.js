document.addEventListener("DOMContentLoaded", () => {
  // Load JSON data and initialize
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const sheetNames = Object.keys(data); // Get sheet names
      generateMenu(sheetNames); // Create dynamic menu
      loadPage(sheetNames[0], data); // Load the first sheet by default
    })
    .catch(error => console.error("Error loading data:", error));
});

// Generate dynamic menu
function generateMenu(sheetNames) {
  const menu = document.getElementById("menu-items");
  sheetNames.forEach((sheet, index) => {
    const li = document.createElement("li");
    li.textContent = sheet.charAt(0).toUpperCase() + sheet.slice(1); // Capitalize
    li.onclick = () => loadPage(sheet, window.data);
    if (index === 0) li.classList.add("active");
    menu.appendChild(li);
  });
}

// Load products for a specific sheet
function loadPage(sheetName, data) {
  // Store data globally for menu navigation
  window.data = data;

  // Highlight active menu item
  document.querySelectorAll("#menu-items li").forEach(item => item.classList.remove("active"));
  document.querySelector(`#menu-items li:nth-child(${Object.keys(data).indexOf(sheetName) + 1})`).classList.add("active");

  // Get product data for the selected sheet
  const products = data[sheetName];
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear current products

  // Create product boxes
  products.forEach(product => {
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBox.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
      <a href="${product.link}" target="_blank">Buy Now</a>
    `;
    productContainer.appendChild(productBox);
  });
}
