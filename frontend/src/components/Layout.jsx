import { useSelector } from "react-redux";

import useCheckAuth from "../hooks/useCheckAuth";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import Footer from "./Footer";
import { Navbar } from "./ui/Navbar";

function Layout() {
  useCheckAuth();
  const { apiLoading } = useSelector((store) => store.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow min-h-[567px]">
        <Outlet />
        {apiLoading && <Loader />}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
