import Icon from '@components/common/Icon';

type LogoProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};
const Logo = ({ className }: LogoProps) => (
  <div className={className}>
    <Icon mode="logo" />
  </div>
);

export default Logo;
