document.addEventListener("DOMContentLoaded", () => {
  const PRODUCTS_PER_PAGE = 21; // Maximum products per page
  let currentPage = 1; // Start with the first page

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);
      displayProducts(data, currentPage, PRODUCTS_PER_PAGE);
      createPagination(totalPages, data);
    })
    .catch(error => console.error('Error loading products:', error));

  // Function to display products for the current page
  function displayProducts(data, page, limit) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear previous products

    const start = (page - 1) * limit;
    const end = start + limit;
    const productsToShow = data.slice(start, end);

    productsToShow.forEach(product => {
      const productBox = document.createElement('div');
      productBox.className = 'product-box';
      productBox.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">${product.price}</p>
        <a href="${product.link}" class="buy-now">Buy Now</a>
      `;
      container.appendChild(productBox);
    });
  }

  // Function to create pagination buttons
  function createPagination(totalPages, data) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = 'pagination-button';
      pageButton.addEventListener('click', () => {
        currentPage = i;
        displayProducts(data, currentPage, PRODUCTS_PER_PAGE);
        updateActiveButton(i);
      });
      paginationContainer.appendChild(pageButton);
    }

    // Highlight the first page button initially
    updateActiveButton(currentPage);
  }

  // Function to highlight the active page button
  function updateActiveButton(activePage) {
    const buttons = document.querySelectorAll('.pagination-button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    buttons[activePage - 1].classList.add('active');
  }
});
