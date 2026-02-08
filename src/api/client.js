const BASE_URL = 'https://dummyjson.com';
const USD_TO_INR = 91; // conversion rate

export const apiClient = {
  getProducts: async (limit = 20, skip = 0) => {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    const data = await res.json();
    data.products = data.products
      .filter(p => p.title !== "Beef Steak")
      .map(p => ({
        ...p,
        priceINR: (p.price * USD_TO_INR).toFixed(2)
      }));
    return data;
  },

  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    return { ...data, priceINR: (data.price * USD_TO_INR).toFixed(2) };
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    return res.json();
  },

  getProductsByCategory: async (category) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await res.json();
    data.products = data.products
      .filter(p => p.title !== "Beef Steak")
      .map(p => ({
        ...p,
        priceINR: (p.price * USD_TO_INR).toFixed(2)
      }));
    return data;
  },

  searchProducts: async (query) => {
    const res = await fetch(`${BASE_URL}/products/search?q=${query}`);
    const data = await res.json();
    data.products = data.products.map(p => ({
      ...p,
      priceINR: (p.price * USD_TO_INR).toFixed(2)
    }));
    return data;
  },

  // Admin Mock Functions
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
    const data = await res.json();
    // Add INR conversion for newly added product
    return { ...data, priceINR: (data.price * USD_TO_INR).toFixed(2) };
  }
};