import { Outlet } from "react-router-dom";
import Button from "../components/Button/Button";

const Layout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
