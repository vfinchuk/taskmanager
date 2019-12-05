import AbstractComponent from './abstract-component';

export const createLoadMoreButtonTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class LoadMoreButton extends AbstractComponent {

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
