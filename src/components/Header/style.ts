import styled from 'styled-components';
import Logo from '@components/common/Logo';
import Button from '@components/common/Button';

export const CustomLogo = styled(Logo)`
  margin: 8px 0 0 0;
`;

export const IconButton = styled(Button)`
  margin: 4px 0 0 0;
`;
export const CustomButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'space-around', align: 'stretch' })}
  z-index: 100;
`;
