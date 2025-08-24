import "./reset.css";
import { ThemeContextProvider } from "../theme-context/ThemeContextProvider";
import { UserContextProvider } from "../user-context/UserContextProvider";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { AppRoutes } from "../../routes/AppRoutes";
import { ErrorBoundary } from "../error-boundary/error-boundary";

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeContextProvider>
          <UserContextProvider>
            <AppRoutes />
          </UserContextProvider>
        </ThemeContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};
