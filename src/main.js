import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import TaskComponent from './components/task';
import TaskEditComponent from './components/task-edit';
import LoadMoreButtonComponent from './components/load-more-button';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

import {render, RenderPosition} from './utils.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const onEscapeKeyDown = (evt) => {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscapeKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscapeKeyDown);
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceEditToTask);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector(`.main`);
const siteHeaderElement = mainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);


const filters = generateFilters();
render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);


let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => renderTask(task));


const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(task));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }

});
