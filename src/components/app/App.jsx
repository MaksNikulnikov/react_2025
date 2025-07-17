import { Layout } from "../layout/Layout";
import { RestaurantsPage } from "../restaurants-page/RestaurantsPage";
import { restaurants } from "../../assets/mock";

import "./reset.css"

export const App = () => {
  return (
    <Layout>
      <RestaurantsPage restaurants={restaurants} />
    </Layout>
  );
};
