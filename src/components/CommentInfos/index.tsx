import Avatar from '@components/common/Avatar';
import * as S from './style';

type CommentInfosProps = {
  avatorSrc: string;
  avatorAlt: string;
  nickname: string;
  time: string;
  isEdited: boolean;
  isStudyOrganizer: boolean;
  isMyComment: boolean;
};

const CommentInfos = ({ avatorSrc, avatorAlt, nickname = '닉네임', time = '10분', isEdited, isStudyOrganizer, isMyComment }: CommentInfosProps) => (
  <S.Container>
    <Avatar src={avatorSrc} alt={avatorAlt} />
    <S.CustomCommentLabel isStudyOrganizer={isStudyOrganizer} isMyComment={isMyComment} nickname={nickname} />
    <S.Time>{`${time}`}</S.Time>
    {isEdited ? <S.IsEdited>(수정됨)</S.IsEdited> : ''}
  </S.Container>
);

export default CommentInfos;
