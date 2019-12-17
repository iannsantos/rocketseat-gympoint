import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      {/* <img src="" alt="" /> */}
      <strong>GYMPOINT</strong>
      <Form onSubmit={handleSubmit}>
        <span>YOUR E-MAIL</span>
        <Input name="email" placeholder="example@email.com" />
        <span>YOUR PASSWORD</span>
        <Input name="password" placeholder="***********" />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
