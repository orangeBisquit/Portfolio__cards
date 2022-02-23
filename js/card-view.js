

const createCard = (project) => {
  const { className, imgSource, projectSource, name, description, alt, aria} = project;

  return `<li class="portfolio__item card card--${className} card">
            <img src="${imgSource}"  class="card__img" width='300' height="300" alt="${alt}">
            <a href="${projectSource}" class="card__overlay" target="_blank" aria-label="${aria}">
              <h2 class="card__title">${name}</h2>
              <p class="card__descr">${description}</p>
            </a>
          </li>`;
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export default class Card {
  constructor(project) {
    this._project = project;
    this._element = null;

    this._handleMove = this._handleMove.bind(this);
    this._handleMouseOut = this._handleMouseOut.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
  }

  setMoveHandlers() {
    this._element.addEventListener('mousemove', this._handleMove);
    this._element.addEventListener('mouseout', this._handleMouseOut);
    this._element.addEventListener('mousedown', this._handleMouseDown);
    this._element.addEventListener('mouseup', this._handleMouseUp);
  }

  removeMoveHandlers() {
    this._element.removeEventListener('mousemove', this._handleMove);
    this._element.removeEventListener('mouseout', this._handleMouseOut);
    this._element.removeEventListener('mousedown', this._handleMouseDown);
    this._element.removeEventListener('mouseup', this._handleMouseUp);
  }

  getTemplate() {
    return createCard(this._project);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  _handleMove(evt) {
    const height = this._element.clientHeight;
    const width = this._element.clientWidth;

    const xVal = evt.layerX;
    const yVal = evt.layerY;

    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);

    const string = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    this._element.style.transform = string;
  }

  _handleMouseOut() {
    this._element.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
  }

  _handleMouseDown() {
    this._element.style.transform = 'perspective(500px) scale(0.95) rotateX(0) rotateY(0)';
  }

  _handleMouseUp() {
    this._element.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
  }

  removeElement() {
    this._element = null;
  }
}
