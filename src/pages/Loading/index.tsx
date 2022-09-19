import LoadingSpinner from '@components/common/LoadingSpinner';
import StyledContainer from '@pages/Loading/style';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';

const Loading = () => {
  // eslint-disable-next-line no-unused-vars
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const location = useLocation();
  const navigate = useNavigate();
  const CALL_BACK_URL = 'api/oauth/callback/github?code=';

  useEffect(() => {
    const codeDate = location.search;
    const code = codeDate.split('code=')[1];
    const getToken = async (currentCode: string) => {
      try {
        const response = await axios.get(`${process.env.END_POINT}${CALL_BACK_URL}${currentCode}`);

        const { memberid, notification, profileimage, refreshtoken } = response.headers;
        // eslint-disable-next-line no-unused-vars

        const newToken = response.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        const refreshToken = refreshtoken;
        localStorage.setItem('refreshToken', refreshToken);

        setUserInfos({
          memberId: Number(memberid),
          notification: notification !== 'false',
          profileImage: profileimage,
        });

        navigate('/');
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log('401 error');
          return;
        }
        if (error.response.status === 404) {
          console.log('404 error');
          return;
        }

        if (error.response.status === 500) {
          console.log('500 error');
        }
      }
    };

    getToken(code);
  }, []);

  return (
    <StyledContainer>
      <LoadingSpinner size="large" />
    </StyledContainer>
  );
};

export default Loading;
