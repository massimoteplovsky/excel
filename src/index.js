import './scss/index.scss';
import { Excel } from './components/Excel';
import { Header } from './components/Header';
import { Formula } from './components/Formula';
import { Toolbar } from './components/Toolbar';
import { Table } from './components/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './store/rootReducer';
import { storage, debounce } from './core/utils';

const initialState = {
  data: {},
  text: '',
  column: {},
  row: {},
  currentStyles: {
    fontWeight: 'normal',
    textAlign: 'left',
    textDecoration: 'none',
    fontStyle: 'normal',
  },
  cellStyle: {},
  title: 'Новая таблица',
};

const store = createStore(rootReducer, storage('state') || initialState);
const stateListener = debounce((state) => {
  console.log('App State', state);
  storage('state', state);
}, 300);
store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Formula, Toolbar, Table],
  store,
});

excel.render();
