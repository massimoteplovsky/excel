import './scss/index.scss';
import { Router } from './core/router/Router';
import { DashboardPage } from './pages/Dashboard';
import { ExcelPage } from './pages/Excel';

const router = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
  notFound: DashboardPage,
});
