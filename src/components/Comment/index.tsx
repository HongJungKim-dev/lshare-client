/* eslint-disable react/require-default-props */
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentContent from '@components/CommentContent';
import CommentWrite from '@components/CommentWrite';
import emojisType from '@components/types/ReactionList';
import replys from '@components/Comment/constants';
import TextButton from '@components/common/TextButton';
import replyType from '@components/types/Comment';

import { useState } from 'react';
import * as S from './style';

type CommentProps = {
  className?: string;
  replySize?: 'medium' | 'small';
  nickname: string;
  time: string;
  isEditied: boolean;
  replyNum: number;
  commentId: number;
  content: string;
  avatorSrc: string;
  avatorAlt: string;
  emojis: emojisType[];
  isAuthorized: boolean;
  writer: string;
};

const Comment = ({
  className,
  replySize = 'medium',
  nickname,
  time,
  isEditied,
  replyNum,
  commentId,
  content,
  avatorSrc,
  avatorAlt,
  emojis,
  isAuthorized,
  writer,
}: CommentProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isToggledComments, setIsToggledComments] = useState(false);
  const [replyState, setReplyState] = useState<replyType[]>([]);

  const handleClickToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickDelete = () => {};

  const handleClickEmoji = () => {};

  const handleClickToggleComments = () => {
    setIsToggledComments(!isToggledComments);

    // TODO: 서버요청 후 받은 데이터로 replyState갱신
    setReplyState(replys);
  };

  return (
    <div className={className}>
      {isEditing ? (
        <CommentWrite
          id="editing-comment"
          avatorSrc={avatorSrc}
          avatorAlt={avatorAlt}
          typedValue={content}
          isAuthorized={isAuthorized}
          handleClickEdit={handleClickEdit}
        />
      ) : (
        <>
          <S.CommentInfosMenuContainer>
            <CommentInfos
              avatorSrc={avatorSrc}
              avatorAlt={avatorAlt}
              nickname={nickname}
              time={time}
              isEdited={isEditied}
              isWriter={writer === nickname}
            />
            <CommentManageMenu
              isCommentWriter
              handleClickEdit={handleClickEdit}
              handleClickDelete={handleClickDelete}
              handleClickEmoji={handleClickEmoji}
            />
          </S.CommentInfosMenuContainer>
          <S.CommentContainer>
            <CommentContent content={content} />
            <S.FlexBox>
              <TextButton handleClick={handleClickToggle}>답글 적기</TextButton>
              <S.CustomReactionList emojis={emojis} commentId={commentId} />
            </S.FlexBox>
            {isToggled && (
              <S.CustomCommentWrite
                id="commentWrite"
                isAuthorized={isAuthorized}
                avatorSrc={avatorSrc}
                avatorAlt={avatorAlt}
                size={replySize}
              />
            )}
            <TextButton handleClick={handleClickToggleComments} mode="accent">
              {`답글 ${replyNum}개`}
            </TextButton>
            {isToggledComments && (
              <S.ReplyContainer>
                {replyState.map((reply) => (
                  <S.ReplyItem key={`comment-reply-${reply.id}`}>
                    <Comment
                      replySize="small"
                      nickname={reply.nickname}
                      time={reply.time}
                      isEditied={reply.isEditied}
                      replyNum={reply.replyNum}
                      commentId={reply.commentId}
                      content={reply.content}
                      avatorSrc={reply.avatorSrc}
                      avatorAlt={reply.avatorAlt}
                      emojis={reply.emojis}
                      isAuthorized={reply.isAuthorized}
                      writer={writer}
                    />
                  </S.ReplyItem>
                ))}
              </S.ReplyContainer>
            )}
          </S.CommentContainer>
        </>
      )}
    </div>
  );
};

export default Comment;
