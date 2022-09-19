/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentContent from '@components/CommentContent';
import CommentWrite from '@components/CommentWrite';
import emojisType from '@components/types/ReactionList';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import replyState from '@store/Reply';
// import timeForToday from '@pages/Detail/util';
import * as S from './style';

type CommentReplyProps = {
  className?: string;
  nickname: string;
  time: string;
  isEditied: boolean;
  // commentId: number;
  content: string;
  avatorSrc: string;
  avatorAlt: string;
  emojis: emojisType[];
  isAuthorized: boolean;
  // writer: string;
  studyOrganizer: string;
  id?: number;
  studyId?: number;
  writerId: number;
  parentId?: number;
  isMyComment: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  myMemberId: number;
  currentCommentId: number;
  isStudyOrganizer: boolean;
};

const CommentReply = ({
  className,
  id,
  studyOrganizer,
  nickname,
  time,
  isEditied,
  // commentId,
  content,
  avatorSrc,
  avatorAlt,
  emojis,
  isAuthorized,
  // writer,
  writerId,
  // myMemberId,
  parentId,
  isMyComment,
  isStudyOrganizer,
  currentCommentId,
  studyId,
}: CommentReplyProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useRecoilState(replyState);

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickDelete = () => {
    const deleteReply = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      try {
        // const response = await axios.delete(`${process.env.END_POINT}api/comments/${parentId}/recomments/${id}`, { headers });
        const response = await axios.delete(`${process.env.END_POINT}api/comments/${parentId}/recomments/${id}`, { headers });

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
          return;
        }
      } catch (error: any) {
        console.log(error);
      }

      const remainComments = comments.filter((comment) => comment.id !== id);
      setComments(remainComments);
    };

    deleteReply();
  };

  useEffect(() => {
    // const getReplies = async () => {
    //   // const res = await axios.get(`${process.env.END_POINT}api/comments/${id}/commentParent/${parentId}`);
    //   const res = await axios.get(`${process.env.END_POINT}api/comments/${id}/commentParent/${parentId}?page=0&size=10&sortOrder=CURRENT`);
    //   console.log('replies');
    //   console.log(res);
    //   const apis = [
    //     {
    //       commentId: 32,
    //       commentParentId: 1,
    //       writerId: 1,
    //       writer: 'devjun10',
    //       profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //       content: 'sdf',
    //       reactions: [
    //         {
    //           emotion: '👍',
    //           count: 1,
    //           reactionClicked: 'FALSE',
    //         },
    //         {
    //           emotion: '❤️',
    //           count: 1,
    //           reactionClicked: 'FALSE',
    //         },
    //       ],
    //       createdAt: '2022-09-08T20:44:45',
    //       lastModifiedAt: null,
    //       reCommentCount: 0,
    //     },
    //     {
    //       commentId: 31,
    //       commentParentId: 1,
    //       writerId: 1,
    //       writer: 'devjun10',
    //       profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //       content: 'sdf',
    //       reactions: [],
    //       createdAt: '2022-09-08T20:44:45',
    //       lastModifiedAt: null,
    //       reCommentCount: 0,
    //     },
    //     {
    //       commentId: 28,
    //       commentParentId: 1,
    //       writerId: 1,
    //       writer: 'devjun10',
    //       profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //       content: 'sdf',
    //       reactions: [],
    //       createdAt: '2022-09-08T20:44:45',
    //       lastModifiedAt: null,
    //       reCommentCount: 0,
    //     },
    //     {
    //       commentId: 24,
    //       commentParentId: 1,
    //       writerId: 1,
    //       writer: 'devjun10',
    //       profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //       content: 'sdf',
    //       reactions: [],
    //       createdAt: '2022-09-08T20:44:45',
    //       lastModifiedAt: null,
    //       reCommentCount: 0,
    //     },
    //     {
    //       commentId: 23,
    //       commentParentId: 1,
    //       writerId: 1,
    //       writer: 'devjun10',
    //       profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //       content: 'sdf',
    //       reactions: [],
    //       createdAt: '2022-09-08T20:44:45',
    //       lastModifiedAt: null,
    //       reCommentCount: 0,
    //     },
    //     {
    //       commentId: 15,
    //       commentParentId: 1,
    //       writerId: 1,
    //       writer: 'devjun10',
    //       profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //       content: 'sdf',
    //       reactions: [],
    //       createdAt: '2022-09-08T20:44:45',
    //       lastModifiedAt: null,
    //       reCommentCount: 0,
    //     },
    //   ];
    //   // type reactionType = typeof apiReplys[0];
    //   // const newReplys = apliReplyList[replyIndex].map((reply) => {
    //   const newReplys = apis.map((reply) => {
    //     const { createdAt, profileImage, content, lastModifiedAt, reCommentCount } = reply;
    //     // eslint-disable-next-line prefer-destructuring
    //     // const reactions: reactionType[] = reply.reactions;
    //     // TODO: any 타입 구체화
    //     const { reactions } = reply;
    //     return {
    //       id: commentId,
    //       nickname: writer,
    //       parentId,
    //       writerId,
    //       time: timeForToday(createdAt),
    //       isEditied: !!lastModifiedAt,
    //       replyNum: reCommentCount,
    //       commentId: id,
    //       content,
    //       avatorSrc: profileImage,
    //       avatorAlt: `${writer}-profile-image`,
    //       // eslint-disable-next-line no-shadow
    //       emojis: reactions.map(({ emotion, count, reactionClicked }, index) => ({
    //         id: index + 1,
    //         type: emotion,
    //         value: emotion,
    //         count,
    //         isSelected: reactionClicked !== 'FALSE',
    //       })),
    //       isAuthorized: !!myMemberId,
    //       isStudyOrganizer: false,
    //       isMyComment: myMemberId === writerId,
    //     };
    //   });
    //   // setReplyState(replys);
    //   // setComments([...newReplys]);
    // };
    // getReplies();
  }, []);

  const [showingEmojis, setShowingEmojis] = useState(emojis);

  const handleToggleEmoji = (selectedContent: string) => {
    if (!isAuthorized) {
      // TODO: 로그인 모달
      return;
    }
    const selectedEmoji = showingEmojis.find(({ value }) => value === selectedContent);
    console.log(selectedContent);
    if (!selectedEmoji) {
      return;
    }
    const postEmoji = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const data = {
          emotion: selectedEmoji.value,
        };
        const response = await axios.post(`${process.env.END_POINT}api/studies/${studyId}/comments/${id}/reactions`, data, { headers });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    console.error('toggle emoji');
    postEmoji();

    const remainEmojis = showingEmojis.filter(({ value }) => value !== selectedContent);

    const isSelectOnlyByMe = selectedEmoji.isSelected && selectedEmoji.count === 1;
    const newEmojis = isSelectOnlyByMe
      ? [...remainEmojis]
      : [
          ...remainEmojis,
          {
            id: selectedEmoji.id,
            type: selectedEmoji.type,
            value: selectedEmoji.value,
            count: selectedEmoji.isSelected ? selectedEmoji.count - 1 : selectedEmoji.count + 1,
            isSelected: !selectedEmoji.isSelected,
          },
        ];
    newEmojis.sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id);
    setShowingEmojis(newEmojis);

    // TODO: 이모티콘 토글 API
  };

  const handleClickEmoji = (newEmoji: string) => {
    const postEmoji = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const data = {
          emotion: newEmoji,
        };
        const response = await axios.post(`${process.env.END_POINT}api/studies/${studyId}/comments/${id}/reactions`, data, { headers });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    postEmoji();

    const selectedEmoji = showingEmojis.find(({ value }) => value === newEmoji);
    if (selectedEmoji) {
      return;
    }

    setShowingEmojis([
      ...showingEmojis,
      {
        id: showingEmojis.length,
        type: 'new emoji',
        value: newEmoji,
        count: 1,
        isSelected: true,
      },
    ]);

    // TODO: 이모티콘 추가 API
  };

  return (
    <div className={className}>
      {isEditing ? (
        <CommentWrite
          id="editing-comment-reply"
          writerId={writerId}
          currentCommentId={currentCommentId}
          parentId={parentId}
          avatorSrc={avatorSrc}
          avatorAlt={avatorAlt}
          typedValue={content}
          isAuthorized={isAuthorized}
          handleClickEdit={handleClickEdit}
          isEditing={isEditing}
          nickname={nickname}
          studyOrganizer={studyOrganizer}
        />
      ) : (
        <>
          <S.CommentInfosMenuContainer>
            <CommentInfos isMyComment={isMyComment} avatorSrc={avatorSrc} avatorAlt={avatorAlt} nickname={nickname} time={time} isEdited={isEditied} isStudyOrganizer={isStudyOrganizer} />
            <CommentManageMenu isCommentWriter={isMyComment} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} handleClickEmoji={handleClickEmoji} />
          </S.CommentInfosMenuContainer>
          <S.CommentContainer>
            <CommentContent content={content} />
            <S.FlexBox>
              <S.CustomReactionList emojis={showingEmojis} handleClick={handleToggleEmoji} />
            </S.FlexBox>
          </S.CommentContainer>
        </>
      )}
    </div>
  );
};

export default CommentReply;
