// Generated by https://quicktype.io

export interface IEventResponse {
  ok: boolean;
  events: IEvent[];
}

export interface IEvent {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: IUser;
  id?: string;
}

export interface IActiveEvent extends IEvent {
  bgColor: string;
}

export interface IUser {
  _id: string;
  name: string;
}
