import "./reset.css";
import { ThemeContextProvider } from "../theme-context/ThemeContextProvider";
import { UserContextProvider } from "../user-context/UserContextProvider";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { AppRoutes } from "../../routes/AppRoutes";

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <UserContextProvider>
          <AppRoutes/>
        </UserContextProvider>
      </ThemeContextProvider>
    </Provider>
  );
};
