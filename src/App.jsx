import Navbar from "./components/pages/Navbar";
import Footer from "./components/pages/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Accomodation from "./components/pages/Accomodation";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import VenueDashboard from "./components/pages/VenueDashboard";
import ViewDetail from "./components/pages/ViewDetail";

const App = () => {

  return (
    <>
      <Navbar />
      <ViewDetail />
      <Footer />
    </>
  )
}

export default App;
