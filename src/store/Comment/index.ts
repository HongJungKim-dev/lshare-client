import { atom } from 'recoil';

type keyType =
  | 'id'
  | 'isWriter'
  | 'nickname'
  | 'time'
  | 'isEdited'
  | 'content'
  | 'likeNum'
  | 'reactions';

type stateType = Record<keyType, any>;
const commentState = atom<stateType[]>({
  key: 'commentState',
  default: [],
});

export default commentState;
