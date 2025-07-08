import { Layout } from "../layout/Layout";
import { RestaurantsPage } from "../restaurants-page/RestaurantsPage";
import { restaurants } from "../../assets/mock";

export const App = function () {
  return (
    <Layout>
      <RestaurantsPage restaurants={restaurants} />
    </Layout>
  );
};
