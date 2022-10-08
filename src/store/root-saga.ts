import { all, call } from 'typed-redux-saga/macro';
import { categoriesSaga } from './categories/category.saga';
import { userSaga } from './user/user.saga';

// Export a generator function
export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga)]);
}
