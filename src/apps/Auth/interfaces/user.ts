// TODO: Fix properties inconsistencies
export interface IUser {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}

export interface ISignInResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}
