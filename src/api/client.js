const BASE_URL = 'https://dummyjson.com';

export const apiClient = {
  getProducts: async (limit = 20, skip = 0) => {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return res.json();
  },
  
  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    return res.json();
  },

  getProductsByCategory: async (category) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    return res.json();
  },

  searchProducts: async (query) => {
    const res = await fetch(`${BASE_URL}/products/search?q=${query}`);
    return res.json();
  },

  // Admin Mock Functions (using local persistence to simulate real state)
  deleteProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    return res.json();
  },

  addProduct: async (productData) => {
    const res = await fetch(`${BASE_URL}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return res.json();
  }
};
