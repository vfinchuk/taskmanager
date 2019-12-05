import SortComponent from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import NoTasksComponent from '../components/no-tasks.js';
import TaskComponent from '../components/task';
import TaskEditComponent from '../components/task-edit';
import LoadMoreButtonComponent from '../components/load-more-button';

import {remove, render, RenderPosition, replace} from '../utils/render';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscapeKeyDown = (evt) => {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscapeKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscapeKeyDown);
  });

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

  }

  render(tasks) {
    const container = this._container;
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
      return;
    }

    render(container.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
    render(container.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);

    const taskListElement = container.getElement().querySelector(`.board__tasks`);


    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount).forEach((task) => renderTask(taskListElement, task));


    const loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(container.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

}
