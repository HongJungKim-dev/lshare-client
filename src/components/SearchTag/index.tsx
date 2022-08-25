/* eslint-disable react/require-default-props */
import Tag from '@common/Tag';
import { useState } from 'react';
import tagType from '@components/types/Tags';
import * as S from './style';
import { INPUT_SIZE, DEFAULT_MODE } from './constants';

type SearchTagType = {
  className?: string;
  mode?: 'default' | 'tag';
  id: string;
  size?: string;
  isTagSingly?: boolean;
  tags?: tagType[];
  handleFocusDefault?: () => void;
};

const SearchTag = ({
  className,
  mode = DEFAULT_MODE,
  id,
  size,
  isTagSingly = true,
  tags,
  handleFocusDefault,
}: SearchTagType) => {
  const handleClick = () => {};

  const [isResetTag, setIsResetTag] = useState(false);

  const initializeIsRestTag = () => {
    setIsResetTag(false);
  };

  const handleClickReset = () => {
    setIsResetTag(true);
  };

  switch (mode) {
    case 'default':
      return (
        <S.DefaultTagBox className={className}>
          <S.DefaultTagContainer>
            {tags?.map((tag) => (
              <S.Item key={`serachTag-${tag.id}`}>
                <Tag handleClick={handleClick}>{tag.content}</Tag>
              </S.Item>
            ))}
          </S.DefaultTagContainer>
        </S.DefaultTagBox>
      );
    case 'tag':
      return (
        <S.Container className={className}>
          <S.CustomInput
            mode={mode}
            id={id}
            size={size || INPUT_SIZE}
            handleFocusDefault={handleFocusDefault}
            isResetTag={isResetTag}
            initializeIsRestTag={initializeIsRestTag}
            isTagSingly={isTagSingly}
            tags={tags}
          />
          <S.CustomButton size="medium" handleClick={handleClickReset}>
            초기화
          </S.CustomButton>
        </S.Container>
      );
    default:
      return null;
  }
};

export default SearchTag;
