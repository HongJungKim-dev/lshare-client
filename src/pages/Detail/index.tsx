/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import Comment from '@components/Comment';
import useMouse from '@hooks/useMouse';
import Title from '@components/common/Title';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState, useRef } from 'react';
import replyType from '@components/types/Comment';
import commentState from '@store/Comment';
import studyType from '@components/types/Studies';
import LoadingSpinner from '@components/common/LoadingSpinner';
import axios from 'axios';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import userInfosState from '@store/UserInfos';
import * as S from './style';

const items = [
  { id: 1, content: '', nickName: '이든' },
  { id: 2, content: '', nickName: 'Jun' },
  { id: 3, content: '', nickName: '방태' },
  { id: 4, content: '', nickName: 'Jay' },
  { id: 5, content: '', nickName: 'crong' },
  { id: 6, content: '', nickName: '호눅스' },
];
const participants = 3;
const maxPeople = 5;
const peoples = `${participants}/${maxPeople}`;

const Detail = () => {
  const navigate = useNavigate();
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const { id } = useParams<{ id: string }>();
  const currentId = Number(id);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const [userInfos] = useRecoilState(userInfosState);
  const myName = '이든';
  // eslint-disable-next-line no-unused-vars

  type keyType =
    | 'id'
    | 'nickName'
    | 'memberId'
    | 'studyOrganizer'
    | 'time'
    | 'title'
    | 'infos'
    | 'viewCount'
    | 'likeCount'
    | 'commentCount'
    | 'isRecruiting'
    | 'content'
    | 'tags'
    | 'createdDate'
    | 'maxStudyMemberCount'
    | 'currentStudyMemberCount'
    | 'isAuthorized';
  //    | 'myId'

  type currentStudyType = Record<keyType, any>;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [study, setStudy] = useState<currentStudyType>();
  const [isShowingLiked, setIsShowingLiked] = useState(false);
  const [showingLikeCount, setShowingLikeCount] = useState(0);
  const [isStudyRecruiting, setIsStudyRecruiting] = useState(false);
  // TODO: any 타입 구체화
  const [comments, setComments] = useRecoilState(commentState);
  const [currentComments, setCurrentComments] = useState<replyType[]>([]);
  type memberKeyType = 'id' | 'content' | 'nickName';
  type memberType = Record<memberKeyType, any>;
  const [studyMembers, setStudyMembers] = useState<memberType[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const nextIndex = 1;
  const [contentPageIdx, setContentPageIdx] = useState(nextIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudyLoading, setIsStudyLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const lastPageIdx = 5;
  const timeForToday = (value: string) => {
    const today = new Date();
    const timeValue = new Date(value);
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  useEffect(() => {
    const getStudy = async () => {
      try {
        const response = await axios.get(`${process.env.END_POINT}api/studies/${currentId}`);
        // console.log(response.data.contents);
        // if (response.status === 404) {
        //   console.log('404 error');
        //   return;
        // }
        // if (response.status === 500) {
        //   console.log('500 error');
        // }

        // TODO: study 업데이트 하기
        type dataKeyType =
          | 'studyId'
          | 'memberId'
          | 'title'
          | 'content'
          | 'studyOrganizer'
          | 'studyStatus'
          | 'currentStudyMemberCount'
          | 'district'
          | 'commentCount'
          | 'viewCount'
          | 'likeCount'
          | 'createdAt'
          | 'maxStudyMemberCount'
          | 'startDate'
          | 'endDate'
          | 'progressOfStudy'
          | 'likeClicked';
        // | 'hashTags';

        type dataType = Record<dataKeyType, any>;

        const targetData: dataType = response.data; // response.data.contents.page[0];

        // 임시 데이터 테스트
        // const targetData: dataType = {
        //   memberId: 1,
        //   studyId: 1,
        //   title: 'asf',
        //   content: 'af',
        //   studyOrganizer: 'HongJungKim-dev', // TODO 배포 임시 데이터 제거
        //   studyStatus: 'RECRUITING',
        //   createdAt: '2022-09-08T19:56:13',
        //   startDate: '2022-09-08',
        //   endDate: '2022-09-08',
        //   currentStudyMemberCount: 1,
        //   maxStudyMemberCount: 3,
        //   progressOfStudy: 'ONLINE',
        //   district: 'SEOUL',
        //   commentCount: 4,
        //   viewCount: 30,
        //   likeCount: 4,
        //   likeClicked: 'FALSE',
        //   // hashTags: [
        //   //   {
        //   //     studyId: 1,
        //   //     tagName: 'Crong',
        //   //   },
        //   //   {
        //   //     studyId: 1,
        //   //     tagName: 'Honnux',
        //   //   },
        //   //   {
        //   //     studyId: 1,
        //   //     tagName: 'Jay',
        //   //   },
        //   //   {
        //   //     studyId: 1,
        //   //     tagName: 'JJKK',
        //   //   },
        //   //   {
        //   //     studyId: 1,
        //   //     tagName: 'Jun',
        //   //   },
        //   //   {
        //   //     studyId: 1,
        //   //     tagName: 'Wang',
        //   //   },
        //   // ],
        // };

        // const targetData: dataType = {
        //   id: 1,
        //   nickName: 'Junb',
        //   myId: 100, // TODO: check
        //   title: 'backend',
        //   content: 'backend',
        //   studyOrganizer: 'Jun',
        //   studyStatus: 'RECRUITING',
        //   createdAt: '2022-08-26T07:47:27',
        //   startDate: '2022-08-26',
        //   endDate: '2022-08-26',
        //   currentStudyMemberCount: 2,
        //   maxStudyMemberCount: 5,
        //   progressOfStudy: 'ONLINE',
        //   district: 'SEOUL',
        //   commentCount: 1,
        //   viewCount: 1,
        //   likeCount: 1,
        //   likeClicked: 'FALSE',
        //   hashTags: [
        //     { studyId: 1, tagName: 'java' },
        //     { studyId: 2, tagName: 'javascript' },
        //   ],
        // };

        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;

        // const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        //   targetData;

        const {
          studyId,
          title,
          memberId,
          content,
          studyOrganizer,
          studyStatus,
          progressOfStudy,
          commentCount,
          viewCount,
          likeCount,
          createdAt,
          maxStudyMemberCount,
          currentStudyMemberCount,
          startDate,
          endDate,
        } = targetData;
        // myId,
        // nickName,
        // TODO: API
        // const { id, nickName, title, content, likeClicked, studyOrganizer, studyStatus, progressOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        // targetData;
        // isWriter: studyOrganizer === nickName

        // eslint-disable-next-line prefer-destructuring
        // const hashTags: tagType[] = targetData.hashTags;
        // const tags = hashTags?.map(({ studyId, tagName }) => ({
        //   id: studyId,
        //   content: `#${tagName}`,
        // }));

        type tagDataKeyType = 'hashTagResponses';
        type tagDataType = Record<tagDataKeyType, any>;
        const tagResponse: tagDataType = await axios.get(`${process.env.END_POINT}api/tags/study/${currentId}`);

        // const tagResponse = [
        //   {
        //     studyId: 1,
        //     tagName: 'backend',
        //   },
        // ];

        const hashTags: tagType[] = tagResponse.hashTagResponses;
        const tags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: `#${tagName}`,
        }));

        const currentStudy = {
          id: studyId,
          nickName: studyOrganizer, // TODO 배포 nickName은 추후 헤더에서 얻어오기
          memberId,
          studyOrganizer,
          title,
          time: timeForToday(createdAt),
          content,
          tags,
          infos: [
            {
              id: 1,
              type: 'start',
              content: `${startDate}`,
            },
            {
              id: 2,
              type: 'studyWay',
              content: progressOfStudy,
            },
            {
              id: 3,
              type: 'limit',
              content: `${maxStudyMemberCount}`,
            },
            {
              id: 4,
              type: 'end',
              content: `${endDate}`,
            },
          ],
          commentCount,
          viewCount,
          likeCount,
          isRecruiting: studyStatus === 'RECRUITING',
          createdDate: timeForToday(createdAt),
          currentStudyMemberCount,
          maxStudyMemberCount,
          isAuthorized: true, // studyOrganizer === 'devjun10', // nickName은 추후 헤더에서 얻어오기
        };

        setShowingLikeCount(currentStudy.likeCount);
        setIsStudyRecruiting(currentStudy.isRecruiting);

        setStudy(() => currentStudy);

        const isLiked = targetData.likeClicked !== 'FALSE';
        setIsShowingLiked(isLiked);
        // const response = {
        //   data: {
        //     comments: [
        //       {
        //         commentId: 1,
        //         writerId: 1,
        //         writerGithubId: 'devjun10',
        //         profileImage: 'www.naver.com',
        //         content: 'sfasdf',
        //         reactions: [
        //           {
        //             memberIds: [2, 3, 100],
        //             commentReactionId: '1',
        //             emotion: '::heart::',
        //             reactionCount: 1,
        //           },
        //         ],
        //         createdAt: '2022-09-08T20:44:45',
        //         lastModifiedAt: '',
        //         reCommentCount: 26,
        //       },
        //       {
        //         commentId: 2,
        //         writerId: 1,
        //         writerGithubId: 'devjun10',
        //         profileImage: 'www.naver.com',
        //         content: 'sfasdf',
        //         reactions: [
        //           {
        //             memberIds: [2, 3],
        //             commentReactionId: '1',
        //             emotion: '::heart::',
        //             reactionCount: 1,
        //           },
        //         ],
        //         createdAt: '2022-09-08T20:44:45',
        //         lastModifiedAt: '2022-09-08T20:44:46',
        //         reCommentCount: 25,
        //       },
        //       {
        //         commentId: 3,
        //         writerId: 1,
        //         writerGithubId: 'devjun10',
        //         profileImage: 'www.naver.com',
        //         content: 'sdf',
        //         reactions: [],
        //         createdAt: '2022-09-08T20:44:45',
        //         lastModifiedAt: '2022-09-08T20:44:46',
        //         reCommentCount: 21,
        //       },
        //     ],
        //   },
        // };
        // type apiCommentType = typeof response.data.comments[0];

        // // const apiComments: apiCommentType[] = response.data.comments;
        // const apiComments: apiCommentType[] = response.data.comments;
        // const targetReactions = apiComments[0]?.reactions[0];
        // type reactionType = typeof targetReactions;

        // if (!apiComments) {
        //   return;
        // }

        // // TODO: studyMembers
        // // type apiStudyMemberType = typeof response.data.studyMembers[0];
        // // const apiMembers: apiStudyMemberType[] = response.data.studyMembers;

        // // const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
        // //   id,
        // //   nickName: githubId,
        // //   content: profileImageUrl,
        // // }));
        // // setStudyMembers(members);
        // const apiMembers = [
        //   {
        //     memberId: 1,
        //     nickName: 'devjun10',
        //     profileImageUrl: 'www.naver.com',
        //   },
        // ];
        // const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
        //   id: memberId,
        //   nickName,
        //   content: profileImageUrl,
        // }));
        // setStudyMembers(members);

        // // eslint-disable-next-line no-shadow
        // const currentReplys = apiComments.map((reply) => {
        //   // eslint-disable-next-line no-shadow
        //   const { writerGithubId, commentId, profileImage, content, lastModifiedAt, reCommentCount } = reply;
        //   // eslint-disable-next-line prefer-destructuring
        //   const reactions: reactionType[] = reply.reactions;
        //   return {
        //     id: commentId,
        //     // nickname: currentStudy.nickName,
        //     nickname: writerGithubId,
        //     time: timeForToday(createdAt),
        //     isEditied: !!lastModifiedAt,
        //     replyNum: reCommentCount,
        //     commentId: id,
        //     content,
        //     avatorSrc: profileImage,
        //     avatorAlt: `${currentStudy.nickName}-profile-image`,
        //     // eslint-disable-next-line no-shadow
        //     emojis: reactions.map(({ commentReactionId, emotion, reactionCount, memberIds }) => ({
        //       id: commentReactionId,
        //       type: emotion,
        //       value: emotion,
        //       count: reactionCount,
        //       isSelected: !!memberIds.find((memberId) => memberId === currentStudy.myId),
        //     })),
        //     // sAuthorized: currentStudy.nickName === writerGithubId,
        //     isAuthorized: !!writerGithubId,
        //     isStudyOrganizer: currentStudy.nickName === studyOrganizer,
        //     isMyComment: currentStudy.nickName === writerGithubId,
        //   };
        // });
        // // isWriter: nickNameState === writerNickName
        // // isMyComment: nickName === writerGithubId
        // // TODO: reCommentCount로 댓글 개수
        // // const newDatas = [
        // //   {
        // //     id: commentId,
        // //     nickname, // TODO: 랜딩 페이지에서 얻은 아이디와 같은지로 내 댓글인지 판단
        // //     time: '', // TODO: API : createdAt을 이용하여 구하기
        // //     isEditied: lastModifiedAt ? true : false,
        // //     // replyNum: 0,
        // //     commentId: study.id, // TODO: study Id는 랜딩페이지에서 얻은 걸로
        // //     content,
        // //     avatorSrc: profileImage,
        // //     avatorAlt: `${githubId} profile image`,
        // //     // eslint-disable-next-line no-shadow
        // //     emojis: reactions.map(({ id, emotion, reactionCount, reactionClicked, memberIds }) => ({
        // //       id,
        // //       type: emotion,
        // //       value: emotion,
        // //       count: reactionCount,
        // //       isSelected: memberIds.find((memberId) => memberId === myId) ? true : false,
        // //     })),
        // //     isAuthorized: githubId ? true : false,
        // //   };
        // // ];
        // // isWriter: nickNameState === writerNickName
        // // isMyComment: nickName === writerGithubId
        // // TODO: reCommentCount로 댓글 개수
        // setComments([...currentReplys]);
        // setCurrentComments([...currentReplys]);
      } catch (error: any) {
        console.log(error);
      }
    };

    setIsStudyLoading(true);

    getStudy();

    setTimeout(() => {
      setIsStudyLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(`${process.env.END_POINT}api/comments/study/${currentId}?page=0&size=10&sortOrder=CURRENT`);
      // console.log('res.data.content');
      // console.log(response.data.content);
      // type apiCommentType = typeof response.data.content[0];
      // const apiComments: apiCommentType[] = response.data.content;

      // {
      //   memberIds: [2, 3, 100],
      //   commentReactionId: '1',
      //   emotion: '::heart::',
      //   reactionCount: 1,
      // },

      // const response = {
      //   data: {
      //     comments: [
      //       {
      //         commentId: 1,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '좋은 내용 공유해주셔서 감사합니다^^',
      //         reactions: [
      //           {
      //             emotion: '👀',
      //             count: 1,
      //             reactionClicked: 'FALSE',
      //           },
      //           {
      //             emotion: '🚀',
      //             count: 1,
      //             reactionClicked: 'FALSE',
      //           },
      //           {
      //             emotion: '👎',
      //             count: 1,
      //             reactionClicked: 'FALSE',
      //           },
      //           {
      //             emotion: '❤️',
      //             count: 1,
      //             reactionClicked: 'TRUE',
      //           },
      //         ],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: null,
      //         reCommentCount: 2,
      //       },
      //       {
      //         commentId: 5,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '혹시 Vue 써보신분 계실까요?',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '',
      //         reCommentCount: 2,
      //       },
      //       {
      //         commentId: 6,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '보통 스터디는 어디서 모집하세요?',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 0,
      //       },
      //       {
      //         commentId: 7,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '저도 리액트 스터디 참여하고 싶습니다!',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 0,
      //       },
      //       {
      //         commentId: 8,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: 'ㅎㅎㅎ 아닌데요~',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 0,
      //       },
      //       {
      //         commentId: 9,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '와 ㅋㅋ 이렇게도 static을 쓸 수 있구나',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 2,
      //       },
      //       {
      //         commentId: 10,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '스터디 모집신청합니다! 확인부탁드려요',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 0,
      //       },
      //       {
      //         commentId: 11,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: '저 어제 늦게 자버렸어요 ㅜㅜ',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 0,
      //       },
      //       {
      //         commentId: 12,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: 'sdf',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 0,
      //       },
      //       {
      //         commentId: 13,
      //         writerId: 1,
      //         writer: 'devjun10',
      //         profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
      //         content: 'sfasdf',
      //         reactions: [],
      //         createdAt: '2022-09-08T20:44:45',
      //         lastModifiedAt: '2022-09-08T20:44:46',
      //         reCommentCount: 2,
      //       },
      //     ],
      //     first: true,
      //     last: true,
      //     sorted: false,
      //     empty: false,
      //     hasNext: false,
      //   },
      // };
      type apiCommentType = typeof response.data.content[0];

      const apiComments: apiCommentType[] = response.data.content;

      const targetReactions = apiComments[0]?.reactions[0];
      type reactionType = typeof targetReactions;

      if (!apiComments) {
        return;
      }

      // TODO: studyMembers
      // type apiStudyMemberType = typeof response.data.studyMembers[0];
      // const apiMembers: apiStudyMemberType[] = response.data.studyMembers;

      // const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
      //   id,
      //   nickName: githubId,
      //   content: profileImageUrl,
      // }));
      // setStudyMembers(members);

      // const apiMembers = [
      //   {
      //     memberId: 1,
      //     nickName: 'devjun10',
      //     profileImageUrl: 'www.naver.com',
      //   },
      // ];
      // const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
      //   id: memberId,
      //   nickName,
      //   content: profileImageUrl,
      // }));
      // setStudyMembers(members);

      // {
      //   memberIds: [2, 3],
      //   commentReactionId: '1',
      //   emotion: '::heart::',
      //   reactionCount: 1,
      // },

      // TODO API 주석 풀기
      const { sorted, first, last, empty, hasNext } = response.data;

      setContentControls({
        sorted,
        first,
        last,
        empty,
        hasNext,
      });

      // eslint-disable-next-line no-shadow
      const currentReplys = apiComments.map((reply) => {
        // eslint-disable-next-line no-shadow
        const { writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
        // eslint-disable-next-line prefer-destructuring
        const reactions: reactionType[] = reply.reactions;

        return {
          id: commentId,
          // nickname: currentStudy.nickName,
          nickname: writer, // writerGithubId가 nickName으로 바뀐것 같다.
          writerId,
          time: timeForToday(createdAt),
          isEditied: new Date(createdAt).getTime() < new Date(lastModifiedAt).getTime(),
          replyNum: reCommentCount,
          commentId,
          content,
          avatorSrc: profileImage,
          avatorAlt: `${study?.nickName}-profile-image`,
          // eslint-disable-next-line no-shadow
          emojis: reactions.map(({ emotion, count, reactionClicked }, index) => ({
            id: index + 1,
            type: emotion,
            value: emotion,
            count,
            isSelected: reactionClicked !== 'FALSE',
          })),
          // sAuthorized: currentStudy.nickName === writerGithubId,
          isAuthorized: !!study?.memberId,
          isStudyOrganizer: false, // study?.nickName === study?.studyOrganizer,
          isMyComment: true, // writerId === study?.memberId, // study?.nickName === writerGithubId, // TODO: study?.nickName이 댓글쪽에서 주는걸로 백엔드에서 변경해주심
        };
      });

      setComments([...currentReplys]);
      setCurrentComments([...currentReplys]);
    };

    setIsCommentLoading(true);

    getComments();

    setTimeout(() => {
      setIsCommentLoading(false);
    }, 1000);
    // TODO: study 정보를 백엔드에서 주시면 배열에서 삭제
  }, []);

  useEffect(() => {
    const getDatas = async () => {
      const res = await axios.get(`${process.env.END_POINT}api/comments/study/${currentId}?page=0&size=10&sortOrder=CURRENT`);
    };
    // getDatas();
  }, []);

  useEffect(() => {
    // TODO: studyMembers
    const getStudyMembers = async () => {
      const res = await axios.get(`${process.env.END_POINT}api/members/study/${currentId}`);
      // console.log(res.data.studyMembers);
      // res.studyMembers
      type apiMemberType = typeof res.data.studyMembers[0];
      const apiMembers: apiMemberType[] = res.data.studyMembers;
      // const apiMembers = [
      //   {
      //     memberId: 1,
      //     nickName: 'devjun10',
      //     profileImageUrl: 'www.naver.com',
      //   },
      // ];
      const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
        id: memberId,
        nickName,
        content: profileImageUrl,
      }));
      setStudyMembers(members);
      // type apiStudyMemberType = typeof response.data.studyMembers[0];
      // const apiMembers: apiStudyMemberType[] = response.data.studyMembers;
      // const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
      //   id,
      //   nickName: githubId,
      //   content: profileImageUrl,
      // }));
      // setStudyMembers(members);
    };
    getStudyMembers();
  }, []);

  useEffect(() => {
    const getEmotions = async () => {
      const EMOTION_URL = 'api/reactions';
      try {
        const response = await axios.get(`${process.env.END_POINT}${EMOTION_URL}`);

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
    // getEmotions();
  }, []);

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  const handleClickToggleLike = () => {
    const postLikePosting = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${currentId}/likes`, undefined, {
          headers,
        });
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

    if (study) {
      setShowingLikeCount(isShowingLiked ? showingLikeCount - 1 : showingLikeCount + 1);
    }

    postLikePosting();

    setIsShowingLiked(!isShowingLiked);
  };

  const handleClickEdit = () => {
    navigate(`/edit/${study?.id}`);
  };

  const deleteCurrentStudy = () => {
    const deleteStudy = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const headers = {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.delete(`${process.env.END_POINT}api/studies/${currentId}`, { headers });

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
    deleteStudy();
    navigate('/api/studies');
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleToggleProgress = () => {
    // TODO: 모집상태 변경 API 요청
    setIsStudyRecruiting(!study?.isRecruiting);
  };

  const handleClickRegister = () => {
    const postStudySignUp = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const data = {
        memberId: 1,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };

      console.log(headers);
      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${currentId}/studyRequest`, undefined, { headers });

        console.log(response);
      } catch (error: any) {
        console.log(error);

        if (error.response.status === 401) {
          console.log('401 error');
          return;
        }

        if (error.response.status === 404) {
          console.log('404 error');
          return;
        }

        if (error.response.status === 500) {
          console.log('500 error');
        }
      }
    };
    postStudySignUp();
  };

  // TODO : custom hook으로 수정하기
  const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (!target) {
      return;
    }

    entries.forEach((entry) => {
      // TODO: 주석풀기
      if (!contentControls?.hasNext) {
        return;
      }

      // if (contentPageIdx > lastPageIdx) {
      //   return;
      // }

      if (entry.isIntersecting) {
        observer.unobserve(target);

        const addData = async () => {
          const response = await axios.get(`${process.env.END_POINT}api/comments/study/${currentId}?page=${contentPageIdx}&size=10&sortOrder=CURRENT`);
          // const apiComments = [
          //   {
          //     commentId: 111,
          //     writerId: 1,
          //     writer: 'devjun10',
          //     profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
          //     content: '좋은 내용 공유해주셔서 감사합니다^^',
          //     reactions: [
          //       {
          //         emotion: '👀',
          //         count: 1,
          //         reactionClicked: 'FALSE',
          //       },
          //       {
          //         emotion: '🚀',
          //         count: 1,
          //         reactionClicked: 'FALSE',
          //       },
          //       {
          //         emotion: '👎',
          //         count: 1,
          //         reactionClicked: 'FALSE',
          //       },
          //       {
          //         emotion: '❤️',
          //         count: 1,
          //         reactionClicked: 'TRUE',
          //       },
          //     ],
          //     createdAt: '2022-09-08T20:44:45',
          //     lastModifiedAt: null,
          //     reCommentCount: 2,
          //   },
          //   {
          //     commentId: 555,
          //     writerId: 1,
          //     writer: 'devjun10',
          //     profileImage: 'https://avatars.githubusercontent.com/u/92818747?s=400&amp;v=4',
          //     content: '혹시 Vue 써보신분 계실까요?',
          //     reactions: [],
          //     createdAt: '2022-09-08T20:44:45',
          //     lastModifiedAt: '',
          //     reCommentCount: 2,
          //   },
          // ];

          type apiCommentType = typeof response.data.content[0];

          const apiComments: apiCommentType[] = response.data.content;

          const targetReactions = apiComments[0]?.reactions[0];
          type reactionType = typeof targetReactions;

          const currentReplys = apiComments.map((reply) => {
            // eslint-disable-next-line no-shadow
            const { writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
            // eslint-disable-next-line prefer-destructuring

            const { reactions } = reply;

            return {
              id: commentId,
              // nickname: currentStudy.nickName,
              nickname: writer, // writerGithubId가 nickName으로 바뀐것 같다.
              writerId,
              time: timeForToday(createdAt),
              isEditied: !!lastModifiedAt,
              replyNum: reCommentCount,
              commentId,
              content,
              avatorSrc: profileImage,
              avatorAlt: `${study?.nickName}-profile-image`,
              // eslint-disable-next-line no-shadow
              emojis: reactions.map(({ emotion, count, reactionClicked }: reactionType, index: number) => ({
                id: index + 1,
                type: emotion,
                value: emotion,
                count,
                isSelected: reactionClicked !== 'FALSE',
              })),
              // sAuthorized: currentStudy.nickName === writerGithubId,
              isAuthorized: !!study?.memberId,
              isStudyOrganizer: false, // study?.nickName === study?.studyOrganizer,
              isMyComment: true, // writerId === study?.memberId, // study?.nickName === writerGithubId, // TODO: study?.nickName이 댓글쪽에서 주는걸로 백엔드에서 변경해주심
            };
          });

          setComments(() => [...comments, ...currentReplys]);
        };

        setIsLoading(true);

        addData();

        setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        setContentPageIdx(contentPageIdx + 1);

        observer.observe(target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

  // TODO : custom hook으로 수정하기
  useEffect(() => {
    if (!target) {
      return;
    }

    observer.observe(target);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(target);
  }, [target, onIntersect, observer]);

  const handleClickCancel = () => {};

  const handleClickConfirm = () => {
    deleteCurrentStudy();
  };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <S.Container>
        {isStudyLoading ? (
          <S.LoadingContainer>
            <LoadingSpinner />
          </S.LoadingContainer>
        ) : (
          <>
            <S.TitleContainer>
              <S.Flex>
                <S.FlexBox>
                  <S.CustomLabel mode="accent" size="medium">
                    {study?.isRecruiting ? '모집중' : '모집완료'}
                  </S.CustomLabel>
                  <S.CustomCommentLabel isMyComment={false} isStudyOrganizer={study?.studyOrganizer === study?.nickName} nickname={study?.studyOrganizer || '닉네임'} />
                  <S.Day>{study?.createdDate || '2022-09-08'}</S.Day>
                  <S.Count count={study?.viewCount || 0}>
                    <Icon mode="views" />
                  </S.Count>
                </S.FlexBox>
                {study?.isAuthorized && (
                  <div>
                    <Button size="small" handleClick={handleClickEdit}>
                      수정
                    </Button>
                    <S.DeleteButton size="small" handleClick={handleClickDelete}>
                      삭제
                    </S.DeleteButton>
                  </div>
                )}
              </S.Flex>
            </S.TitleContainer>
            <S.Title>{study?.title}</S.Title>
            <S.HorizontalDivider direction="horizontal" />
            <S.Content>{study?.content || '성실하게 스터디하실 분 찾습니다. 성실하게 스터디하실 분 찾습니다. 성실하게 스터디하실 분 찾습니다.'}</S.Content>
            {study?.tags && <S.CustomLabelList mode="default" size="small" items={study?.tags} />}
            <S.ControlsContainer>
              {study?.studyOrganizer === study?.nickName &&
                (isStudyRecruiting ? (
                  <Button mode="accent" size="medium" handleClick={handleToggleProgress}>
                    모집완료 설정
                  </Button>
                ) : (
                  <Button size="medium" handleClick={handleToggleProgress}>
                    모집완료 해제
                  </Button>
                ))}
              {study?.studyOrganizer !== study?.nickName &&
                (isStudyRecruiting ? (
                  <Button mode="accent" size="medium" handleClick={handleClickRegister}>
                    참여신청
                  </Button>
                ) : (
                  <Button mode="accent" size="medium" disabled>
                    모집완료
                  </Button>
                ))}
              <S.CustomLikeButton mode="default" size="medium" handleClick={handleClickToggleLike} isSelected={isShowingLiked}>
                <S.CustomLikeIconCountBox count={showingLikeCount}>
                  <Icon mode="thumbsUp" />
                </S.CustomLikeIconCountBox>
              </S.CustomLikeButton>
              <span style={{ position: 'relative' }} onFocus={handleMouseOver} onBlur={handleMouseOut} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <S.PopUp isHovered={isMouseOvered}>
                  {studyMembers.map((item) => (
                    <S.EmojiItem key={`items-${item.id}-${item.content}`}>
                      <S.UserContainer>
                        <S.CustomAvatar src={item.content} alt="" />
                        <Title title={item.nickName} />
                      </S.UserContainer>
                    </S.EmojiItem>
                  ))}
                </S.PopUp>
                <S.CustomButton mode="default" size="medium">
                  <S.CustomIconCountBox count={`${study?.currentStudyMemberCount}/${study?.maxStudyMemberCount}`}>
                    <Icon mode="users" />
                  </S.CustomIconCountBox>
                </S.CustomButton>
              </span>
            </S.ControlsContainer>
          </>
        )}
        <S.CustomCommentWrite
          id="comment"
          writerId={study?.memberId}
          studyId={study?.id}
          isAuthorized={!!userInfos.memberId}
          placeholder=""
          avatorSrc={userInfos.profileImage || ''}
          avatorAlt=""
          nickname={study?.nickName}
          studyOrganizer={study?.studyOrganizer}
        />
        <S.CommentCount>댓글 {currentComments?.length}개</S.CommentCount>
        {isCommentLoading ? (
          <S.LoadingContainer>
            <LoadingSpinner />
          </S.LoadingContainer>
        ) : (
          <S.ReplyContainer>
            {currentComments.map(({ id, commentId, writerId, nickname, time, isEditied, replyNum, avatorSrc, avatorAlt, emojis, isAuthorized, isStudyOrganizer, isMyComment }, index) => (
              <li key={`reply-${id}`}>
                <Comment
                  id={Number(commentId)}
                  studyId={currentId}
                  myMemberId={study?.memberId}
                  writerId={writerId}
                  nickname={nickname}
                  time={time}
                  isEditied={isEditied}
                  // replyNum={replyNum}
                  content={currentComments[index].content}
                  avatorSrc={avatorSrc}
                  avatorAlt={avatorAlt}
                  emojis={emojis}
                  isAuthorized={isMyComment}
                  isStudyOrganizer={isStudyOrganizer}
                  isMyComment={isMyComment}
                  // writer={study?.nickName || '닉네임'}
                  studyOrganizer={study?.studyOrganizer}
                />
              </li>
            ))}
            <div ref={(currentTarget) => setTarget(currentTarget)} />
          </S.ReplyContainer>
        )}
        {isLoading && (
          <S.LoadingContainer>
            <LoadingSpinner />
          </S.LoadingContainer>
        )}
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <DoubleButtonModalArea handleClickLeftButton={handleClickCancel} handleClickRightButton={handleClickConfirm}>
              스터디 삭제
              <h3>스터디를 삭제하시겠습니까?</h3>
              {BUTTON_CANCEL}
              {BUTTON_CONFIRM}
            </DoubleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </Layout>
  );
};

export default Detail;
