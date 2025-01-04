const MAX_PRODUCTS_PER_PAGE = 21;

document.addEventListener("DOMContentLoaded", () => {
  // Load JSON data and initialize
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const sheetNames = Object.keys(data); // Get sheet names
      generateMenu(sheetNames); // Create dynamic menu
      loadPage(sheetNames[0], data, 1); // Load the first sheet and page 1 by default
    })
    .catch(error => console.error("Error loading data:", error));
});

// Generate dynamic menu
function generateMenu(sheetNames) {
  const menu = document.getElementById("menu-items");
  sheetNames.forEach((sheet, index) => {
    const li = document.createElement("li");
    li.textContent = sheet.charAt(0).toUpperCase() + sheet.slice(1); // Capitalize
    li.onclick = () => loadPage(sheet, window.data, 1); // Load the first page of this sheet
    if (index === 0) li.classList.add("active");
    menu.appendChild(li);
  });
}

// Load products for a specific sheet and page
function loadPage(sheetName, data, currentPage) {
  // Store data globally for menu navigation
  window.data = data;

  // Highlight active menu item
  document.querySelectorAll("#menu-items li").forEach(item => item.classList.remove("active"));
  document.querySelector(`#menu-items li:nth-child(${Object.keys(data).indexOf(sheetName) + 1})`).classList.add("active");

  // Get product data for the selected sheet
  const products = data[sheetName];
  const productContainer = document.getElementById("product-container");
  const paginationContainer = document.getElementById("pagination-container");

  productContainer.innerHTML = ""; // Clear current products
  paginationContainer.innerHTML = ""; // Clear current pagination

  // Determine start and end index for products on this page
  const startIndex = (currentPage - 1) * MAX_PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + MAX_PRODUCTS_PER_PAGE, products.length);

  // Create product boxes for the current page
  products.slice(startIndex, endIndex).forEach(product => {
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

  // Create pagination
  const totalPages = Math.ceil(products.length / MAX_PRODUCTS_PER_PAGE);
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("span");
    pageButton.className = "page-number";
    pageButton.textContent = i;
    if (i === currentPage) pageButton.classList.add("active");
    pageButton.onclick = () => loadPage(sheetName, data, i);
    paginationContainer.appendChild(pageButton);
  }
}
function toggleMenu() {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("open");
}
