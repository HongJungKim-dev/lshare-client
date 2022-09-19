/* eslint-disable react/require-default-props */
import SearchArea from '@components/SearchArea';
import Icon from '@components/common/Icon';
import Avator from '@common/Avatar';
import { useNavigate } from 'react-router-dom';
// import AvatorDropDown from '@components/AvatorDropDown';
import options from '@components/AvatorDropDown/constants';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import SearchTag from '@components/SearchTag';
import tags from '@components/LabelList/constants';
import TabsList from '@components/TabsList';
import { useEffect, useRef, useState } from 'react';
import useMouse from '@hooks/useMouse';
import Portal from '@components/Modal/Portal';
import Modal from '@components/Modal';
import SingleButtonModalArea from '@components/Modal/SingleButtonModalArea';
import ArticleContent from '@components/Modal/SingleButtonComponents/ArticleContent';
import ButtonContent from '@components/Modal/SingleButtonComponents/ButtonContent';
import { LOGIN_TITLE, LOGIN_BUTTON_CONTENT } from '@components/Modal/constants';
import { loginExplains } from '@components/Modal/SingleButtonComponents/constants';
import userInfosState from '@store/UserInfos';
import { useRecoilState } from 'recoil';
import { INIT_PATH } from '../../constants/route';
import * as S from './style';

type HeaderProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  alt?: string;
  type: string;
};

const Header = ({ className, type, alt = '' }: HeaderProps) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies] = useCookies(['refreshToken']);
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelect = (operation: string) => {
    if (operation === '로그아웃') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserInfos({
        memberId: 0,
        notification: false,
        profileImage: '',
      });
      return;
    }

    // TODO: 타입 구체화
    const redirections: any = {
      회원수정: 'memberEdit',
      스터디관리: 'studyManage',
    };
    navigate(`/${redirections[operation]}`);
  };

  const goHome = () => {
    navigate(`${INIT_PATH}`);
  };

  const handleClickLogin = () => {
    setIsModalVisible(true);
  };

  const tabs = [
    { id: 1, content: '스터디' },
    { id: 2, content: '데일리 플랜' },
  ];
  const handleClickTab = (selectedId: number) => {
    if (selectedId === 1) {
      navigate(`/api/studies`);
    } else if (selectedId === 2) {
      // TODO: 데일리플랜으로 이동
      // navigate(`/plans`);
    }
  };

  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedTag, setIsFocusedTag] = useState(false);
  const [isClickAway, setIsClickAway] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const handleFocusDefault = () => {
    setIsFocused(true);
    setIsFocusedTag(() => true);
  };

  const handleFocus = () => {
    setIsFocusedTag(() => true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleBlurTag = () => {
      if (!isClickAway) {
        return;
      }
      setIsFocused(false);
      setIsFocusedTag(false);
    };
    handleBlurTag();
  }, [isClickAway]);

  const handleBlurCurrentTag = () => {
    setIsFocusedTag(false);
  };

  useEffect(() => {
    // TODO: any 타입 구체화
    const handleClickAway = (event: any) => {
      if (event.target.closest('.tag') || event.target.closest('.search')) {
        setIsClickAway(false);
        return;
      }
      setIsClickAway(!target.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    if (isFocused || isFocusedTag) {
      return;
    }

    handleBlurCurrentTag();
  }, [isClickAway]);

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const handleClickGithubLogin = () => {
    const goGithubLogin = async () => {
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

    goGithubLogin();
  };

  const handleClickCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <S.Container className={className} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <S.FlexColumn>
          <S.FlexBetween>
            <S.CustomLogo handleClick={goHome} />
            <TabsList tabs={tabs} handleClick={handleClickTab} />
            <SearchArea id="header-search" handleFocusDefault={handleFocusDefault} handleBlur={handleBlur} isFocusedTag={isFocusedTag} />
            <S.Flex>
              <S.IconButton size="tiny" handleClick={goHome}>
                <Icon mode="home" />
              </S.IconButton>
              {userInfos.memberId ? (
                <S.CustomAvatorDropDown type={type} selectTitle="" optionsWidth="100px" options={options} handleSelect={handleSelect}>
                  <Avator src={userInfos.profileImage} alt={alt} />
                </S.CustomAvatorDropDown>
              ) : (
                <>
                  <S.LoginButton size="small" handleClick={handleClickLogin}>
                    로그인
                  </S.LoginButton>
                  <S.CustomButton mode="accent" size="small" handleClick={handleClickLogin}>
                    회원가입
                  </S.CustomButton>
                </>
              )}
            </S.Flex>
          </S.FlexBetween>
          {isFocused || isFocusedTag ? (
            <div ref={target} onFocus={handleFocus}>
              <S.CustomSearchTag id="header-search-tag" mode="tag" size="medium" />
            </div>
          ) : (
            isMouseOvered && (
              <S.SearchTagContainer>
                <SearchTag id="header-search-default-tag" mode="default" tags={tags} />
              </S.SearchTagContainer>
            )
          )}
        </S.FlexColumn>
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <SingleButtonModalArea size="xlarge" handleClick={handleClickGithubLogin} handleClickCancel={handleClickCancel}>
              {LOGIN_TITLE}
              <ArticleContent items={loginExplains} />
              <ButtonContent content={LOGIN_BUTTON_CONTENT} />
            </SingleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </>
  );
};

export default Header;
