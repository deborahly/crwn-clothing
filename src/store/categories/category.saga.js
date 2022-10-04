import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import CATEGORIES_ACTION_TYPES from './category.types';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.actions';

// Whenever we take the latest FETCH_CATEGORIES_START, we have to initialize fetchCategoriesAsync saga, which will attempt to fetch the categories array, and if successful, we have to put (similar to dispatch) the fetchCategoriesSuccess action, which will go back into the Redux flow and will update the reducers or sagas that might be listening to this action
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // takeLatest() accepts two arguments: the action type which it responds to, and the code to be executed as a response
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // all() will execute everything inside the parenthesis
  yield all([call(onFetchCategories)]);
}
