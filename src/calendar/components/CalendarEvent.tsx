export const CalendarEvent = ({ event }: any) => {
  return (
    <>
      <strong>{event.title}</strong>
      <span> - {event.user.name}</span>
    </>
  );
};
