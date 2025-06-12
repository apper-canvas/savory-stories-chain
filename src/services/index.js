import menuService from './api/menuService';
import reservationService from './api/reservationService';
import reviewService from './api/reviewService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export {
  menuService,
  reservationService,
  reviewService,
  delay
};