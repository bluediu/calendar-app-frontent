export interface IUser {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  password: string;
}
