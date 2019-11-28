import {createMainMenuTemplate} from './components/main-menu';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';


const TASK_COUNT = 3;

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
render(mainElement, createFilterTemplate(), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);


const taskListElement = mainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(), `beforeend`);

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => render(taskListElement, createTaskTemplate(), `beforeend`)
  );

const boardElement = mainElement.querySelector(`.board`);

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
