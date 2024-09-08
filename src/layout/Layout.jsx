import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const { pathname } = useLocation();
  const shouldHideEmergency = ["/", "/register"].includes(pathname);

  return (
    <div className="page-container">
      <main className="content-wrap">
        <Outlet />
      </main>
      {shouldHideEmergency ? null : <Footer />}
    </div>
  );
};

export default Layout;
