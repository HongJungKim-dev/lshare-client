import styled from 'styled-components';
import Button from '@components/common/Button';

export const Container = styled.div`
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'flex-start', align: 'center' })};
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 8px;
`;
