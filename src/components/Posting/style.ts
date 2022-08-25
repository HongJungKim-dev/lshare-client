import styled from 'styled-components';
import Label from '@common/Label';
import Title from '@common/Title';
import LabelList from '@components/LabelList';
import PostingContent from '@components/PostingContent';

export const PostingContainer = styled.div`
  width: 896px;
  height: 264px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  :hover {
    filter: brightness(90%);
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
`;

export const IconItem = styled.li`
  margin: 0 0 0 16px;
`;

export const TagItems = styled(LabelList)`
  margin: 16px 0 0 0;
`;

export const NickName = styled(Title)`
  margin: 0 8px 0 0;
`;

export const CustomTitle = styled(Title)`
  margin: 0 0 0 48px;
`;

export const IconContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const CenterContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const TitleContainer = styled.div`
  display: flex;
  margin: 0 0 8px 0;
`;

export const SubTitleContainer = styled.div`
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
`;

export const InfoContainer = styled.div`
  width: 116px;
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'space-around', align: 'stretch' })};
`;
