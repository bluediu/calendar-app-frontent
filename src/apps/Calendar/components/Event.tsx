/* Interfaces */
import { IEvent } from '../interfaces';

export const Event = ({ event }: { event: IEvent }) => {
  return (
    <>
      <strong title={`${event.title} - ${event.user.name}`}>
        <i className="fa-solid fa-calendar"></i> <span>{event.title}</span>
      </strong>
      <span>
        - <i className="fa-solid fa-user"></i> <span>{event.user.name}</span>
      </span>
    </>
  );
};
