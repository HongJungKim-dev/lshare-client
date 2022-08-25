import Layout from '@components/Layout';
import DropDown from '@components/DropDown';
import { selectTitles, options } from '@components/DropDown/constants';
import { ChangeEvent, useState } from 'react';
import SearchTag from '@components/SearchTag';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import tagsState from '@store/Tags';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const Write = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [startDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const [dropDownItem] = useRecoilState(dropDownItemState);
  const [tags] = useRecoilState(tagsState);

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    setValue(currentValue);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDistrict = (event: ChangeEvent<HTMLInputElement>) => {
    setDistrict(event.target.value);
  };

  const handleChangeMaxParticipants = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setMaxParticipants(event.target.value);
  };

  const handleClickSavePosting = () => {
    const endDate = '2022-09-21';

    // TODO: 서버요청
    console.log(
      title,
      tags,
      district,
      maxParticipants,
      dropDownItem,
      startDate,
      endDate,
      value
    );

    navigate('/main');
  };

  const handleClickCancel = () => {
    navigate('/main');
  };

  return (
    <Layout>
      <S.Container>
        <S.CustomInput
          id="write-title"
          label="제목"
          size="xlarge"
          value={title}
          handleChangeValue={handleChangeTitle}
        />
        <SearchTag
          id="write-tag"
          mode="tag"
          size="megaLarge"
          isTagSingly={false}
        />
        <S.SelectsContainer>
          <S.Selects
            id="write-district"
            label="지역"
            isLabelHorizontal
            size="xsmall"
            value={district}
            handleChangeValue={handleChangeDistrict}
          />
          <S.Selects
            id="write-max-people"
            size="xsmall"
            label="최대인원"
            isLabelHorizontal
            value={maxParticipants}
            handleChangeValue={handleChangeMaxParticipants}
          />
          <S.Progress>진행방식</S.Progress>
          <DropDown
            width="189px"
            height="48px"
            selectTitle={selectTitles[0]}
            options={options}
          />
        </S.SelectsContainer>
        <S.RightContainer>
          <S.CustomCalendarInput
            id="write-start"
            placeholder={startDate}
            size="small"
            mode="calendar"
            label="시작일"
            isLabelHorizontal
          />
          <S.CustomCalendarInput
            id="write-end"
            size="small"
            mode="calendar"
            label="종료일"
            isLabelHorizontal
          />
        </S.RightContainer>
        <S.CustomTextArea
          id="write-posting"
          handleChange={handleChangeValue}
          value={value}
        />
        <S.ButtonContainer>
          <S.CustomButton size="small" handleClick={handleClickCancel}>
            취소
          </S.CustomButton>
          <S.CustomButton
            mode="accent"
            size="small"
            handleClick={handleClickSavePosting}
          >
            저장
          </S.CustomButton>
        </S.ButtonContainer>
      </S.Container>
    </Layout>
  );
};

export default Write;
