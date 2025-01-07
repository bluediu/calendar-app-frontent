/* Hooks */
import { useAppSelector } from '../../../hooks';

export const useUserAuthorization = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const activeCalendarEvent = useAppSelector(
    (state) => state.calendar.activeEvent
  );

  return activeCalendarEvent?.user._id === currentUser._id;
};
