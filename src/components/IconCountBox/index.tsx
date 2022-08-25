/* eslint-disable react/require-default-props */
import React from 'react';
import * as S from './style';

type IconCountBoxProps = {
  className?: string;
  children?: React.ReactNode;
  count: number | string;
};

const IconCountBox = ({ className, children, count }: IconCountBoxProps) => (
  <S.Container className={className}>
    {children}
    <S.Number>{count}</S.Number>
  </S.Container>
);
export default IconCountBox;
