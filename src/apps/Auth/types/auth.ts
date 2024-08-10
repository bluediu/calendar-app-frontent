type IStatus = 'checking' | 'authenticated' | 'not-authenticated';

export interface IAuthState {
  isPending: boolean;
  user: IAuthUser | Record<string, never>;
  status: IStatus;
  errorMessage?: string;
}

export interface IAuthUser {
  name: string;
  _id: string;
}
