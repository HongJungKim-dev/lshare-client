/* eslint-disable react/require-default-props */
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Search from '@components/Search';
import SearchTag from '@components/SearchTag';
import * as S from './style';

type SearchAreaProps = {
  className?: string;
  id: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchArea = ({
  className,
  id,
  value,
  handleChangeValue,
}: SearchAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isClickAway, setIsClickAway] = useState(false);
  const target = useRef<HTMLDivElement>(null);

  const handleFocusDefault = () => {
    setIsFocused(true);
  };

  const handleBlurDefault = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      setIsClickAway(!target.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    const blurWhenClickAway = () => {
      if (!isClickAway) {
        return;
      }

      handleBlurDefault();
    };

    blurWhenClickAway();
  }, [isClickAway]);

  return (
    <S.Container className={className} ref={target}>
      <Search
        id={id}
        size="large"
        handleFocusDefault={handleFocusDefault}
        value={value}
        handleChangeValue={handleChangeValue}
      />
      {isFocused ? (
        <SearchTag id={id} mode="tag" />
      ) : (
        <S.CustomSearchTag
          id={id}
          mode="default"
          handleFocusDefault={handleFocusDefault}
        />
      )}
    </S.Container>
  );
};

export default SearchArea;
