/* eslint-disable react/require-default-props */
import { useEffect, useRef, useState, ReactNode } from 'react';
import useMouse from '@hooks/useMouse';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import { Items } from './types';
import Options from './Options';
import * as S from './style';

type DropDownProps = {
  width?: string;
  height?: string;
  optionsWidth?: string;
  children: ReactNode;
  selectTitle: string;
  options: Items[];
  isStartFromRight?: boolean;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (operation: string) => void;
};

const DropDown = ({
  width = '48px',
  height = '48px',
  children,
  selectTitle,
  optionsWidth = '100%',
  isStartFromRight,
  options,
  className,
  handleSelect,
}: DropDownProps) => {
  const {
    isClicked,
    handleMouseOver,
    handleMouseOut,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    resetClick,
  } = useMouse(false);

  const [dropDownItem] = useRecoilState(dropDownItemState);

  const [isClickAway, setIsClickAway] = useState(false);
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      setIsClickAway(!drop.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    const resetAllClick = () => {
      resetClick();
      setIsClickAway(false);
    };

    if (isClickAway) {
      resetAllClick();
    }
  }, [isClickAway, isClicked]);

  useEffect(() => {
    if (!isClicked) {
      return;
    }
    handleClick();
  }, [dropDownItem]);

  const handleClickSelect = (operation: string) => {
    handleClick();

    handleSelect(operation);
  };

  return (
    <S.Container ref={drop} className={className}>
      <S.SelectContainer width={width} height={height}>
        <S.CustomSelect
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleClick={handleClick}
        >
          {children}
        </S.CustomSelect>
      </S.SelectContainer>
      <S.Content
        className={selectTitle}
        width={optionsWidth}
        isStartFromRight={isStartFromRight}
        isClicked={isClicked}
      >
        <Options options={options} handleClickSelect={handleClickSelect} />
      </S.Content>
    </S.Container>
  );
};

export default DropDown;
