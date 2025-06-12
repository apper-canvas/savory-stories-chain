import orderData from '../mockData/orders.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let orders = [...orderData];

const orderService = {
  async getAll() {
    await delay(300);
    return [...orders];
  },

  async getById(id) {
    await delay(200);
    const order = orders.find(order => order.id === id);
    if (!order) {
      throw new Error(`Order not found for id: ${id}`);
    }
    return { ...order };
  },

  async create(orderData) {
    await delay(500);
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      ...orderData,
    };
    
    orders.push(newOrder);
    return { ...newOrder };
  },

  async update(id, data) {
    await delay(350);
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    orders[index] = { ...orders[index], ...data };
    return { ...orders[index] };
  },

  async delete(id) {
    await delay(300);
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    orders.splice(index, 1);
    return { success: true };
  }
};

export default orderService;