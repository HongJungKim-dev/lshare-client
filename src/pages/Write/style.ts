import styled from 'styled-components';
import TextArea from '@components/TextArea';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import SearchTag from '@components/SearchTag';

export const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
`;

export const SelectsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0 0 0;
  float: right;
`;

export const CustomTextArea = styled(TextArea)`
  width: 992px;
  border-radius: 4px;
`;

export const RightContainer = styled.div`
  display: flex;
  margin: 16px 0;
  float: right;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin: 16px 0;
  float: right;
  align-items: center;
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 16px;
`;

export const CustomInput = styled(Input)`
  margin: 64px 0 16px 0;
`;

export const CustomTagInput = styled(Input)`
  margin: 16px 0 0 0;
`;

export const Selects = styled(Input)`
  margin: 0 16px 0 0;
`;

export const CustomCalendarInput = styled(Input)`
  margin: 0 0 0 16px;
`;

export const CustomSearchTag = styled(SearchTag)`
  margin: 8px 0 0 0;
`;

export const Progress = styled.span`
  margin: 0 8px 0 0;
`;
