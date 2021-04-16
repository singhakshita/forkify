import View from './view';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(this._generateEachResult).join('');
  }
  _generateEachResult(item) {
    return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${item.id}">
          <figure class="preview__fig">
            <img src="${item.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${item.title} ...</h4>
            <p class="preview__publisher">${item.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultView();
