import React from 'react';
import ReactionItem from '@components/ReactionItem';
import emojisType from '@components/types/ReactionList';
import StyledContainer from './style';

type ReactionListProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  emojis: emojisType[];
  commentId: number;
};

const ReactionList = ({ className, emojis, commentId }: ReactionListProps) => (
  <StyledContainer className={className}>
    {emojis.map(({ id, type, value, count, isSelected }) => (
      <ReactionItem
        key={`ReactionList-emoji-${id}`}
        id={id}
        commentId={commentId}
        content={value}
        count={count}
        label={type}
        isSelected={isSelected}
      />
    ))}
  </StyledContainer>
);

export default ReactionList;
