import { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import Posting from '@components/Posting';
import { postings, tabs } from '@components/mocks';
import { useRecoilState } from 'recoil';
import myStudiesState from '@store/MyStudies';
import { useNavigate } from 'react-router-dom';
import { user, userInfos } from './constants';
import * as S from './style';

const MemberDetail = () => {
  const navigate = useNavigate();
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [studies, setStudies] = useRecoilState(myStudiesState);

  useEffect(() => {
    // TODO: 서버요청으로 postings받아오기
    setStudies(postings);
  }, []);

  const handleClickEditProfile = () => {
    navigate('/memberEdit');
  };

  const handleClickTab = (selectedId: number) => {
    setSelectedTabId(selectedId);
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
            <S.ItemContainer>
              {userInfos.map(({ id, content, num }) => (
                <S.Item key={`memberDetail-info-${id}`}>
                  <S.Infos>
                    {content} {num}
                  </S.Infos>
                </S.Item>
              ))}
            </S.ItemContainer>
          </S.UserInfoContainer>
        </S.UserInfos>
        <S.Title>게시물</S.Title>
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
              infos,
              viewCount,
              likeCount,
              commentCount,
              isRecruiting,
              content,
              tags,
            }) => (
              <S.CustomLink to={`/detail/${id}`}>
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
            )
          )}
        </S.PostingContainer>
      </S.Container>
    </Layout>
  );
};

export default MemberDetail;
