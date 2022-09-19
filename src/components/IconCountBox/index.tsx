/* eslint-disable react/require-default-props */
import React from 'react';
import * as S from './style';

type IconCountBoxProps = {
  className?: string;
  children?: React.ReactNode;
  count: number | string;
  handleClick?: () => void;
};

const IconCountBox = ({ className, children, count, handleClick }: IconCountBoxProps) => (
  <S.Container className={className} onClick={handleClick}>
    <span>{children}</span>
    <span>
      <S.Number>{count}</S.Number>
    </span>
  </S.Container>
);
export default IconCountBox;
