import { async } from 'regenerator-runtime';
import { API_URL, API_KEY } from '../js/config';
import { getJSON, postJSON } from '../js/helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    searchResults: [],
    searchResultPerPage: [],
    page: 1,
    lastPage: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    console.log(id);
    const data = id
      ? await getJSON(`${API_URL}${id}`)
      : await getJSON(`${API_URL}5ed6604591c37cdc054bc886`);
    state.recipe = data.data.recipe;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.searchResults = data.data.recipes;
  } catch (err) {
    throw err;
  }
};

export const resultPerPage = function (page = state.search.page) {
  const items = state.search.searchResults.length;
  state.search.lastPage = items % 10 == 0 ? items : items + 1;
  let start = (page - 1) * 10;
  let end = (page - 1) * 10 + 10;
  state.search.page = page;
  return state.search.searchResults.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addRecipe = async function (recipe) {
  try {
    const recipeArr = Object.entries(recipe);

    const newArr = recipeArr
      .filter(item => item[0].startsWith('ingredient') && item[1] !== '')
      .map(elem => {
        const ingArr = elem[1].split(',');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const uploadRecipeData = {
      publisher: recipe.publisher,
      cooking_time: recipe.cookingTime,
      servings: recipe.servings,
      ingredients: newArr,
      title: recipe.title,
      image_url: recipe.image,
      source_url: recipe.sourceUrl,
    };
    console.log(uploadRecipeData);
    const response = await postJSON(
      `${API_URL}?key=${API_KEY}`,
      uploadRecipeData
    );
    console.log(response.data.recipe);
    return response.data.recipe;
  } catch (err) {
    console.log(err);
  }
};

//akshita-forkify-handler.netlify.app
