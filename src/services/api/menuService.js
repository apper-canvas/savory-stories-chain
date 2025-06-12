import menuData from '../mockData/menuItems.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const menuService = {
  async getAll() {
    await delay(300);
    return [...menuData];
  },

  async getById(id) {
    await delay(200);
    const item = menuData.find(item => item.id === id);
    if (!item) {
      throw new Error('Menu item not found');
    }
    return { ...item };
  },

  async getByCategory(category) {
    await delay(250);
    return menuData.filter(item => item.category === category);
  },

  async create(item) {
    await delay(400);
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    menuData.push(newItem);
    return { ...newItem };
  },

  async update(id, data) {
    await delay(350);
    const index = menuData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Menu item not found');
    }
    menuData[index] = { ...menuData[index], ...data };
    return { ...menuData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = menuData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Menu item not found');
    }
    menuData.splice(index, 1);
    return { success: true };
  }
};

export default menuService;