import React from 'react';
import * as S from './style';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <S.CustomHeader />
    <S.Main>{children}</S.Main>
    <S.Footer />
  </>
);

export default Layout;
