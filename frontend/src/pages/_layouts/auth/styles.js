import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  padding: 26px;
  display: flex;
  flex-direction: column;

  img {
    align-self: center;
  }

  strong {
    display: block;
    color: #ee4d64;
    font-size: 29px;
    margin: 12px 0 12px;
    align-self: center;
  }

  span {
    display: block;
    font-weight: bold;
    font-size: 14px;
    color: #444;
    margin: 18px 0 5px;
  }

  input {
    border: 2px solid #eee;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 16px;
    display: block;
    width: 100%;

    &::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
  }

  button {
    width: 100%;
    font-size: 16px;
    background: #ee4d64;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    padding: 12px 0;
    margin: 18px 0;
    transition: background 0.2s;
  }

  button:hover {
    background: ${darken(0.03, '#ee4d64')};
  }
`;
