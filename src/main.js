import {createMainMenuTemplate} from './components/main-menu';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 3;
const SHOWING_TASKS_COUNT_BY_BUTTON = 1;


/**
 * Rendering template
 * @param {node} container - where to render template
 * @param {string} template - rendering template
 * @param {string} place - rendering position
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const mainElement = document.querySelector(`.main`);
const siteHeaderElement = mainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMainMenuTemplate(), `beforeend`);


const filters = generateFilters();
render(mainElement, createFilterTemplate(filters), `beforeend`);


render(mainElement, createBoardTemplate(), `beforeend`);

const taskListElement = mainElement.querySelector(`.board__tasks`);

const tasks = generateTasks(TASK_COUNT);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));


const boardElement = mainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }

});
