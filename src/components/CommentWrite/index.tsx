/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import CommentTextArea from '@components/CommentTextArea';
import { useEffect, useState } from 'react';
import sizeType from '@components/types/CommentWrite';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import axios from 'axios';
import replyState from '@store/Reply';
import timeForToday from '@pages/Detail/util';
import { getDate, sizes, ERROR_MSG } from './constants';
import * as S from './style';

type CommentWriteProps = {
  id: string;
  studyId?: number;
  parentId?: number;
  writerId: number;
  currentCommentId?: number;
  className?: string;
  isAuthorized: boolean;
  placeholder?: string;
  size?: sizeType;
  avatorSrc: string;
  avatorAlt: string;
  typedValue?: string;
  handleClickEdit?: () => void;
  isEditing?: boolean;
  nickname?: string;
  studyOrganizer: string;
};

const CommentWrite = ({
  className,
  id,
  studyId,
  currentCommentId,
  parentId,
  writerId,
  isAuthorized,
  placeholder = '댓글을 작성해보세요!',
  size = 'medium',
  avatorSrc,
  avatorAlt,
  typedValue = '',
  handleClickEdit,
  isEditing,
  nickname,
  studyOrganizer,
}: CommentWriteProps) => {
  const [comments, setComments] = useRecoilState(commentState);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [showingValue, setShowingValue] = useState(typedValue);
  const [replies, setReplies] = useRecoilState(replyState);

  const handleChangeValue = (currentValue: string) => {
    // TODO: commentState를 이용하기
    setValue(currentValue);
  };

  const handleClickCancelComment = () => {
    setValue('');

    if (!handleClickEdit) {
      return;
    }

    handleClickEdit();
  };

  const handleClickRegisterComment = () => {
    // TODO: 서버에 value로 댓글 요청
    const postAddComment = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const data = {
        content: value,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };

      try {
        // const response = await axios.post(`${process.env.END_POINT}api/comments`, {
        //   content: value,
        // }, {
        //   headers,
        // });
        // const response = await axios.post(
        //   `${process.env.END_POINT}api/comments/${parentId}/recomments`,
        //   {
        //     content: value,
        //   },
        //   {
        //     headers,
        //   }
        // );

        const currentParentId = parentId || studyId;
        const URL =
          currentParentId && currentCommentId && currentParentId !== currentCommentId ? `${process.env.END_POINT}api/comments/${parentId}/recomments` : `${process.env.END_POINT}api/comments`;
        const response = await axios.post(URL, data, {
          headers,
        });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }

        // const targetComments = parentId && parentId !== currentCommentId ? replies : comments;
        // const setTargetComments = parentId && parentId !== currentCommentId ? setReplies : setComments;

        // setTargetComments([...targetComments, newComment]);
        if (parentId && parentId !== currentCommentId) {
          const sameParentReplies = replies.filter((comment) => comment.parentId === parentId);
          // console.log([
          //   {
          //     commentId: sameParentReplies.length,
          //     writerId,
          //     parentId,
          //     nickname,
          //     time: '1초전',
          //     isEditied: false,
          //     replyNum: 0,
          //     // commentId,
          //     content: value,
          //     avatorSrc: '',
          //     avatorAlt: '',
          //     emojis: [],
          //     isAuthorized,
          //     isStudyOrganizer: true,
          //     isMyComment: true,
          //   },
          //   ...replies,
          // ]);

          // TODO 배포 순서상관없는지.
          const newReplies = [
            {
              id: response.data.reCommentId, // replies[0].id + 1,
              commentId: response.data.reCommentId, // replies[0].id + 1, // sameParentReplies.length,
              writerId,
              parentId,
              nickname,
              time: '1초전',
              isEditied: false,
              replyNum: 0,
              // commentId,
              content: value,
              avatorSrc: '',
              avatorAlt: '',
              emojis: [],
              isAuthorized,
              isStudyOrganizer: true,
              isMyComment: true,
            },
            ...replies,
          ];
          // TODO 배포 필요없는지 api확인시
          // newReplies.sort((commentA, commentB) => commentB.id - commentA.id);
          setReplies([...newReplies]);
        } else {
          // TODO 배포 순서상관없는지. 밑에 코드가 원래 프론트쪽 순서
          const newComments = [
            {
              id: response.data.commentId, // comments[0].id - 1, // response.data.commentId,
              commentId: response.data.commentId, // comments[0].id - 1, // comments.length,
              writerId,
              nickname,
              time: '1초전',
              isEditied: false,
              replyNum: 0,
              content: value,
              avatorSrc: '',
              avatorAlt: '',
              emojis: [],
              isAuthorized,
              isStudyOrganizer: true,
              isMyComment: true,
            },
            ...comments,
          ];

          // const newComments = [
          //   ...comments,
          //   {
          //     id: response.data.commentId, // comments[0].id - 1, // response.data.commentId,
          //     commentId: response.data.commentId, // comments[0].id - 1, // comments.length,
          //     writerId,
          //     nickname,
          //     time: '1초전',
          //     isEditied: false,
          //     replyNum: 0,
          //     content: value,
          //     avatorSrc: '',
          //     avatorAlt: '',
          //     emojis: [],
          //     isAuthorized,
          //     isStudyOrganizer: true,
          //     isMyComment: true,
          //   },
          // ];
          // TODO 배포 필요없는지 api확인시
          // newComments.sort((commentA, commentB) => commentA.id - commentB.id);
          setComments([...newComments]);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    const putEditComment = async () => {
      try {
        const data =
          parentId && parentId !== currentCommentId
            ? {
                studyId,
                content: value,
              }
            : {
                content: value,
              };
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const headers = {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        };
        const currentParentId = parentId || studyId;
        const URL =
          currentParentId && currentCommentId && currentParentId !== currentCommentId
            ? `${process.env.END_POINT}api/comments/${parentId}/recomments/${currentCommentId}`
            : `${process.env.END_POINT}api/comments/${currentCommentId}`;
        const response = await axios.put(URL, data, { headers });
        // const response = await axios.put(
        //   `${process.env.END_POINT}api/comments/${currentCommentId}`,
        //   {
        //     content: value,
        //   },
        //   { headers }
        // );
        // const response = await axios.put(
        //   `${process.env.END_POINT}api/comments/${parentId}/recomments/${currentCommentId}`,
        //   {
        //     content: value,
        //   },
        //   { headers }
        // );
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

      // parentId && currentCommentId && parentId !== currentCommentId
      if (parentId !== currentCommentId) {
        const sameParentReplies = replies.filter((comment) => comment.parentId === parentId);
        const targetComment = sameParentReplies.find((comment) => comment.id === currentCommentId);
        const remainComments = sameParentReplies.filter((comment) => comment.id !== currentCommentId);
        if (!targetComment) {
          return;
        }

        const newComment = [
          {
            id: currentCommentId, // commentId,
            nickname: targetComment.nickname,
            parentId,
            writerId,
            time: '1초전',
            isEditied: true,
            replyNum: 0,
            commentId: currentCommentId, // targetComment.commentId,
            content: value,
            avatorSrc: targetComment.avatorSrc,
            avatorAlt: targetComment.avatorSrc,
            emojis: targetComment.emojis,
            isAuthorized: targetComment.isAuthorized,
            isStudyOrganizer: nickname === studyOrganizer,
            isMyComment: true,
          },
          ...remainComments,
        ];

        newComment.sort((commentA, commentB) => commentB.id - commentA.id);
        setReplies(() => newComment);
        return;
      }

      if (parentId === currentCommentId) {
        const targetComment = comments.find((comment) => comment.id === currentCommentId);
        const remainComments = comments.filter((comment) => comment.id !== currentCommentId);

        if (!targetComment) {
          return;
        }

        const newComment = [
          ...remainComments,
          {
            id: currentCommentId, // commentId,
            nickname: targetComment.nickname,
            writerId,
            time: targetComment.time,
            isEditied: true,
            replyNum: 0,
            commentId: currentCommentId, // targetComment.commentId,
            content: value,
            avatorSrc: targetComment.avatorSrc,
            avatorAlt: targetComment.avatorSrc,
            emojis: targetComment.emojis,
            isAuthorized: targetComment.isAuthorized,
            isStudyOrganizer: nickname === studyOrganizer,
            isMyComment: true,
          },
        ];
        newComment.sort((commentA, commentB) => commentA.id - commentB.id);
        setComments(() => newComment);
      }
    };

    const targetComments = parentId && parentId !== currentCommentId ? replies : comments;
    const setTargetComments = parentId && parentId !== currentCommentId ? setReplies : setComments;
    // TODO: 서버 성공시 comment store에 저장하는 내용은 추후 서버가 댓글 목록 조회시 주는 데이터를 참고하여 수정, 아래는 임시 key, value
    if (isEditing) {
      putEditComment();
    } else {
      postAddComment();
    }

    if (!handleClickEdit) {
      return;
    }

    handleClickEdit();
    if (nickname && !isEditing) {
      // TODO: API요청후에 상태 업데이트
      // if (parentId && parentId !== currentCommentId) {
      // }
      // setTargetComments([
      //   ...targetComments,
      //   {
      //     id: targetComments.length,
      //     nickname,
      //     writerId,
      //     time: getDate(),
      //     isEditied: false,edit
      //     replyNum: 0,
      //     commentId,
      //     content: value,
      //     avatorSrc,
      //     avatorAlt,
      //     emojis: [],
      //     isAuthorized: true,
      //     isStudyOrganizer: nickname === studyOrganizer,
      //     isMyComment: true,
      //   },
      // ]);
      // return;
    }

    // const targetComment = targetComments.find((comment) => comment.id === currentCommentId);
    // const remainComments = targetComments.filter((comment) => comment.id !== currentCommentId);

    // if (!targetComment) {
    //   return;
    // }
    // console.log('value');
    // console.log(value);
    // const newComment = [
    //   ...remainComments,
    //   {
    //     id: currentCommentId, // commentId,
    //     nickname: targetComment.nickname,
    //     writerId,
    //     time: targetComment.time,
    //     isEditied: true,
    //     replyNum: 0,
    //     commentId, // targetComment.commentId,
    //     content: value,
    //     avatorSrc: targetComment.avatorSrc,
    //     avatorAlt: targetComment.avatorSrc,
    //     emojis: targetComment.emojis,
    //     isAuthorized: targetComment.isAuthorized,
    //     isStudyOrganizer: nickname === studyOrganizer,
    //     isMyComment: true,
    //   },
    // ];

    // newComment.sort((commentA, commentB) => commentA.id - commentB.id);
    // setTargetComments(() => newComment);
    // TODO: 서버 성공시 value ''으로 초기화 후에 리턴
    setShowingValue(value);
    setValue('');

    setIsError(true);

    if (!handleClickEdit) {
      return;
    }

    handleClickEdit();
  };

  return (
    <>
      <S.Container className={className}>
        {avatorSrc ? (
          <S.CustomAvatar src={avatorSrc} alt={avatorAlt} size={sizes[size].avatarSize} />
        ) : (
          <S.AvatarContainer>
            <S.IconAvatar mode="avatar" />
          </S.AvatarContainer>
        )}
        <S.ContentContainer>
          <CommentTextArea id={id} isAuthorized={isAuthorized} size={sizes[size].commentSize} placeholder={placeholder} value={value || showingValue} handleChangeValue={handleChangeValue} />
        </S.ContentContainer>
      </S.Container>
      <S.ButtonContainer size={size}>
        <S.ErrorMsg>{isError ? ERROR_MSG : ''}</S.ErrorMsg>
        <div>
          <S.CustomButton size={sizes[size].buttonSize} handleClick={handleClickCancelComment}>
            취소
          </S.CustomButton>
          <S.CustomButton mode="accent" size={sizes[size].buttonSize} handleClick={handleClickRegisterComment} disabled={!value}>
            댓글 등록
          </S.CustomButton>
        </div>
      </S.ButtonContainer>
    </>
  );
};

export default CommentWrite;
