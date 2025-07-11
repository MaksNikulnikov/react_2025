import Scrollbar from "../scrollbar/Scrollbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Scrollbar/>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};
