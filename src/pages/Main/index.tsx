import Layout from '@components/Layout';
import Posting from '@components/Posting';
// import { progressTabs, tabs } from '@components/mocks';
import * as S from '@pages/Main/styled';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import axios from 'axios';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '@components/common/LoadingSpinner';
import { LoadingContainer } from '@pages/Detail/style';
import userInfosState from '@store/UserInfos';

import { WRITE_PATH } from '../../constants/route';

const Main = () => {
  const [studies, setStudies] = useRecoilState(studiesState);
  const [userInfos] = useRecoilState(userInfosState);
  // const [selectedTabId, setSelectedTabId] = useState(0);
  // const [selectedProgressTabId, setSelectedProgressTabId] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  type CotnentControlsKeyType = 'sorted' | 'requestPageSize' | 'currentPageNumber' | 'totalElementSize' | 'firstPage' | 'last' | 'empty';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const [isStudyLoading, setIsStudyLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickPageButton = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
  };

  const handleClickPrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleClickNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  useEffect(() => {
    const setDatas = async () => {
      const url = `api/studies?page=${currentPageIndex - 1}&size=10&sortOrder=CURRENT`;
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`);
        console.log('main response');
        console.log(response);
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
          return;
        }
        type dataKeyType =
          | 'studyId'
          | 'title'
          | 'content'
          | 'studyOrganizer'
          | 'studyStatus'
          | 'hashTags'
          | 'currentStudyMemberCount'
          | 'district'
          | 'meeting'
          | 'commentCount'
          | 'viewCount'
          | 'likeCount'
          | 'createdAt'
          | 'maxStudyMemberCount'
          | 'startDate'
          | 'endDate';
        type dataType = Record<dataKeyType, any>;
        const targetDatas: dataType[] = response.data.contents.page;
        const { sorted, requestPageSize, currentPageNumber, totalElementSize, firstPage, last, empty } = response.data.contents;

        setContentControls({
          sorted,
          requestPageSize,
          currentPageNumber,
          totalElementSize,
          firstPage,
          last,
          empty,
        });
        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;

        const timeForToday = (value: string) => {
          const today = new Date();
          const timeValue = new Date(value);

          const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
          if (betweenTime < 1) return '?????????';
          if (betweenTime < 60) {
            return `${betweenTime}??????`;
          }

          const betweenTimeHour = Math.floor(betweenTime / 60);
          if (betweenTimeHour < 24) {
            return `${betweenTimeHour}?????????`;
          }

          const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
          if (betweenTimeDay < 365) {
            return `${betweenTimeDay}??????`;
          }

          return `${Math.floor(betweenTimeDay / 365)}??????`;
        };

        const currentPostings = targetDatas.map((targetData) => {
          const { studyId, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate } = targetData;
          // eslint-disable-next-line prefer-destructuring
          const hashTags: tagType[] = targetData.hashTags;
          // eslint-disable-next-line no-shadow
          const tags = hashTags?.map(({ studyId, tagName }) => ({
            id: studyId,
            content: `#${tagName}`,
          }));

          return {
            id: studyId,
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
                content: meeting,
              },
              {
                id: 3,
                type: 'limit',
                content: `?????? ${maxStudyMemberCount}???`,
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
      } catch (error: any) {
        console.log(error);
      }
    };
    setIsStudyLoading(true);

    setDatas();

    setTimeout(() => {
      setIsStudyLoading(false);
    }, 1000);
  }, [currentPageIndex]);

  // const handleClickProgressTab = (selectedId: number) => {
  //   setSelectedProgressTabId(selectedId);
  // };

  // const handleClickTab = (selectedId: number) => {
  //   setSelectedTabId(selectedId);
  // };

  const handleClickPosting = () => {
    if (!userInfos.memberId) {
      // TODO: ????????? ????????? ??????
      return;
    }
    navigate(`${WRITE_PATH}`);
  };

  useEffect(() => {
    console.log(studies);
  }, [studies]);
  return (
    <Layout>
      <S.Container>
        <S.FlexBetween>
          <S.Category>?????? ?????????</S.Category>
          <Button mode="accent" size="small" handleClick={handleClickPosting}>
            ??? ??????
          </Button>
        </S.FlexBetween>
        <S.HorizontalDivider direction="horizontal" />
        {isStudyLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : (
          <S.PostingContainer>
            {!contentControls?.empty &&
              studies?.map(({ id, nickName, time, title, isRecruiting, infos, viewCount, likeCount, commentCount, content, tags }) => (
                <>
                  <S.CustomLink to={`/api/studies/${id}`}>
                    <S.PostingItem key={`main-posting-${id}`}>
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
                        handleClick={handleClickPosting}
                      />
                    </S.PostingItem>
                  </S.CustomLink>
                  <S.HorizontalDivider direction="horizontal" />
                </>
              ))}
            {contentControls?.empty && (
              <S.FlexBox>
                <S.EmptyMsg>????????? ???????????? ??????????????????!</S.EmptyMsg>
              </S.FlexBox>
            )}
            <S.CustomPagination
              showingPageButtonNum={5}
              totalPageNum={contentControls?.totalElementSize || 9}
              selectedPage={currentPageIndex}
              handleClickPageButton={handleClickPageButton}
              handleClickLeftButton={handleClickPrevPage}
              handleClickRightButton={handleClickNextPage}
            />
          </S.PostingContainer>
        )}
      </S.Container>
    </Layout>
  );
};

export default Main;
