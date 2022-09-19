/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentContent from '@components/CommentContent';
import CommentWrite from '@components/CommentWrite';
import emojisType from '@components/types/ReactionList';
// import replys from '@components/Comment/constants';
import TextButton from '@components/common/TextButton';
// import replyType from '@components/types/Comment';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import CommentReply from '@components/CommentReply';
import replyState from '@store/Reply';
import timeForToday from '@pages/Detail/util';
import * as S from './style';

type CommentProps = {
  className?: string;
  replySize?: 'medium' | 'small';
  nickname: string;
  time: string;
  isEditied: boolean;
  // replyNum: number;
  studyId: number;
  content: string;
  avatorSrc: string;
  avatorAlt: string;
  emojis: emojisType[];
  isAuthorized: boolean;
  // writer: string;
  studyOrganizer: string;
  id?: number;
  writerId: number;
  myMemberId: number;
  // eslint-disable-next-line react/no-unused-prop-types
  isStudyOrganizer: boolean;
  isMyComment: boolean;
};

const Comment = ({
  className,
  id,
  studyOrganizer,
  replySize = 'medium',
  nickname,
  time,
  isEditied,
  // replyNum,
  studyId,
  content,
  avatorSrc,
  avatorAlt,
  emojis,
  isAuthorized,
  // writer,
  isStudyOrganizer,
  isMyComment,
  writerId,
  myMemberId,
}: CommentProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isToggledComments, setIsToggledComments] = useState(false);
  // const [replyState, setReplyState] = useState<replyType[]>([]);
  const [comments, setComments] = useRecoilState(commentState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [replies, setReplies] = useRecoilState(replyState);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  // eslint-disable-next-line no-unused-vars
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const nextIndex = 1;
  const [contentPageIdx, setContentPageIdx] = useState(nextIndex);
  // const lastPageIdx = 5;

  const handleClickToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const getReplies = async () => {
    const response = await axios.get(`${process.env.END_POINT}api/comments/commentParent/${id}?page=${contentPageIdx}&size=10&sortOrder=CURRENT`);

    // console.log(response.data.contents);
    setContentPageIdx(contentPageIdx + 1);
    // const res = {
    //   data: {
    //     contents: [
    //       {
    //         commentId: 32,
    //         commentParentId: 1,
    //         writerId: 1,
    //         writer: 'devjun10',
    //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //         content: 'sdf1',
    //         reactions: [
    //           {
    //             emotion: '👍',
    //             count: 1,
    //             reactionClicked: 'FALSE',
    //           },
    //           {
    //             emotion: '❤️',
    //             count: 1,
    //             reactionClicked: 'FALSE',
    //           },
    //         ],
    //         createdAt: '2022-09-08T20:44:45',
    //         lastModifiedAt: null,
    //         reCommentCount: 0,
    //       },
    //       {
    //         commentId: 31,
    //         commentParentId: 1,
    //         writerId: 1,
    //         writer: 'devjun10',
    //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //         content: 'sdf2',
    //         reactions: [
    //           {
    //             emotion: '👍',
    //             count: 1,
    //             reactionClicked: 'FALSE',
    //           },
    //           {
    //             emotion: '❤️',
    //             count: 1,
    //             reactionClicked: 'FALSE',
    //           },
    //         ],
    //         createdAt: '2022-09-08T20:44:45',
    //         lastModifiedAt: null,
    //         reCommentCount: 0,
    //       },
    //       {
    //         commentId: 28,
    //         commentParentId: 1,
    //         writerId: 1,
    //         writer: 'devjun10',
    //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //         content: 'sdf3',
    //         reactions: [
    //           {
    //             emotion: '👍',
    //             count: 1,
    //             reactionClicked: 'FALSE',
    //           },
    //           {
    //             emotion: '❤️',
    //             count: 1,
    //             reactionClicked: 'FALSE',
    //           },
    //         ],
    //         createdAt: '2022-09-08T20:44:45',
    //         lastModifiedAt: null,
    //         reCommentCount: 0,
    //       },
    //       {
    //         commentId: 24,
    //         commentParentId: 1,
    //         writerId: 1,
    //         writer: 'devjun10',
    //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //         content: 'sdf4',
    //         reactions: [],
    //         createdAt: '2022-09-08T20:44:45',
    //         lastModifiedAt: null,
    //         reCommentCount: 0,
    //       },
    //       {
    //         commentId: 23,
    //         commentParentId: 1,
    //         writerId: 1,
    //         writer: 'devjun10',
    //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //         content: 'sdf5',
    //         reactions: [],
    //         createdAt: '2022-09-08T20:44:45',
    //         lastModifiedAt: null,
    //         reCommentCount: 0,
    //       },
    //       {
    //         commentId: 15,
    //         commentParentId: 1,
    //         writerId: 1,
    //         writer: 'devjun10',
    //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
    //         content: 'sdf6',
    //         reactions: [],
    //         createdAt: '2022-09-08T20:44:45',
    //         lastModifiedAt: null,
    //         reCommentCount: 0,
    //       },
    //     ],
    //     first: true,
    //     last: true,
    //     sorted: false,
    //     empty: false,
    //     hasNext: false,
    //   },
    // };

    // const newReplys:reactionType[] = response.data.content.map((reply) => {

    // type reactionType = typeof res.data.contents[0];
    const newReplys: any = response.data.content.map((reply: any) => {
      const { createdAt, commentParentId, commentId, writerId, writer, profileImage, content, lastModifiedAt, reCommentCount } = reply;
      // eslint-disable-next-line prefer-destructuring
      // const reactions: reactionType[] = reply.reactions;
      const { reactions } = reply;
      // TODO: any 타입 구체화
      // const { reactions } = reply;
      type reactionType = {
        emotion: string;
        count: number;
        reactionClicked: string;
      };
      return {
        id: commentId,
        nickname: writer,
        writerId,
        parentId: commentParentId,
        time: timeForToday(createdAt),
        isEditied: !!lastModifiedAt,
        replyNum: reCommentCount,
        commentId: id,
        content,
        avatorSrc: profileImage,
        avatorAlt: `${writer}-profile-image`,
        // eslint-disable-next-line no-shadow
        emojis: reactions.map(({ emotion, count, reactionClicked }: reactionType, index: number) => ({
          id: index + 1,
          type: emotion,
          value: emotion,
          count,
          isSelected: reactionClicked !== 'FALSE',
        })),
        isAuthorized: !!myMemberId,
        isStudyOrganizer: false,
        isMyComment: writerId === myMemberId,
      };
    });
    // setReplyState(replys);

    const { sorted, first, last, empty, hasNext } = response.data;

    setContentControls({
      sorted,
      first,
      last,
      empty,
      hasNext,
    });

    setReplies([...replies, ...newReplys]);
  };

  useEffect(() => {
    getReplies();
  }, []);

  const handleClickToggleComments = () => {
    setIsToggledComments(!isToggledComments);
    // addReplies();
    // TODO: 서버요청 후 받은 데이터로 replyState갱신

    // const apiReplys = [
    //   {
    //     id: 3,
    //     githubId: 'devjun10',
    //     profileImage: null,
    //     content: 'sdf',
    //     reactions: [
    //       {
    //         memberIds: [2, 3, 100],
    //         commentReactionId: '1',
    //         emotion: '::heart::',
    //         reactionCount: 1,
    //       },
    //     ],
    //     createdAt: '2022-09-08T20:44:45',
    //     lastModifiedAt: '2022-09-08T20:44:46',
    //     reCommentCount: 0,
    //   },
    // ];

    // const apiReplys2 = [
    //   {
    //     id: 3,
    //     githubId: '22devjun10',
    //     profileImage: null,
    //     content: '22sdf',
    //     reactions: [
    //       {
    //         memberIds: [2, 3, 100],
    //         commentReactionId: '1',
    //         emotion: '::heart::',
    //         reactionCount: 1,
    //       },
    //     ],
    //     createdAt: '2022-09-08T20:44:45',
    //     lastModifiedAt: '2022-09-08T20:44:46',
    //     reCommentCount: 0,
    //   },
    // ];

    // const apliReplyList = [apiReplys, apiReplys2];
    // console.log('==============');
    // console.log(replyIndex);
    // console.log(apliReplyList[replyIndex]);
    // type reactionType = typeof apiReplys[0];
    // const newReplys = apliReplyList[replyIndex].map((reply) => {
    //   const { githubId, profileImage, content, lastModifiedAt } = reply;
    //   // eslint-disable-next-line prefer-destructuring
    //   // const reactions: reactionType[] = reply.reactions;
    //   // TODO: any 타입 구체화
    //   const { reactions } = reply;

    //   return {
    //     id: reply.id,
    //     nickname: githubId,
    //     time: '',
    //     isEditied: !!lastModifiedAt,
    //     replyNum: 0,
    //     commentId: id,
    //     content,
    //     avatorSrc: profileImage,
    //     avatorAlt: `${githubId}-profile-image`,
    //     // eslint-disable-next-line no-shadow
    //     emojis: reactions.map(({ commentReactionId, emotion, reactionCount, memberIds }) => ({
    //       id: commentReactionId,
    //       type: emotion,
    //       value: emotion,
    //       count: reactionCount,
    //       isSelected: !!memberIds.find((memberId) => memberId === myId),
    //     })),
    //     isAuthorized: !!githubId,
    //     isWriter: myNickName === studyOrganizer,
    //     isMyComment: myNickName === githubId,
    //   };
    // });
    // // setReplyState(replys);
    // setReplyState([...newReplys]);
  };

  const [showingEmojis, setShowingEmojis] = useState(emojis);

  const handleClickEmoji = (newEmoji: string) => {
    if (!isAuthorized) {
      // TODO: 로그인 모달
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
          emotion: newEmoji,
        };
        console.log(data);
        const response = await axios.post(`${process.env.END_POINT}api/reactions/${studyId}/comments/${id}/reactions`, data, { headers });
        console.log(response);
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

  const handleToggleEmoji = (selectedContent: string) => {
    if (!isAuthorized) {
      // TODO: 로그인 모달
      return;
    }
    const selectedEmoji = showingEmojis.find(({ value }) => value === selectedContent);

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

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const handleClickCancel = () => {};

  const handleClickConfirm = () => {
    const deleteComment = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      try {
        // const response = await axios.delete(`${process.env.END_POINT}api/studies/${studyId}/comments/${id}`, { headers });
        console.log('delete comment');
        console.log(id);
        console.log(headers);
        const response = await axios.delete(`${process.env.END_POINT}api/comments/${id}`, { headers });
        console.log(response);
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

    deleteComment();
  };

  // // TODO : custom hook으로 수정하기
  // const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //   if (!target) {
  //     return;
  //   }

  //   entries.forEach((entry) => {
  //     if (contentPageIdx > lastPageIdx) {
  //       return;
  //     }

  //     if (entry.isIntersecting) {
  //       observer.unobserve(target);

  //       const addData = async () => {
  //         const apis = [
  //           {
  //             commentId: 32,
  //             commentParentId: 1,
  //             writerId: 1,
  //             writer: 'devjun10',
  //             profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
  //             content: 'sdf1',
  //             reactions: [
  //               {
  //                 emotion: '👍',
  //                 count: 1,
  //                 reactionClicked: 'FALSE',
  //               },
  //               {
  //                 emotion: '❤️',
  //                 count: 1,
  //                 reactionClicked: 'FALSE',
  //               },
  //             ],
  //             createdAt: '2022-09-08T20:44:45',
  //             lastModifiedAt: null,
  //             reCommentCount: 0,
  //           },
  //           {
  //             commentId: 31,
  //             commentParentId: 1,
  //             writerId: 1,
  //             writer: 'devjun10',
  //             profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
  //             content: 'sdf2',
  //             reactions: [
  //               {
  //                 emotion: '👍',
  //                 count: 1,
  //                 reactionClicked: 'FALSE',
  //               },
  //               {
  //                 emotion: '❤️',
  //                 count: 1,
  //                 reactionClicked: 'FALSE',
  //               },
  //             ],
  //             createdAt: '2022-09-08T20:44:45',
  //             lastModifiedAt: null,
  //             reCommentCount: 0,
  //           },
  //           {
  //             commentId: 28,
  //             commentParentId: 1,
  //             writerId: 1,
  //             writer: 'devjun10',
  //             profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
  //             content: 'sdf3',
  //             reactions: [
  //               {
  //                 emotion: '👍',
  //                 count: 1,
  //                 reactionClicked: 'FALSE',
  //               },
  //               {
  //                 emotion: '❤️',
  //                 count: 1,
  //                 reactionClicked: 'FALSE',
  //               },
  //             ],
  //             createdAt: '2022-09-08T20:44:45',
  //             lastModifiedAt: null,
  //             reCommentCount: 0,
  //           },
  //           {
  //             commentId: 24,
  //             commentParentId: 1,
  //             writerId: 1,
  //             writer: 'devjun10',
  //             profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
  //             content: 'sdf4',
  //             reactions: [],
  //             createdAt: '2022-09-08T20:44:45',
  //             lastModifiedAt: null,
  //             reCommentCount: 0,
  //           },
  //           {
  //             commentId: 23,
  //             commentParentId: 1,
  //             writerId: 1,
  //             writer: 'devjun10',
  //             profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
  //             content: 'sdf5',
  //             reactions: [],
  //             createdAt: '2022-09-08T20:44:45',
  //             lastModifiedAt: null,
  //             reCommentCount: 0,
  //           },
  //           {
  //             commentId: 15,
  //             commentParentId: 1,
  //             writerId: 1,
  //             writer: 'devjun10',
  //             profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
  //             content: 'sdf6',
  //             reactions: [],
  //             createdAt: '2022-09-08T20:44:45',
  //             lastModifiedAt: null,
  //             reCommentCount: 0,
  //           },
  //         ];

  //         // type reactionType = typeof apiReplys[0];
  //         // const newReplys = apliReplyList[replyIndex].map((reply) => {
  //         const newReplys = apis.map((reply) => {
  //           const { createdAt, commentId, writerId, writer, profileImage, content, lastModifiedAt, reCommentCount } = reply;
  //           // eslint-disable-next-line prefer-destructuring
  //           // const reactions: reactionType[] = reply.reactions;
  //           // TODO: any 타입 구체화
  //           const { reactions } = reply;

  //           return {
  //             id: commentId,
  //             nickname: writer,
  //             writerId,
  //             parentId: id,
  //             time: timeForToday(createdAt),
  //             isEditied: !!lastModifiedAt,
  //             replyNum: reCommentCount,
  //             commentId: id,
  //             content,
  //             avatorSrc: profileImage,
  //             avatorAlt: `${writer}-profile-image`,
  //             // eslint-disable-next-line no-shadow
  //             emojis: reactions.map(({ emotion, count, reactionClicked }, index) => ({
  //               id: index + 1,
  //               type: emotion,
  //               value: emotion,
  //               count,
  //               isSelected: reactionClicked !== 'FALSE',
  //             })),
  //             isAuthorized: !!myMemberId,
  //             isStudyOrganizer: false,
  //             isMyComment: writerId === myMemberId,
  //           };
  //         });
  //         // setReplyState(replys);
  //         console.log('newReplys');
  //         console.log(newReplys);
  //         setRepies([...newReplys]);
  //       };

  //       setIsLoading(true);
  //       addData();
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 3000);

  //       addData();

  //       setContentPageIdx(contentPageIdx + 1);

  //       observer.observe(target);
  //     }
  //   });
  // };

  // const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

  // // TODO : custom hook으로 수정하기
  // useEffect(() => {
  //   if (!target) {
  //     return;
  //   }

  //   observer.observe(target);

  //   // eslint-disable-next-line consistent-return
  //   return () => observer.unobserve(target);
  // }, [target, onIntersect, observer]);

  const handleClickMoreComment = () => {
    // TODO: 주석풀고 아래 lastPageIdx와 비교 삭제
    if (!contentControls?.hasNext) {
      return;
    }

    // if (contentPageIdx > lastPageIdx) {
    //   return;
    // }

    getReplies();
  };

  return (
    <div className={className}>
      {isEditing ? (
        <CommentWrite
          id="editing-comment"
          currentCommentId={id}
          avatorSrc={avatorSrc}
          avatorAlt={avatorAlt}
          typedValue={content}
          isAuthorized={isAuthorized}
          handleClickEdit={handleClickEdit}
          studyId={studyId}
          isEditing={isEditing}
          nickname={nickname}
          studyOrganizer={studyOrganizer}
          parentId={id}
          writerId={writerId}
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
              <TextButton handleClick={handleClickToggle}>답글 적기</TextButton>
              <S.CustomReactionList emojis={showingEmojis} handleClick={handleToggleEmoji} />
            </S.FlexBox>
            {isToggled && (
              <S.CustomCommentWrite
                id="commentWrite"
                parentId={id}
                // currentCommentId={id}
                isAuthorized={isAuthorized}
                avatorSrc={avatorSrc}
                avatorAlt={avatorAlt}
                size={replySize}
                studyId={studyId}
                studyOrganizer={studyOrganizer}
                writerId={writerId}
              />
            )}
            <TextButton handleClick={handleClickToggleComments} mode="accent">
              {`답글 ${replies.length}개`}
            </TextButton>
            {isToggledComments && (
              <S.ReplyContainer>
                {replies.map((reply) => (
                  <S.ReplyItem key={`comment-reply-${id}-${reply.commentId}`}>
                    <CommentReply
                      nickname={reply.nickname}
                      time={reply.time}
                      isEditied={reply.isEditied}
                      // commentId={reply.id}
                      content={reply.content}
                      avatorSrc={reply.avatorSrc}
                      avatorAlt={reply.avatorAlt}
                      emojis={reply.emojis}
                      isAuthorized={reply.isAuthorized}
                      isMyComment={isMyComment}
                      // writer={writer}
                      studyOrganizer={studyOrganizer}
                      id={reply.id}
                      parentId={id}
                      writerId={writerId}
                      isStudyOrganizer={isStudyOrganizer}
                      myMemberId={myMemberId}
                      currentCommentId={reply.id}
                      studyId={studyId}
                    />
                  </S.ReplyItem>
                ))}
                <S.CustomTextButton handleClick={handleClickMoreComment}>답글 더보기</S.CustomTextButton>
                {/* <div ref={(currentTarget) => setTarget(currentTarget)} /> */}
              </S.ReplyContainer>
            )}
          </S.CommentContainer>
        </>
      )}
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <DoubleButtonModalArea handleClickLeftButton={handleClickCancel} handleClickRightButton={handleClickConfirm}>
              댓글 삭제
              <h3>댓글을 삭제하시겠습니까?</h3>
              {BUTTON_CANCEL}
              {BUTTON_CONFIRM}
            </DoubleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </div>
  );
};

export default Comment;
