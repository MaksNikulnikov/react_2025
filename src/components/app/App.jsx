import "./reset.css";
import { ThemeContextProvider } from "../theme-context/ThemeContextProvider";
import { UserContextProvider } from "../user-context/UserContextProvider";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { AppRoutes } from "../../routes/AppRoutes";
import { ErrorBoundary } from "../error-boundary/error-boundary";
import { DemoLatencyContextProvider } from "../demo-latency-context/DemoLatencyContextProvider";

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <DemoLatencyContextProvider>
          <ThemeContextProvider>
            <UserContextProvider>
              <AppRoutes />
            </UserContextProvider>
          </ThemeContextProvider>
        </DemoLatencyContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};
