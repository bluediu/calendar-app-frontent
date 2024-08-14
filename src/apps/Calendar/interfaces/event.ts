interface IUserInEvent {
  _id: string;
  name: string;
}

export interface IEvent {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: IUserInEvent;
}

export interface IEventsResponse {
  ok: true;
  events: IEvent[];
}

export interface IEventResponse {
  ok: true;
  event: IEvent;
}

export interface IActiveEvent extends IEvent {
  bgColor?: string;
}
