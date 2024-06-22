import { Provider } from "react-redux";
import Rutas from "./routes/Routes";
import { store } from "./redux/store/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Rutas />
    </Provider>
  
  );
}

export default App
