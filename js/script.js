document.addEventListener("DOMContentLoaded", () => {
  const PRODUCTS_PER_PAGE = 9;
  let currentPage = 1;
  let currentCategory = "Main";

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      createMenu(Object.keys(data));
      displayProducts(data[currentCategory], currentPage, PRODUCTS_PER_PAGE);
      createPagination(data[currentCategory].length, PRODUCTS_PER_PAGE, data[currentCategory]);
    })
    .catch(error => console.error('Error loading products:', error));

  function createMenu(categories) {
    const menu = document.getElementById('menu');
    menu.innerHTML = '';

    categories.forEach(category => {
      const menuItem = document.createElement('li');
      menuItem.textContent = category;
      menuItem.className = category === currentCategory ? 'active' : '';
      menuItem.addEventListener('click', () => {
        currentCategory = category;
        currentPage = 1;
        fetch('products.json')
          .then(response => response.json())
          .then(data => {
            displayProducts(data[currentCategory], currentPage, PRODUCTS_PER_PAGE);
            createPagination(data[currentCategory].length, PRODUCTS_PER_PAGE, data[currentCategory]);
            updateActiveMenu(category);
          });
      });
      menu.appendChild(menuItem);
    });
  }

  function updateActiveMenu(activeCategory) {
    const menuItems = document.querySelectorAll('#menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    menuItems.forEach(item => {
      if (item.textContent === activeCategory) {
        item.classList.add('active');
      }
    });
  }

  function displayProducts(products, page, limit) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    const start = (page - 1) * limit;
    const end = start + limit;
    const productsToShow = products.slice(start, end);

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

  function createPagination(totalItems, limit, products) {
    const totalPages = Math.ceil(totalItems / limit);
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = i === currentPage ? 'active' : '';
      pageButton.addEventListener('click', () => {
        currentPage = i;
        displayProducts(products, currentPage, limit);
      });
      paginationContainer.appendChild(pageButton);
    }
  }
});
