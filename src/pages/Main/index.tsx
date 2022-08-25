import Layout from '@components/Layout';
import Posting from '@components/Posting';
import { postings, progressTabs, tabs } from '@components/mocks';
import * as S from '@pages/Main/styled';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';

const Main = () => {
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [selectedProgressTabId, setSelectedProgressTabId] = useState(0);

  useEffect(() => {
    // TODO: 서버요청으로 postings받아오기
    setStudies(postings);
  }, []);

  const handleClickProgressTab = (selectedId: number) => {
    setSelectedProgressTabId(selectedId);
  };

  const handleClickTab = (selectedId: number) => {
    setSelectedTabId(selectedId);
  };

  const handleClickPosting = () => {};

  return (
    <Layout>
      <S.Container>
        <S.CustomProgressTabsContainer>
          <S.CustomProgressTabs
            tabs={progressTabs}
            selectedTabId={selectedProgressTabId}
            handleClick={handleClickProgressTab}
          />
        </S.CustomProgressTabsContainer>
        <S.CustomTabs
          tabs={tabs}
          selectedTabId={selectedTabId}
          handleClick={handleClickTab}
        />
        <S.PostingContainer>
          {studies.map(
            ({
              id,
              nickName,
              time,
              title,
              isRecruiting,
              infos,
              viewCount,
              likeCount,
              commentCount,
              content,
              tags,
            }) => (
              <S.CustomLink to={`/detail/${id}`}>
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
            )
          )}
        </S.PostingContainer>
      </S.Container>
    </Layout>
  );
};

export default Main;
