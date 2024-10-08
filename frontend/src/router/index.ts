import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

import HomeView from '../components/HomeView.vue';
import SearchView from '../components/SearchView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
