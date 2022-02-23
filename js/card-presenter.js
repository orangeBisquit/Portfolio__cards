import CardView from './card-view.js';
import { render, remove, sortProjectsNew, sortProjectsOld, getFilterValues, filterProjects } from './sort.js';

export default class Portfolio {
  constructor(container, projects) {
    this._container = container;
    this._sourceProjects = projects;
    this._projects = sortProjectsNew(this._sourceProjects.slice());

    this._sortMode = 'sort-new';

    this._projectComponents = [];

    this._sortHandler = this._sortHandler.bind(this);
    this._filterHandler = this._filterHandler.bind(this);
  }

  init() {
    this._renderProjects(this._projects);
    this._setSortHandler();
    this._setFilterHandler();
  }

  _sortHandler(evt) {

    evt.preventDefault();

    if (evt.target.control.id === this._sortMode) {
      return;
    }

    evt.target.control.checked = true;

    switch (evt.target.control.id) {
      case 'sort-new':
        sortProjectsNew(this._projects);
        this._sortMode = 'sort-new';
        break;
      case 'sort-old':
        sortProjectsOld(this._projects);
        this._sortMode = 'sort-old';
    }
    this._resetCards();
    this._renderProjects(this._projects);
  }

  _setSortHandler() {
    document.querySelector('.sort').addEventListener('click', this._sortHandler);
  }

  _filterHandler(evt) {
    evt.preventDefault();

    this._projects = this._sourceProjects.slice();

    if (evt.target.tagName === 'LABEL') {
      evt.target.control.checked = !evt.target.control.checked;

      const checkedInputs = getFilterValues();

      this._projects = filterProjects(checkedInputs, this._projects);
      console.log(this._projects);
    }

    this._resetCards();
    this._renderProjects(this._projects);
  }

  _setFilterHandler() {
    document.querySelector('.filter').addEventListener('click', this._filterHandler);
  }

  _renderCard(project) {
    this._cardComponent = new CardView(project);
    render(this._container, this._cardComponent, 'afterbegin');
    this._cardComponent.setMoveHandlers();
    this._projectComponents.push(this._cardComponent);
  }

  _renderProjects(projects) {
    projects.forEach((project) => this._renderCard(project));
  }

  _resetCards() {
    this._projectComponents.forEach((project) => {
      remove(project);
      project.removeElement();
    });
  }

  disableAnimations() {
    this._projectComponents.forEach((component) => {
      component.removeMoveHandlers();
    });
  }

  enableAnimations() {
    this._projectComponents.forEach((component) => {
      component.setMoveHandlers();
    });
  }
}

