import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, LinkNav } from './styles';
import logo from '~/assets/logo.svg';

export default function Header() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link to="/home">GYMPOINT</Link>
          <div>
            <LinkNav activeClassName="active" to="/students">
              ALUNOS
            </LinkNav>
            <LinkNav activeClassName="active" to="/plans">
              PLANOS
            </LinkNav>
            <LinkNav activeClassName="active" to="/registrations">
              MATRÍCULAS
            </LinkNav>
            <LinkNav activeClassName="active" to="/help-orders">
              PEDIDOS DE AUXÍLIO
            </LinkNav>
          </div>
        </nav>
        <aside>
          <Profile>
            <strong>{user.name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
