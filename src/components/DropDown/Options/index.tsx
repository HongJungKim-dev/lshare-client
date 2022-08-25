import * as S from './style';
import { Items } from '../types';
import Item from './Item';

type OptionsProps = {
  options: Items[];
  handleClickSelect: () => void;
};

const Options = ({ options, handleClickSelect }: OptionsProps) => (
  <S.Container>
    {options.map(({ option }) => (
      <Item
        key={`option-${option}`}
        option={option}
        handleClickSelect={handleClickSelect}
      />
    ))}
  </S.Container>
);

export default Options;
