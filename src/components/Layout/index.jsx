import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Layout = ({ viewImage, setViewImage }) => {
  return (
    <>
      <Header viewImage={viewImage} setViewImage={setViewImage} />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;