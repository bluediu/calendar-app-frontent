export interface IAuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: object | IAuthUser;
  errorMessage: undefined | string;
}

export interface IAuthUser {
  name: string;
  uid: string;
}
