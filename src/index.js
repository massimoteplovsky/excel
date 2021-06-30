import './scss/index.scss';
import { Excel } from './components/Excel';
import { Header } from './components/Header';
import { Formula } from './components/Formula';
import { Toolbar } from './components/Toolbar';
import { Table } from './components/Table';

const excel = new Excel('#app', {
  components: [Header, Formula, Toolbar, Table],
});

excel.render();
