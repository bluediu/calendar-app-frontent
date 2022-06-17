import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './context/store';
import { AppRouter } from './routes';

function CalendarApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default CalendarApp;
