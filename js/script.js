document.addEventListener("DOMContentLoaded", () => {
  // Load the JSON file
  fetch('products.json') // Get the file
    .then(response => response.json()) // Convert it to usable data
    .then(data => {
      const container = document.getElementById('product-container'); // Find the placeholder
      data.forEach(product => {
        // Create a box for each product
        const productBox = document.createElement('div');
        productBox.className = 'product-box';
        productBox.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">${product.price}</p>
          <a href="${product.link}" class="buy-now">Buy Now</a>
        `;
        container.appendChild(productBox); // Add it to the page
      });
    })
    .catch(error => console.error('Error loading products:', error));
});
