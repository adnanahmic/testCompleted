export interface Auth {
  email: string;
  password: string;
}

export enum AuthActions {
  LOGIN = "LOGIN"
}

interface AuthActionType<T, P> {
  type: T;
  payload: P;
}

export type AuthAction =
  | AuthActionType<typeof AuthActions.LOGIN, Auth>
;
