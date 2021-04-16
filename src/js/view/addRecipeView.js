import View from './view';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  constructor() {
    super();
    this.addClickHandler();
  }
  showWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  addClickHandler() {
    document
      .querySelector('.nav__btn--add-recipe')
      .addEventListener('click', this.showWindow.bind(this));
    document
      .querySelector('.btn--close-modal')
      .addEventListener('click', this.showWindow.bind(this));
    this._overlay.addEventListener('click', this.showWindow.bind(this));
  }
  getFormdataHandler(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
