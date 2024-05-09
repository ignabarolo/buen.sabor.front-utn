import { Provider } from "react-redux";
import { store } from "./redux/store/store"; // Importa tu store de Redux aquí
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
