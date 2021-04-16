import View from '../view/view';
class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }
  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
