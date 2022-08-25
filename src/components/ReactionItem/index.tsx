import React from 'react';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import * as S from './style';

type ReactionItemProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  id: number;
  commentId: number;
  content: string;
  count: number;
  label: string;
  isSelected: boolean;
};

const ReactionItem = ({
  className,
  id,
  // eslint-disable-next-line no-unused-vars
  commentId,
  content,
  count,
  label,
  isSelected,
}: ReactionItemProps) => {
  // eslint-disable-next-line no-unused-vars
  const [comments, setComments] = useRecoilState(commentState);

  // eslint-disable-next-line no-unused-vars
  const handleClick = (selectedId: number) => {
    // TODO: 댓글 이모지 토글 상태 바꾸는 로직
    // setComments();
  };

  return (
    <S.Item className={className}>
      <S.CustomButton
        isSelected={isSelected}
        size="xsmall"
        mode="tiny"
        handleClick={() => handleClick(id)}
      >
        <S.CustomEmoji label={label} content={content} />
        <S.Count>{count}</S.Count>
      </S.CustomButton>
    </S.Item>
  );
};

export default ReactionItem;
