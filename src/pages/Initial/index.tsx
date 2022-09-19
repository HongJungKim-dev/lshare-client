import Layout from '@components/Layout';
import { useEffect, useState } from 'react';
import IconCountBox from '@components/IconCountBox';
import Icon from '@components/common/Icon';
import Carousel from '@components/Carousel';
import { items as carouselItems } from '@components/Carousel/constants';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { LoadingContainer } from '@pages/Detail/style';
// import { postings } from '@components/mocks';

import * as S from './style';

const Initial = () => {
  // eslint-disable-next-line no-unused-vars
  const [studies, setStudies] = useRecoilState(studiesState);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const [isStudyLoading, setIsStudyLoading] = useState(false);

  const handleClickMore = () => {
    if (!contentControls?.hasNext) {
      return;
    }

    setCurrentPageIndex(currentPageIndex + 1);
  };

  useEffect(() => {
    // TODO: 메인 페이지와 중복 제거
    const setDatas = async () => {
      // TODO: 주석풀기
      const url = `api/studies/landing?page=${currentPageIndex}&size=10&sortOrder=CURRENT`;
      // const url = `api/studies/landing?page=${currentPageIndex}&pageSzie=10&sortOrder=CURRENT`;
      const response = await axios.get(`${process.env.END_POINT}${url}`);

      // console.log('메인 페이지');
      // console.log(response.data.response);

      // 임시 데이터 테스트
      // const response = {
      //   data: {
      //     response: {
      //       githubId: 'devjun10',
      //       content: [
      //         {
      //           id: 1,
      //           title: 'asf',
      //           content: 'af',
      //           studyOrganizer: 'devjun10',
      //           studyStatus: 'RECRUITING',
      //           hashTags: null,
      //           createdAt: '2022-09-08T19:56:13',
      //           startDate: '2022-09-08',
      //           endDate: '2022-09-08',
      //           currentStudyMemberCount: 1,
      //           maxStudyMemberCount: 3,
      //           progressOfStudy: 'ONLINE',
      //           district: 'SEOUL',
      //           commentCount: 0,
      //           viewCount: 1,
      //           likeCount: 0,
      //         },
      //       ],
      //       first: true,
      //       last: true,
      //       sorted: false,
      //       empty: false,
      //       hasNext: false,
      //     },
      //   },
      // };

      // try {
      //   const response = await axios.get(`${process.env.END_POINT}${url}`);

      //   if (response.status === 404) {
      //     console.log('404 error');
      //     return;
      //   }
      //   if (response.status === 500) {
      //     console.log('500 error');
      //     return;
      //   }
      // type dataKeyType =
      //   | 'id'
      //   | 'title'
      //   | 'content'
      //   | 'studyOrganizer'
      //   | 'studyStatus'
      //   | 'hashTags'
      //   | 'currentStudyMemberCount'
      //   | 'district'
      //   | 'processOfStudy'
      //   | 'commentCount'
      //   | 'viewCount'
      //   | 'likeCount'
      //   | 'createdAt'
      //   | 'maxStudyMemberCount'
      //   | 'startDate'
      //   | 'endDate'
      //   | 'meeting';
      // type dataType = Record<dataKeyType, any>;
      // const targetDatas: dataType[] = response.content;
      type apiStudiesType = typeof response.data.response.content[0];
      const apiStudies: apiStudiesType[] = response.data.response.content;
      // const targetDatas = [
      //   {
      //     id: 1,
      //     title: 'asf',
      //     content: 'af',
      //     studyOrganizer: 'devjun10',
      //     studyStatus: 'RECRUITING',
      //     hashTags: null,
      //     createdAt: '2022-09-08T19:56:13',
      //     startDate: '2022-09-08',
      //     endDate: '2022-09-08',
      //     currentStudyMemberCount: 1,
      //     maxStudyMemberCount: 3,
      //     progressOfStudy: 'ONLINE',
      //     district: 'SEOUL',
      //     commentCount: 2,
      //     viewCount: 1,
      //     likeCount: 3,
      //   },
      // ];
      // type tagKeyType = 'studyId' | 'tagName';
      // type tagType = Record<tagKeyType, any>;
      const currentPostings = apiStudies.map((targetData) => {
        // const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        //   targetData;
        const {
          studyId,
          title,
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
        // TODO: API
        /**
             *   const { id, title, content, studyOrganizer, studyStatus, processOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
            response.content;

            const { nickName } = response;
            50줄 type에서 meeting제거하기
             */
        // eslint-disable-next-line prefer-destructuring
        // const hashTags: tagType[] = targetData.hashTags;
        const hashTags = [
          { studyId: 1, tagName: 'java' },
          { studyId: 2, tagName: 'javascript' },
        ];

        // eslint-disable-next-line no-shadow
        const tags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: `#${tagName}`,
        }));

        // TODO: API : 해시태그 백엔드 미정
        return {
          id: studyId,
          nickName: studyOrganizer,
          title,
          time: createdAt.split('T')[0],
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
          createdDate: createdAt,
          currentStudyMemberCount,
          maxStudyMemberCount,
        };
      });
      setStudies(currentPostings);
      //   } catch (error: any) {
      //     console.log(error);
      //   }

      const { sorted, first, last, empty, hasNext } = response.data.response;

      setContentControls({
        sorted,
        first,
        last,
        empty,
        hasNext,
      });
    };

    setIsStudyLoading(true);

    setDatas();

    setTimeout(() => {
      setIsStudyLoading(false);
    }, 1000);
  }, [currentPageIndex]);

  return (
    <Layout>
      <S.CarouselContainer>
        <Carousel showingSlideCardNum={1}>
          {carouselItems.map(({ id, content }) => (
            <S.CarouselItem key={`content-${id}`}>{content}</S.CarouselItem>
          ))}
        </Carousel>
      </S.CarouselContainer>
      {isStudyLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <S.Container>
          <S.TitleLabel>모집중인 스터디</S.TitleLabel>
          <S.HorizontalDivider direction="horizontal" />
          <S.ItemsContainer>
            {studies.map(({ id, title, content, likeCount, commentCount, isRecruiting, tags }) => (
              <S.Item key={`initial-content-item-${id}`}>
                <S.ReactionsContainer>
                  <S.CustomLabel mode="accent" size="medium">
                    {isRecruiting ? '모집중' : '모집완료'}
                  </S.CustomLabel>
                  <IconCountBox count={likeCount}>
                    <Icon mode="thumbsUp" />
                  </IconCountBox>
                  <IconCountBox count={commentCount}>
                    <Icon mode="comment" />
                  </IconCountBox>
                </S.ReactionsContainer>
                <S.Content>
                  <S.CustomLink to={`/api/studies/${id}`}>
                    <S.CustomTitle title={title} />
                    <S.HorizontalDivider direction="horizontal" />
                    <S.CustomPostingContent content={content} clamp={3} />
                  </S.CustomLink>
                </S.Content>
                <S.TagContainer>
                  {tags.map((tag) => (
                    <S.TagItem key={`initial-page-tag-${tag.id}`}>
                      <span>{tag.content}</span>
                    </S.TagItem>
                  ))}
                </S.TagContainer>
              </S.Item>
            ))}
          </S.ItemsContainer>
        </S.Container>
      )}
      <S.MoreButtonContainer>
        {contentControls?.hasNext && (
          <S.MoreButton size="small" handleClick={handleClickMore}>
            글 더보기
          </S.MoreButton>
        )}
      </S.MoreButtonContainer>
    </Layout>
  );
};

export default Initial;
