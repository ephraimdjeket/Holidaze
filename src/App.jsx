import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Accomodation from "./components/pages/Accomodation";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import VenueDashboard from "./components/pages/VenueDashboard";
import ViewDetail from "./components/pages/ViewDetail";
import Pagenotfound from "./components/pages/PageNotFound";
import Layout from "./components/Layout";

const App = () => {
  const [viewImage, setViewImage] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Layout viewImage={viewImage} setViewImage={setViewImage} />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="accomodations" element={<Accomodation />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
        <Route path="venue-dashboard" element={<VenueDashboard />} />
        <Route path="view-detail/:id" element={<ViewDetail viewImage={viewImage} setViewImage={setViewImage} />} />
        <Route path="*" element={<Pagenotfound />} />
      </Route>
    </Routes>
  )
}

export default App;
