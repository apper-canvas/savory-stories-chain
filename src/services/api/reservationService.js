import reservationData from '../mockData/reservations.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const reservationService = {
  async getAll() {
    await delay(300);
    return [...reservationData];
  },

  async getById(id) {
    await delay(200);
    const reservation = reservationData.find(res => res.id === id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return { ...reservation };
  },

  async create(reservation) {
    await delay(500);
    const newReservation = {
      ...reservation,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    reservationData.push(newReservation);
    return { ...newReservation };
  },

  async update(id, data) {
    await delay(400);
    const index = reservationData.findIndex(res => res.id === id);
    if (index === -1) {
      throw new Error('Reservation not found');
    }
    reservationData[index] = { ...reservationData[index], ...data };
    return { ...reservationData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = reservationData.findIndex(res => res.id === id);
    if (index === -1) {
      throw new Error('Reservation not found');
    }
    reservationData.splice(index, 1);
    return { success: true };
  },

  async getAvailableTimeSlots(date) {
    await delay(200);
    // Mock available time slots for a given date
    return [
      '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
      '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
    ];
  }
};

export default reservationService;