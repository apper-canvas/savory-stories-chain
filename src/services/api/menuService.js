import menuData from '../mockData/menuItems.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const menuService = {
  async getAll() {
    await delay(300);
    return [...menuData];
  },

async getById(id) {
    console.log('🔍 menuService.getById: Starting lookup for id:', id);
    const startTime = performance.now();
    
    await delay(200);
    
    console.log('🔍 menuService.getById: Searching in menu data...', {
      searchId: id,
      searchType: typeof id,
      totalItems: menuData.length,
      availableIds: menuData.map(item => ({ id: item.id, type: typeof item.id, name: item.name }))
    });
    
    const item = menuData.find(item => {
      const match = item.id === id;
      console.log('🔍 menuService.getById: Comparing:', {
        itemId: item.id,
        itemIdType: typeof item.id,
        searchId: id,
        searchIdType: typeof id,
        matches: match
      });
      return match;
    });
    
    const endTime = performance.now();
    console.log('🔍 menuService.getById: Search completed', {
      duration: `${(endTime - startTime).toFixed(2)}ms`,
      found: !!item,
      result: item ? { id: item.id, name: item.name, category: item.category } : null
    });
    
    if (!item) {
      console.error('❌ menuService.getById: Menu item not found!', {
        searchedId: id,
        searchedType: typeof id,
        availableIds: menuData.map(item => ({ id: item.id, type: typeof item.id }))
      });
      throw new Error(`Menu item not found for id: ${id}`);
    }
    
    console.log('✅ menuService.getById: Item found and returning copy');
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