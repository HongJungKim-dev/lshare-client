import styled from 'styled-components';
import Header from '@components/Header';

export const Main = styled.main``;

export const Footer = styled.footer``;

export const CustomHeader = styled(Header)`
  position: sticky;
  padding: 16px 0 0 0;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 3px 5px ${({ theme }) => theme.colors.line};
`;
