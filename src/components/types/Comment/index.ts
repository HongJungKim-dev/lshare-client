export type keyType =
  | 'writerId'
  | 'id'
  | 'commentId'
  | 'isStudyOrganizer'
  | 'isMyComment'
  | 'nickname'
  | 'time'
  | 'isEditied'
  | 'replyNum'
  | 'commentId'
  | 'content'
  | 'avatorSrc'
  | 'avatorAlt'
  | 'emojis'
  | 'isAuthorized';

type replyType = Record<keyType, any>;

export default replyType;
