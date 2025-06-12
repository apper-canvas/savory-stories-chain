import HomePage from '@/components/pages/HomePage';
import MenuPage from '@/components/pages/MenuPage';
import ReservationsPage from '@/components/pages/ReservationsPage';
import AboutPage from '@/components/pages/AboutPage';
import ReviewsPage from '@/components/pages/ReviewsPage';
import ContactPage from '@/components/pages/ContactPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
component: HomePage
  },
  menu: {
    id: 'menu',
    label: 'Menu',
    path: '/menu',
    icon: 'Book',
component: MenuPage
  },
  reservations: {
    id: 'reservations',
    label: 'Reservations',
    path: '/reservations',
    icon: 'Calendar',
component: ReservationsPage
  },
  about: {
    id: 'about',
    label: 'About',
    path: '/about',
    icon: 'Info',
component: AboutPage
  },
  reviews: {
    id: 'reviews',
    label: 'Reviews',
    path: '/reviews',
    icon: 'Star',
component: ReviewsPage
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    icon: 'MapPin',
component: ContactPage
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '/404',
component: NotFoundPage
  }
};

export const routeArray = Object.values(routes);