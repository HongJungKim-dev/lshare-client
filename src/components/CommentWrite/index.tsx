/* eslint-disable react/require-default-props */
import CommentTextArea from '@components/CommentTextArea';
import { useState } from 'react';
import sizeType from '@components/types/CommentWrite';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import * as S from './style';
import { sizes, ERROR_MSG } from './constants';

type CommentWriteProps = {
  className?: string;
  id: string;
  isAuthorized: boolean;
  placeholder?: string;
  size?: sizeType;
  avatorSrc: string;
  avatorAlt: string;
  typedValue?: string;
  handleClickEdit?: () => void;
};

const CommentWrite = ({
  className,
  id,
  isAuthorized,
  placeholder = '댓글을 작성해보세요!',
  size = 'medium',
  avatorSrc,
  avatorAlt,
  typedValue = '',
  handleClickEdit,
}: CommentWriteProps) => {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [comment, setComment] = useRecoilState(commentState);

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

    // TODO: 서버 성공시 comment store에 저장하는 내용은 추후 서버가 댓글 목록 조회시 주는 데이터를 참고하여 수정, 아래는 임시 key, value
    const isWriter = true;
    const nickname = '이든';
    const time = 6;
    const isEdited = true;

    setComment([
      ...comment,
      {
        id: 100,
        isWriter,
        nickname,
        time,
        isEdited,
        content: value,
        likeNum: 0,
        reactions: [],
      },
    ]);
    // TODO: 서버 성공시 value ''으로 초기화 후에 리턴
    setValue('');
    // return

    setIsError(true);
  };

  return (
    <>
      <S.Container className={className}>
        <S.CustomAvatar
          src={avatorSrc}
          alt={avatorAlt}
          size={sizes[size].avatarSize}
        />
        <S.ContentContainer>
          <CommentTextArea
            id={id}
            isAuthorized={isAuthorized}
            size={sizes[size].commentSize}
            placeholder={placeholder}
            value={value || typedValue}
            handleChangeValue={handleChangeValue}
          />
        </S.ContentContainer>
      </S.Container>

      <S.ButtonContainer size={size}>
        <S.ErrorMsg>{isError ? ERROR_MSG : ''}</S.ErrorMsg>
        <div>
          <S.CustomButton
            size={sizes[size].buttonSize}
            handleClick={handleClickCancelComment}
            disabled={!value}
          >
            취소
          </S.CustomButton>
          <S.CustomButton
            mode="accent"
            size={sizes[size].buttonSize}
            handleClick={handleClickRegisterComment}
            disabled={!value}
          >
            댓글 등록
          </S.CustomButton>
        </div>
      </S.ButtonContainer>
    </>
  );
};

export default CommentWrite;
