/* eslint-disable react/require-default-props */
import { ChangeEvent } from 'react';
import sizeType from '@components/types/CommentTextArea';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { AUTHORIZED_DEFAULT_PALCEHOLDER, DEFAULT_PALCEHOLDER, DEFAULT_SIZE } from './constants';
import { INIT_PATH } from '../../constants/route';

type CommentTextAreaPropsType = {
  id: string;
  isAuthorized: boolean;
  placeholder?: string;
  size?: sizeType;
  value: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeValue: (value: string) => void;
};

const CommentTextArea = ({ id, isAuthorized, placeholder, size = DEFAULT_SIZE, value, className, handleChangeValue }: CommentTextAreaPropsType) => {
  const navigate = useNavigate();

  const handleFocus = () => {
    if (isAuthorized) {
      return;
    }

    const handleClickLogin = async () => {
      try {
        const url: AxiosResponse = await axios.get(`${process.env.END_POINT}api/oauth/login`);

        if (url.status === 404) {
          console.log('404 error');
          return;
        }
        if (url.status === 500) {
          console.log('500 error');
          return;
        }

        window.location.href = url.data;
      } catch (error: any) {
        console.log(error);
      }
    };
    handleClickLogin();
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    handleChangeValue(currentValue);
  };

  return (
    <>
      <S.Label htmlFor={id} />
      <S.CustomTextArea
        className={className}
        id={id}
        isAuthorized={isAuthorized}
        placeholder={placeholder || isAuthorized ? AUTHORIZED_DEFAULT_PALCEHOLDER : DEFAULT_PALCEHOLDER}
        size={size}
        value={value}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />
    </>
  );
};

export default CommentTextArea;
