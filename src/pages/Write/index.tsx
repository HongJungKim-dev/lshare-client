/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import DropDown from '@components/DropDown';
import { selectTitles, options } from '@components/DropDown/constants';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import tagsState from '@store/Tags';
import DateType from '@components/types/CalendarArea';
import { districts } from '@components/mocks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '@components/common/Icon';
import CalendarArea from '@components/CalendarArea';
import useMouse from '@hooks/useMouse';
import * as S from './style';

const Write = () => {
  const navigate = useNavigate();
  const INITIAL_DATE_FORM = '0000-00-00';
  const makeFormattedDate = (date: DateType) => {
    if (!date) {
      return INITIAL_DATE_FORM;
    }

    const formattedYear = date.year === 0 ? '0000' : date.year;
    const formattedMonth = date.month > 9 ? `${date.month}` : `0${date.month}`;
    const formattedDate = date.date > 9 ? `${date.date}` : `0${date.date}`;
    return `${formattedYear}-${formattedMonth}-${formattedDate}`;
  };
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [dropDownItem, setDropDownItem] = useRecoilState(dropDownItemState);
  // eslint-disable-next-line no-unused-vars
  const [maxParticipants, setMaxParticipants] = useState('');
  const [tags] = useRecoilState(tagsState);
  const [dates, setDates] = useState<DateType[]>([
    {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
    },
  ]);
  const [startInputDate, setStartInputDate] = useState('');
  const [endInputDate, setEndInputDate] = useState('');

  const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setStartInputDate(event.target.value);
  };

  const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    setEndInputDate(event.target.value);
  };
  type errorMsgKeyType = 'title' | 'content' | 'tags' | 'maxMember' | 'date';
  type errorMsgType = Record<errorMsgKeyType, any>;
  const [errorMsg, setErrorMsg] = useState<errorMsgType>();

  useEffect(() => {
    const getDistricts = async () => {
      const DISTRICT_URL = 'api/study-supports/districts';
      try {
        const response = await axios.get(`${process.env.END_POINT}${DISTRICT_URL}`);
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    const getStudyWay = async () => {
      const STUDY_WAY_URL = 'api/study-supports/progress-of-study';
      try {
        const response = await axios.get(`${process.env.END_POINT}${STUDY_WAY_URL}`);

        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    getDistricts();
    getStudyWay();
  }, []);

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    setValue(currentValue);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeMaxParticipants = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxParticipants(event.target.value);
  };

  const handleClickSavePosting = () => {
    // 'studyOrganizer' |
    type dataKeyType = 'title' | 'content' | 'startDate' | 'endDate' | 'maxStudyMemberCount' | 'district' | 'progressOfStudy' | 'hashTags';
    type dataType = Record<dataKeyType, any>;
    let newErrorMsg = {
      title: '',
      content: '',
      tags: '',
      maxMember: '',
      date: '',
    };

    const getInputPosting = () => {
      // TODO: studyOrganizer??? ???????????? ??????
      const maxStudyMemberCount = Number(maxParticipants);
      let targetDistricts = dropDownItem.find((item) => item.type === 'district');
      if (!targetDistricts) {
        targetDistricts = {
          id: 1,
          type: 'district',
          content: '??????',
        };
      }
      let targetStudyWay = dropDownItem.find((item) => item.type === 'studyWay');
      if (!targetStudyWay) {
        targetStudyWay = {
          id: 3,
          type: 'studyWay',
          content: '?????????/????????????',
        };
      }

      // const response = await axios.get(`${process.env.END_POINT}api/studies/districts`);
      const apiDistricts = [
        {
          id: 11,
          type: 'SEOUL',
          value: '??????',
        },
        {
          id: 21,
          type: 'BUSAN',
          value: '??????',
        },
        {
          id: 22,
          type: 'DAEGU',
          value: '??????',
        },
        {
          id: 23,
          type: 'INCHEON',
          value: '??????',
        },
        {
          id: 24,
          type: 'DAEJEON',
          value: '??????',
        },
        {
          id: 25,
          type: 'ULSAN',
          value: '??????',
        },
      ];

      // const response = await axios.get(`${process.env.END_POINT}api/studies/processOfStudy`);
      const apiMeetings = [
        {
          id: 1,
          type: 'ONLINE',
          value: '?????????',
        },
        {
          id: 2,
          type: 'OFFLINE',
          value: '????????????',
        },
        {
          id: 3,
          type: 'BOTH',
          value: '?????????/????????????',
        },
      ];
      const districtData = apiDistricts.find((currentDistrict) => currentDistrict.value === targetDistricts?.content);
      const studyWayData = apiMeetings.find((meeting) => meeting.value === targetStudyWay?.content);

      const data = {
        // studyOrganizer: 'HongJungKim-dev', // TODO ?????? ?????? ????????? ??????
        title,
        content: value,
        startDate: makeFormattedDate(dates[0]),
        endDate: makeFormattedDate(dates[1]),
        maxStudyMemberCount,
        district: districtData?.type,
        progressOfStudy: studyWayData?.type,
        hashTags: tags,
      };

      let titleMsg = '';
      if (title.length < 1) {
        titleMsg = '????????? ??????????????????.';
      }
      const maxTitleLength = 60;

      if (title.length > maxTitleLength) {
        titleMsg = '????????? 60????????? ???????????????.';
      }

      const contentMsg = value.length < 1 ? '????????? ??????????????????.' : '';

      let maxMemberMsg = isNaN(maxStudyMemberCount) ? '????????? ????????? ?????? ???????????????.' : '';
      const maxMemberNum = 2;
      maxMemberMsg = maxStudyMemberCount < maxMemberNum ? '????????? 2??? ?????? ???????????????.' : maxMemberMsg;

      let dateMsg = makeFormattedDate(dates[0]) === INITIAL_DATE_FORM || makeFormattedDate(dates[1]) === INITIAL_DATE_FORM ? '????????? ????????? ???????????? ????????? ??????????????????.' : '';
      if (dates[0] && dates[1]) {
        const studyStartDate = new Date(dates[0].year, dates[0].month, dates[0].date);
        const studyEndDate = new Date(dates[1].year, dates[1].month, dates[1].date);
        const startDateMiliSec = studyStartDate.getTime();
        const studyEndDateMiliSec = studyEndDate.getTime();
        dateMsg = startDateMiliSec > studyEndDateMiliSec ? '????????? ????????? ???????????? ????????? ??? ????????????.' : dateMsg;
      }
      const maxTagNum = 8;
      const tagMaxTextLength = 15;
      let tagsMsg = '';

      if (tags.length < 1) {
        tagsMsg = '????????? ??????????????????.';
      }

      if (tags.length > maxTagNum) {
        tagsMsg = '????????? ?????? 8??? ???????????????.';
      }

      const outOfTagLengthMsg = '?????? ????????? 15????????? ???????????????.';

      tagsMsg = tags.find((tag) => tag.length > tagMaxTextLength) ? `${tagsMsg} ${outOfTagLengthMsg}` : tagsMsg;

      newErrorMsg = {
        title: titleMsg,
        tags: tagsMsg,
        maxMember: maxMemberMsg,
        date: dateMsg,
        content: contentMsg,
      };

      setErrorMsg(newErrorMsg);
      return data;
    };

    const postStudy = async (data: dataType) => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };

      console.log('headers');
      console.log(headers);
      try {
        const STUDY_URL = 'api/studies';
        const response = await axios.post(`${process.env.END_POINT}${STUDY_URL}`, data, { headers });
        console.log(response);
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log('401 error');
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

    const inputPosting = getInputPosting();

    if (newErrorMsg.content || newErrorMsg.date || newErrorMsg.maxMember || newErrorMsg.tags || newErrorMsg.title) {
      return;
    }

    postStudy(inputPosting);

    navigate('/api/studies');
  };

  const handleClickCancel = () => {
    navigate('/api/studies');
  };

  const handleClickDate = (currentDate: DateType) => {
    if (dates.length > 1) {
      setDates([
        dates[0],
        {
          year: currentDate.year,
          month: currentDate.month + 1,
          date: currentDate.date,
        },
      ]);
      return;
    }

    setDates([
      ...dates,
      {
        year: currentDate.year,
        month: currentDate.month + 1,
        date: currentDate.date,
      },
    ]);
  };

  const handleClickReset = () => {
    setDates([]);
  };

  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const { isClicked, handleClick } = useMouse(false);
  const handleClickCalendar = () => {
    handleClick();
  };

  const [isCalendarClickAway, setIsCalendarClickAway] = useState(false);

  useEffect(() => {
    const handleCalendarClickAway = (event: MouseEvent) => {
      setIsCalendarClickAway(!buttonWrapperRef.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleCalendarClickAway);
  }, []);

  useEffect(() => {
    if (isClicked && isCalendarClickAway) {
      handleClick();
    }
  }, [isCalendarClickAway]);

  return (
    <Layout>
      <S.Container>
        <S.CustomInput id="write-title" label="??????" size="xlarge" value={title} handleChangeValue={handleChangeTitle} />
        {errorMsg?.title && <S.ErrorMessage>{errorMsg?.title}</S.ErrorMessage>}
        <S.CustomSearchTag id="write-tag" label="??????" mode="tag" size="megaLarge" isTagSingly={false} />
        {errorMsg?.tags && <S.ErrorMessage>{errorMsg?.tags}</S.ErrorMessage>}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <S.SelectsContainer>
              <S.Label>??????</S.Label>
              <DropDown width="77px" height="48px" type="district" selectTitle={districts[0].content || ''} options={districts} />
              <S.Selects id="write-max-people" size="xsmall" label="????????????" isLabelHorizontal value={maxParticipants} handleChangeValue={handleChangeMaxParticipants} placeholder="0" />
              <S.Progress>????????????</S.Progress>
              <DropDown width="189px" height="48px" type="studyWay" selectTitle={selectTitles[0]} options={options} />
            </S.SelectsContainer>
          </div>
          <div>
            <S.FloatBox>{errorMsg?.maxMember && <S.ErrorMsg>{errorMsg?.maxMember}</S.ErrorMsg>}</S.FloatBox>
          </div>
          <div>
            <S.FloatBox>
              <S.CalendarInputContainer>
                <S.FlexBox>
                  <S.CustomCalendarInput
                    id="write-date-start"
                    placeholder={makeFormattedDate(dates[0])}
                    size="xsmall"
                    mode="calendar"
                    label="?????????"
                    isLabelHorizontal
                    // handleClickDate={handleClickDate}
                    // handleClickReset={handleClickReset}
                    handleChangeValue={handleChangeStartDate}
                    disabled
                  />
                  <S.CustomCalendarInput
                    id="write-date-end"
                    placeholder={makeFormattedDate(dates[1])}
                    size="xsmall"
                    mode="calendar"
                    label="?????????"
                    isLabelHorizontal
                    // handleClickDate={handleClickDate}
                    // handleClickReset={handleClickReset}
                    handleChangeValue={handleChangeEndDate}
                    disabled
                  />
                  <div ref={buttonWrapperRef}>
                    <S.CustomButton size="tiny" handleClick={handleClickCalendar}>
                      <Icon mode="calendar" />
                    </S.CustomButton>
                    <S.CalendarAreaContainer isClicked={isClicked}>
                      <CalendarArea handleClickDate={handleClickDate} handleClickReset={handleClickReset} />
                    </S.CalendarAreaContainer>
                  </div>
                </S.FlexBox>
              </S.CalendarInputContainer>
            </S.FloatBox>
          </div>
        </div>
        <S.FloatBox>{errorMsg?.date && <S.ErrorMsg>{errorMsg?.date}</S.ErrorMsg>}</S.FloatBox>
        <S.CustomTextArea id="write-posting" handleChange={handleChangeValue} value={value} />
        {errorMsg?.content && <S.ErrorMessage>{errorMsg?.content}</S.ErrorMessage>}
        <S.ButtonContainer>
          <S.CustomButton size="small" handleClick={handleClickCancel}>
            ??????
          </S.CustomButton>
          <S.CustomButton mode="accent" size="small" handleClick={handleClickSavePosting}>
            ??????
          </S.CustomButton>
        </S.ButtonContainer>
      </S.Container>
    </Layout>
  );
};

export default Write;
