/* eslint-disable react/require-default-props */
import SearchArea from '@components/SearchArea';
import Icon from '@components/common/Icon';
import Avator from '@common/Avatar';
import { useNavigate } from 'react-router-dom';
import AvatorDropDown from '@components/AvatorDropDown';
import options from '@components/AvatorDropDown/constants';
import * as S from './style';

type HeaderProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  isLogined?: boolean;
  src?: string;
  alt?: string;
};

const Header = ({
  className,
  isLogined = true,
  src = '',
  alt = '',
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleSelect = (operation: string) => {
    // TODO: 타입 구체화
    const redirections: any = {
      회원수정: 'memberEdit',
      스터디관리: 'studyManage',
    };
    navigate(`/${redirections[operation]}`);
  };

  return (
    <S.Container className={className}>
      <S.CustomLogo />
      <SearchArea id="header-search" />
      <S.IconButton size="tiny">
        <Icon mode="home" />
      </S.IconButton>
      {isLogined ? (
        <AvatorDropDown
          selectTitle=""
          optionsWidth="100px"
          options={options}
          handleSelect={handleSelect}
        >
          <Avator src={src} alt={alt} />
        </AvatorDropDown>
      ) : (
        <S.CustomButton mode="accent" size="small">
          로그인
        </S.CustomButton>
      )}
    </S.Container>
  );
};

export default Header;
