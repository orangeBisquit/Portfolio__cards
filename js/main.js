import './card-view.js';
import './sort.js';
import PortfolioPresenter from './card-presenter.js';
import { PROJECTS } from './card-data.js';

const cardsContainer = document.querySelector('.portfolio__list');


const Portfolio = new PortfolioPresenter(cardsContainer, PROJECTS);
Portfolio.init();


window.addEventListener('load', checkAnimations(Portfolio));

// enableAnimations(Portfolio);
