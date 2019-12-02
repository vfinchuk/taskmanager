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


const mainElement = document.querySelector(`.main`);
const siteHeaderElement = mainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);


const filters = generateFilters();
render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

render(taskListElement, new TaskEditComponent(tasks[0]).getElement(), RenderPosition.BEFOREEND);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));




const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }

});
