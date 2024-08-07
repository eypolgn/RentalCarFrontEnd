import { createRouter, createWebHistory } from 'vue-router';
import CarsPage from './views/CarsPage.vue';
import UsersPage from './views/UsersPage.vue';
import ReservationsPage from './views/ReservationsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Cars',
    component: CarsPage
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersPage
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: ReservationsPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
