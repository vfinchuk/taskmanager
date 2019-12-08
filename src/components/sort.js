import AbstractComponent from './abstract-component';

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DAFAULT: `default`
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type="${SortType.DAFAULT}" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};


export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DAFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

}
