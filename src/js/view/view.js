import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data) {
    ``;
    this._data = data;
    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = ` <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  errorRenderer(message) {
    const html = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>No recipes found for your query. Please try again!</p>
    <p>${message}</p>
  </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
