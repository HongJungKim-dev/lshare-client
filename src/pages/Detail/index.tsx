import Layout from '@components/Layout';
import Comment from '@components/Comment';
import useMouse from '@hooks/useMouse';
import Title from '@components/common/Title';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import { useParams, useNavigate } from 'react-router-dom';
import replys from '@components/Comment/constants';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import { useState } from 'react';
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
  const myName = '이든';
  // eslint-disable-next-line no-unused-vars
  const [studies, setStudies] = useRecoilState(studiesState);
  const currentStudy = studies.filter((study) => study.id === Number(id));
  const {
    nickName,
    title,
    viewCount,
    likeCount,
    commentCount,
    isRecruiting,
    content,
    tags,
    createdDate,
  } = currentStudy[0];
  const isLiked = true;
  const [isStudyRecruiting, setIsStudyRecruiting] = useState(isRecruiting);
  const [showingLikeCount, setShowingLikeCount] = useState(likeCount);
  const [isShowingLiked, setIsShowingLiked] = useState(isLiked);

  const handleClickToggleLike = () => {
    setShowingLikeCount(
      isShowingLiked ? showingLikeCount - 1 : showingLikeCount + 1
    );

    setIsShowingLiked(!isShowingLiked);
  };

  const handleClickEdit = () => {
    navigate(`/edit/${currentStudy[0]?.id}`);
  };

  const handleClickDelete = () => {
    // TODO: 글삭제 API 요청
    navigate('/main');
  };

  const handleToggleProgress = () => {
    // TODO: 모집상태 변경 API 요청
    setIsStudyRecruiting(!isStudyRecruiting);
  };

  const handleClickRegister = () => {
    // TODO: 모집신청 API 요청
  };

  return (
    <Layout>
      <S.Container>
        <S.TitleContainer>
          <S.CustomLabel mode="accent" size="medium">
            {isStudyRecruiting ? '모집중' : '모집완료'}
          </S.CustomLabel>
          <S.Title>{title}</S.Title>
          <S.ControllButton
            mode="tiny"
            size="tiny"
            handleClick={handleClickEdit}
          >
            <Icon mode="edit" />
          </S.ControllButton>
          <S.ControllButton
            mode="tiny"
            size="tiny"
            handleClick={handleClickDelete}
          >
            <Icon mode="cancel" />
          </S.ControllButton>
        </S.TitleContainer>
        <S.FlexBox>
          <S.CustomCommentLabel isWriter nickname={nickName} />
          <S.Day>{createdDate}</S.Day>
          <S.Count count={viewCount}>
            <Icon mode="views" />
          </S.Count>
        </S.FlexBox>
        <S.Content>{content}</S.Content>
        <S.CustomLabelList mode="default" size="small" items={tags} />
        <S.ControlsContainer>
          {myName === nickName &&
            (isStudyRecruiting ? (
              <Button
                mode="accent"
                size="medium"
                handleClick={handleToggleProgress}
              >
                모집완료 설정
              </Button>
            ) : (
              <Button size="medium" handleClick={handleToggleProgress}>
                모집완료 해제
              </Button>
            ))}
          {myName !== nickName &&
            (isStudyRecruiting ? (
              <Button
                mode="accent"
                size="medium"
                handleClick={handleClickRegister}
              >
                참여신청
              </Button>
            ) : (
              <Button mode="accent" size="medium" disabled>
                모집완료
              </Button>
            ))}
          <S.CustomLikeButton
            mode="default"
            size="medium"
            handleClick={handleClickToggleLike}
            isSelected={isShowingLiked}
          >
            <S.CustomLikeIconCountBox count={showingLikeCount}>
              <Icon mode="thumbsUp" />
            </S.CustomLikeIconCountBox>
          </S.CustomLikeButton>
          <span
            style={{ position: 'relative' }}
            onFocus={handleMouseOver}
            onBlur={handleMouseOut}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <S.PopUp isHovered={isMouseOvered}>
              {items.map((item) => (
                <S.EmojiItem key={`items-${item.id}-${item.content}`}>
                  <S.UserContainer>
                    <S.CustomAvatar src={item.content} alt="" />
                    <Title title={item.nickName} />
                  </S.UserContainer>
                </S.EmojiItem>
              ))}
            </S.PopUp>
            <S.CustomButton mode="default" size="medium">
              <S.CustomIconCountBox count={peoples}>
                <Icon mode="users" />
              </S.CustomIconCountBox>
            </S.CustomButton>
          </span>
        </S.ControlsContainer>
        <S.CustomCommentWrite
          id="comment"
          isAuthorized
          placeholder=""
          avatorSrc=""
          avatorAlt=""
        />
        <S.CommentCount>댓글 {commentCount}개</S.CommentCount>
        <S.ReplyContainer>
          {replys.map(
            (
              {
                nickname,
                time,
                isEditied,
                replyNum,
                commentId,
                avatorSrc,
                avatorAlt,
                emojis,
                isAuthorized,
              },
              index
            ) => (
              <li key={`reply-${replys[index].id}`}>
                <Comment
                  nickname={nickname}
                  time={time}
                  isEditied={isEditied}
                  replyNum={replyNum}
                  commentId={commentId}
                  content={replys[index].content}
                  avatorSrc={avatorSrc}
                  avatorAlt={avatorAlt}
                  emojis={emojis}
                  isAuthorized={isAuthorized}
                  writer={nickName}
                />
              </li>
            )
          )}
        </S.ReplyContainer>
      </S.Container>
    </Layout>
  );
};

export default Detail;
