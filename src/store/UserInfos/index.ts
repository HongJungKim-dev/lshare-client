import { atom } from 'recoil';

export type keyType = 'memberId' | 'notification' | 'profileImage';

type userInfoType = Record<keyType, any>;

const userInfosState = atom<userInfoType>({
  key: 'userInfosState',
  default: {
    memberId: null,
    notification: false,
    profileImage: '',
  },
});

export default userInfosState;
