import { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import Posting from '@components/Posting';
import { useRecoilState } from 'recoil';
import myStudiesState from '@store/MyStudies';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import timeForToday from '@pages/Detail/util';
import userInfosState from '@store/UserInfos';
import { user } from './constants';
import * as S from './style';

const MemberDetail = () => {
  const [userInfos] = useRecoilState(userInfosState);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [studies, setStudies] = useRecoilState(myStudiesState);

  useEffect(() => {
    // TODO: 서버요청으로 postings받아오기
    const getStudies = async () => {
      const { memberId } = userInfos;
      const data = {
        params: {
          memberId,
        },
      };

      const res = await axios.get(`${process.env.END_POINT}api/members/${memberId}/my-studies`, data);
      // res.data.content
      type apiStudiesType = typeof res.data.content[0];
      const apiStudies: apiStudiesType[] = res.data.content;
      // const targetDatas = [
      //   {
      //     id: 1,
      //     title: 'asf참여',
      //     content: 'af',
      //     studyOrganizer: 'devjun10',
      //     studyStatus: 'RECRUITING',
      //     hashTags: [
      //       { studyId: 1, tagName: 'java' },
      //       { studyId: 2, tagName: 'javascript' },
      //     ],
      //     createdAt: '2022-09-08T19:56:13',
      //     startDate: '2022-09-08',
      //     endDate: '2022-09-08',
      //     currentStudyMemberCount: 1,
      //     maxStudyMemberCount: 3,
      //     progressOfStudy: 'ONLINE',
      //     district: 'SEOUL',
      //     commentCount: 0,
      //     viewCount: 1,
      //     likeCount: 0,
      //   },
      // ];

      const currentPostings = apiStudies.map((targetData) => {
        // const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        //   targetData;
        const { id, title, content, studyOrganizer, studyStatus, progressOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate } = targetData;
        // TODO: API
        /**
           *   const { id, title, content, studyOrganizer, studyStatus, processOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
          response.content;

          const { nickName } = response;
          50줄 type에서 meeting제거하기
           */
        // eslint-disable-next-line prefer-destructuring
        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;
        const hashTags: tagType[] = targetData;
        // const hashTags = [
        //   { studyId: 1, tagName: 'java' },
        //   { studyId: 2, tagName: 'javascript' },
        // ];
        const tags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: tagName,
        }));

        // TODO: API : 해시태그 백엔드 미정
        return {
          id,
          nickName: studyOrganizer,
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
              content: `최대 ${maxStudyMemberCount}명`,
            },
          ],
          commentCount,
          viewCount,
          likeCount,
          isRecruiting: studyStatus === 'RECRUITING',
          createdDate: createdAt,
          currentStudyMemberCount,
          maxStudyMemberCount,
        };
      });

      setStudies(currentPostings);
    };

    getStudies();
  }, []);

  const handleClickEditProfile = () => {
    navigate('/memberEdit');
  };

  return (
    <Layout>
      <S.Container>
        <S.UserInfos>
          <Avatar src="" alt="" size="medium" />
          <S.UserInfoContainer>
            <S.UserInfo>
              <S.User>{user}</S.User>
              <Button handleClick={handleClickEditProfile}>프로필 편집</Button>
            </S.UserInfo>
            {/* <S.ItemContainer>
              {userInfos.map(({ id, content, num }) => (
                <S.Item key={`memberDetail-info-${id}`}>
                  <S.Infos>
                    {content} {num}
                  </S.Infos>
                </S.Item>
              ))}
            </S.ItemContainer> */}
          </S.UserInfoContainer>
        </S.UserInfos>
        <S.Category>참여한 스터디</S.Category>
        <S.HorizontalDivider direction="horizontal" />
        <S.PostingContainer>
          {studies.map(({ id, nickName, time, title, infos, viewCount, likeCount, commentCount, isRecruiting, content, tags }) => (
            <S.LinkContainer>
              <S.CustomLink to={`/api/studies/${id}`}>
                <S.PostingItem key={`meberDetail-posting-${id}`}>
                  <Posting
                    nickName={nickName}
                    time={time}
                    title={title}
                    infos={infos}
                    viewCount={viewCount}
                    likeCount={likeCount}
                    commentCount={commentCount}
                    isRecruiting={isRecruiting}
                    content={content}
                    tags={tags}
                  />
                </S.PostingItem>
              </S.CustomLink>
              <S.HorizontalDivider direction="horizontal" />
            </S.LinkContainer>
          ))}
        </S.PostingContainer>
      </S.Container>
    </Layout>
  );
};

export default MemberDetail;
