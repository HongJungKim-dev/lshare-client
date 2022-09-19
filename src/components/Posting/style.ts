import styled from 'styled-components';
import Label from '@common/Label';
import Title from '@common/Title';
import LabelList from '@components/LabelList';
import PostingContent from '@components/PostingContent';

export const PostingContainer = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  :hover {
    filter: brightness(96%);
  }
`;

export const CustomLabel = styled(Label)`
  margin: 0 16px 0 0;
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
`;

export const RecruitingLabel = styled(Label)``;

export const CustomPostingContent = styled(PostingContent)`
  margin: 16px 0;
  font-size: 13.5px;
`;

export const IconItem = styled.li`
  margin: 0 0 0 16px;
`;

export const TagItems = styled(LabelList)`
  margin: 16px 0 0 0;
`;

export const NickName = styled.h3`
  margin: 0 8px 0 0;
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;

export const CustomTitle = styled(Title)`
  font-weight: 600;
`;

export const IconContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const CenterContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const TitleContainer = styled.div`
  display: flex;
  margin: 16px 0 0 0;
`;

export const SubTitleContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
`;

export const InfoContainer = styled.div`
  margin: 32px 0 0 0;
  display: flex;
`;

export const Time = styled.h3`
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;

export const InfoItem = styled.li`
  margin: 0 8px 0 0;
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;
