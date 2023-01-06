export enum StatusMessage {
  OK = 'ok',
  UPDATED = 'updated',
  NOT_FOUND = 'not-found',
  ERROR = 'error',
  DELETED = 'deleted',
  INVALID_INPUT = 'invalid-input'
}

export type ReturnStatus = {
  status: StatusMessage
}