import { Excel } from '../components/Excel';
import { Header } from '../components/Header';
import { Formula } from '../components/Formula';
import { Toolbar } from '../components/Toolbar';
import { Table } from '../components/Table';
import { createStore } from '../core/createStore';
import { rootReducer } from '../store/rootReducer';
import { storage, debounce } from '../core/utils';
import { Page } from '../core/Page';

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
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
      date: null,
    };

    const store = createStore(
      rootReducer,
      storage(`excel:${params}`) || initialState
    );
    const stateListener = (state) => {
      console.log('App State', state);
    };
    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Formula, Toolbar, Table],
      store,
      params,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
