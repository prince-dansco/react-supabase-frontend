import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/globalComp/navBar";
import FooterPage from "../components/globalComp/footerPage";

export default function Layout() {
  const location = useLocation();

  const noNavbarRoutes = [
    "/signIn",
    "/signUp",
    "/forgettedPassword",
    "/reset-password",
     "/googleAuth",
    "/dashBoard",
    "/"
  ];
  const noFooterRoutes = [
    "/signIn",
    "/signUp",
    "/forgettedPassword",
    "/reset-password",
   "/googleAuth",
    "/dashBoard",
    "/",	
  ];

  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div>
      {showNavbar && <NavBar />}

      <div className={showNavbar ? "mt-20" : ""}>
        <Outlet />
      </div>

      {showFooter && <FooterPage />}
    </div>
  );
}
