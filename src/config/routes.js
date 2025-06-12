import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Reservations from '../pages/Reservations';
import About from '../pages/About';
import Reviews from '../pages/Reviews';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  menu: {
    id: 'menu',
    label: 'Menu',
    path: '/menu',
    icon: 'Book',
    component: Menu
  },
  reservations: {
    id: 'reservations',
    label: 'Reservations',
    path: '/reservations',
    icon: 'Calendar',
    component: Reservations
  },
  about: {
    id: 'about',
    label: 'About',
    path: '/about',
    icon: 'Info',
    component: About
  },
  reviews: {
    id: 'reviews',
    label: 'Reviews',
    path: '/reviews',
    icon: 'Star',
    component: Reviews
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    icon: 'MapPin',
    component: Contact
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '/404',
    component: NotFound
  }
};

export const routeArray = Object.values(routes);