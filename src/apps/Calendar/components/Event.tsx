import { IEvent } from '../interfaces';

export const Event = ({ event }: { event: IEvent }) => {
  return (
    <>
      <strong>{event.title}</strong>
      <span> - {event.user.name}</span>
    </>
  );
};
