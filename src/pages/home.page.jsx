import { Layout } from "../components/layout/Layout";
import { Link } from "react-router";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>
      <p className="text-lg text-gray-700 max-w-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at lacus
        vitae erat laoreet viverra. Cras nec lorem ac erat suscipit lacinia.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas.
      </p>
      <p className="mt-4 text-sm text-gray-500 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt
        neque nec lorem cursus, vitae tempus orci varius.
      </p>
      <Link
        to="/restaurants"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Выбрать ресторан
      </Link>
    </div>
  );
};
