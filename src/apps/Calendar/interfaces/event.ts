interface IUserInEvent {
  _id: string;
  name: string;
  email: string;
}

export interface IEvent {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: IUserInEvent;
}

export interface IActiveEvent extends IEvent {
  bgColor?: string;
}
