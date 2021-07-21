import { dom } from '../core/dom';
import { Page } from '../core/Page';
import { storage } from '../core/utils';

const renderTablesList = (tables) => {
  return tables
    .map(({ title, id, date }) => {
      return `
        <li class="db__record">
            <a href="#excel/${id.split(':')[1]}">${title}</a>
            <strong>${new Date(date).toLocaleDateString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</strong>
        </li>
        `;
    })
    .join(' ');
};

const getAllTables = () => {
  const tables = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      const item = storage(key);
      tables.push({ title: item.title, id: key, date: item.date });
    }
  }

  return tables;
};

const createRecordsTable = () => {
  const tables = getAllTables();

  if (!tables.length) {
    return '<p>Вы не создали ни одной таблицы</p>';
  }

  return `
      <div class="db__list-header">
          <span>Название</span>
          <span>Дата открытия/редактирования</span>
      </div>

      <ul class="db__list">
        ${renderTablesList(tables)}
      </ul>
      `;
};

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return dom.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel Dashboard</h1>
      </div>

        <div class="db__new">
        <div class="db__view">
            <a href="#excel/${now}" class="db__create">
            Новая <br /> Таблица
            </a>
        </div>
        </div>

        <div class="db__table db__view">
            ${createRecordsTable()}
        </div>
      `);
  }
}
