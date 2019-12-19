import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 20px;
  border: 1px solid #fff;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 48px;
      height: 24px;
      margin-right: 10px;
    }

    > a {
      color: #ee4d64;
      font-weight: bold;
      font-size: 15px;
      border-right: 1px solid #ddd;
      margin-right: 20px;
      padding-right: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    color: #666;
  }

  button {
    border: 0;
    background: none;
    color: #ee4d64;
    margin-top: 4px;
  }
`;

export const LinkNav = styled(NavLink)`
  color: #999;
  margin: 0 10px;
  font-weight: bold;
  transition: border 0.2s;

  &:hover {
    border-bottom: 3px solid #ee4d64;
  }

  &.${props => props.activeClassName} {
    color: #444;
  }
`;
