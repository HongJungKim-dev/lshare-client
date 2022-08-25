import { useRecoilState } from 'recoil';
import useMouse from '@hooks/useMouse';
import dropDownItemState from '@store/DropDownItem';
import * as S from './style';

type ItemProps = {
  option: string;
  handleClickSelect: () => void;
};
const Item = ({ option, handleClickSelect }: ItemProps) => {
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setDropDownItem] = useRecoilState(dropDownItemState);

  const handleClickOption = (selectedOption: string) => {
    setDropDownItem(selectedOption);
    handleClickSelect();
  };

  return (
    <S.Item
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      isMouseOvered={isMouseOvered}
    >
      <S.ItemContainer>
        <S.Title onClick={() => handleClickOption(option)}>{option}</S.Title>
      </S.ItemContainer>
    </S.Item>
  );
};

export default Item;
