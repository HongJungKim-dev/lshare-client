import styled from 'styled-components';

const StyledLabel = styled.span<{ isStudyOrganizer: boolean; isMyComment: boolean }>`
  height: 16px;
  padding: 4px;
  border: ${({ isStudyOrganizer }) => isStudyOrganizer && '1px solid'};
  border-color: ${({ theme, isStudyOrganizer }) => isStudyOrganizer && theme.colors.default.border};
  border-radius: 4px;
  font-weight: ${({ isMyComment }) => isMyComment && 'bold'};
  cursor: pointer;
`;

export default StyledLabel;
