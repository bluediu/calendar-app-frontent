/* Redux */
import { Provider } from 'react-redux';

/* Routes */
import { Navigation } from './routes';

import store from './context/store';

/* Styles (libs)*/
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
