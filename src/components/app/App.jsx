import { Layout } from "../layout/Layout";
import { RestaurantsPage } from "../restaurants-page/RestaurantsPage";
import { restaurants } from "../../assets/mock";

import "./reset.css";
import { ThemeContextProvider } from "../theme-context/ThemeContextProvider";

export const App = () => {
  return (
    <ThemeContextProvider>
      <Layout>
        <RestaurantsPage restaurants={restaurants} />
      </Layout>
    </ThemeContextProvider>
  );
};
