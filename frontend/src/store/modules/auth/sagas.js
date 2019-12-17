import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';
import { signInSucess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, '/sessions', {
    email,
    password
  });

  const { user, token } = response.data;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSucess(user, token));
    history.push('/');
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
