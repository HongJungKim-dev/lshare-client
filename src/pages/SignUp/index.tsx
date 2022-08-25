// import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Layout from '@components/Layout';
import options from './constants';
import * as S from './style';

const SignUp = () => (
  <Layout>
    <S.Container>
      <S.TitleContainer>
        <S.Title>회원가입</S.Title>
      </S.TitleContainer>
      <S.CustomInput
        isEssential
        placeholder="닉네임"
        label="닉네임"
        id="studySearch"
      />
      <S.CustomInput
        label="블로그"
        placeholder="https://learnNsahre.com"
        id="studySearch"
      />
      <S.MailContainer>
        <Input
          placeholder="apple"
          size="xsmall"
          id="studySearch"
          label="이메일"
        />
        <S.Text>@</S.Text>
        <S.CustomInputXsmall size="xsmall" id="studySearch" />
        <S.CustomDropDown
          width="110px"
          height="48px"
          selectTitle="직접입력"
          options={options}
        />
      </S.MailContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <S.CustomInput
          size="small"
          label="휴대전화"
          isEssential
          placeholder="010-0000-0000"
          id="studySearch"
        />
        <S.CustomButton>인증번호 받기</S.CustomButton>
      </div>
      <S.CustomInputDefault
        size="medium"
        placeholder="인증번호 입력하세요"
        disabled
        id="studySearch"
      />
      <div>
        <S.LoginButton mode="accent" size="xlarge">
          로그인
        </S.LoginButton>
      </div>
    </S.Container>
  </Layout>
);

export default SignUp;
