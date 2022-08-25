import Layout from '@components/Layout';
import DropDown from '@components/DropDown';
import { options } from '@components/DropDown/constants';
import { ChangeEvent, useState } from 'react';
import SearchTag from '@components/SearchTag';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import { useNavigate, useParams } from 'react-router-dom';
import studiesState from '@store/Studies';
import * as S from './style';

const Edit = () => {
  const navigate = useNavigate();
  const [studies] = useRecoilState(studiesState);
  const { id } = useParams<{ id: string }>();
  const targetStudy = studies.find((study) => study.id === Number(id));
  const [value, setValue] = useState(targetStudy?.content);
  const [title, setTitle] = useState(targetStudy?.title);
  const [district, setDistrict] = useState(
    targetStudy?.infos.find(({ type }) => type === 'district')?.content
  );
  const [maxParticipants, setMaxParticipants] = useState(
    targetStudy?.infos.find(({ type }) => type === 'limit')?.content
  );
  const [studyWay] = useState(
    targetStudy?.infos.find(({ type }) => type === 'studyWay')?.content
  );
  const [startDate] = useState(
    targetStudy?.infos.find(({ type }) => type === 'start')?.content
  );
  const [endDate] = useState(
    targetStudy?.infos.find(({ type }) => type === 'end')?.content
  );
  const [dropDownItem] = useRecoilState(dropDownItemState);

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
    // TODO: 서버요청
    console.log(
      title,
      targetStudy?.tags,
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
          id="Edit-title"
          label="제목"
          size="xlarge"
          value={title}
          handleChangeValue={handleChangeTitle}
        />
        <SearchTag
          id="Edit-tag"
          mode="tag"
          size="megaLarge"
          isTagSingly={false}
          tags={targetStudy?.tags}
        />
        <S.SelectsContainer>
          <S.Selects
            id="Edit-district"
            label="지역"
            isLabelHorizontal
            size="xsmall"
            value={district}
            handleChangeValue={handleChangeDistrict}
          />
          <S.Selects
            id="Edit-max-people"
            size="xsmall"
            label="최대인원"
            isLabelHorizontal
            value={maxParticipants}
            handleChangeValue={handleChangeMaxParticipants}
          />
          <S.Label>진행방식</S.Label>
          <DropDown
            width="189px"
            height="48px"
            selectTitle={studyWay || ''}
            options={options}
          />
        </S.SelectsContainer>
        <S.RightContainer>
          <S.CustomCalendarInput
            id="Edit-start"
            placeholder={startDate}
            size="small"
            mode="calendar"
            label="시작일"
            isLabelHorizontal
          />
          <S.CustomCalendarInput
            id="Edit-end"
            placeholder={endDate}
            size="small"
            mode="calendar"
            label="종료일"
            isLabelHorizontal
          />
        </S.RightContainer>
        <S.CustomTextArea
          id="Edit-posting"
          handleChange={handleChangeValue}
          value={value || ''}
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

export default Edit;
