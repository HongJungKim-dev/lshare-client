/* eslint-disable react/require-default-props */
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import useMouse from '@hooks/useMouse';
import * as S from './style';
import items from './constants';

type CommentManageMenuProps = {
  className?: string;
  isCommentWriter: boolean;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
  handleClickEmoji: () => void;
};

const CommentManageMenu = ({
  className,
  isCommentWriter,
  handleClickEdit,
  handleClickDelete,
  handleClickEmoji,
}: CommentManageMenuProps) => {
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);

  return (
    <S.Container className={className}>
      <S.Item
        key="CommentManageMenu-menu-emoji"
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <S.PopUp isHovered={isMouseOvered}>
          {items.map(({ id, content }) => (
            <S.EmojiItem key={`CommentManageMenu-items-${id}`}>
              <Button mode="tiny" size="tiny" handleClick={handleClickEmoji}>
                {content}
              </Button>
            </S.EmojiItem>
          ))}
        </S.PopUp>
        <Button mode="tiny" size="tiny">
          <Icon mode="emoji" />
        </Button>
      </S.Item>
      {isCommentWriter && (
        <>
          <S.Item key="CommentManageMenu-menu-edit">
            <Button mode="tiny" size="tiny" handleClick={handleClickEdit}>
              <Icon mode="edit" />
            </Button>
          </S.Item>
          <S.Item key="CommentManageMenu-menu-cancel">
            <Button mode="tiny" size="tiny" handleClick={handleClickDelete}>
              <Icon mode="cancel" />
            </Button>
          </S.Item>
        </>
      )}
    </S.Container>
  );
};

export default CommentManageMenu;
