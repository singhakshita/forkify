import * as modal from '../js/modal';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './view/recipeView';
import SearchView from './view/searchView';
import ResultView from './view/resultView';
import Pagination from './view/pagination';
import AddRecipeView from './view/addRecipeView';

//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    recipeView.renderSpinner();
    await modal.loadRecipe(id);
    const { recipe } = modal.state;
    console.log(recipe);
    recipeView.render(modal.state.recipe);
  } catch (err) {
    recipeView.errorRenderer(err);
  }
};

const controlSearch = async function () {
  try {
    const query = SearchView.getQuery();

    SearchView.clearInput();
    await modal.loadSearchResults(query);
    const { search } = modal.state;

    ResultView.render(modal.resultPerPage());
    Pagination.render(modal.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (pageTogo) {
  ResultView.render(modal.resultPerPage(pageTogo));
  Pagination.render(modal.state.search);
};
const controlServings = function (newServings) {
  modal.updateServings(newServings);
  recipeView.render(modal.state.recipe);
};
const controlFormData = async function (formData) {
  try {
    //modal.addRecipe(formData);
    const data = await modal.addRecipe(formData);
    console.log(data, 'from controller');

    //recipeView.errorRenderer('Hey congrats we uploaded your recipe');
    setTimeout(function () {
      AddRecipeView.showWindow();
    }, 25000);
    recipeView.render(data);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addRecipeHandler(controlRecipe);
  SearchView.addSearchHandler(controlSearch);
  Pagination.addHandlerClick(controlPagination);
  recipeView.servingsClickHandler(controlServings);
  AddRecipeView.getFormdataHandler(controlFormData);
};
init();
