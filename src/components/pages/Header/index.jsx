import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Holidaze-logo.png";
import { useState, useEffect } from "react";
import { UseAuth } from "../../context/AuthContext";

const Header = ({ viewImage }) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  function handleLogout() {
    localStorage.clear();
    setUser(null);
    setOpen(false);
    navigate("/login");
  }

  return (
    <header
      className={`w-full py-5 border-b fixed top-0 z-50 bg-white px-6 md:px-10 ${viewImage ? "blur-sm" : ""
        }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link className="flex gap-2 items-center" to="/home">
          <img src={logo} alt="Holidaze logo" className="w-8 h-8" />
          <h1 className="font-poppins text-primary-blue text-h1 hidden md:block">
            Holidaze
          </h1>
        </Link>

        <svg
          onClick={() => setOpen(prev => !prev)}
          className="w-6 cursor-pointer md:hidden"
          fill="#000000"
          viewBox="0 0 1920 1920"
        >
          <path d="M1920 1411.412v225.882H0v-225.882h1920Zm0-564.706v225.882H0V846.706h1920ZM1920 282v225.882H0V282h1920Z" />
        </svg>

        <ul className="hidden md:flex gap-6 font-rubik items-center text-p">
          <li className="hover:border-b"><Link to="/home">Home</Link></li>
          <li className="hover:border-b"><Link to="/accomodations">Accomodations</Link></li>
          <li className="hover:border-b"><Link to="/contact">Contact</Link></li>

          {user && (
            <>
              <li className="hover:border-b"><Link to="/profile">Profile</Link></li>
              <li className="hover:border-b cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </>
          )}

          {!user && (
            <li className="hover:border-b"><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>

      <ul
        className={`${open ? "flex" : "hidden"
          } md:hidden fixed inset-0 z-50 bg-white flex-col`}
      >
        <div className="flex justify-between items-start px-6 py-5">
          <div className="flex flex-col gap-10 text-2xl mt-20 font-poppins">
            <li><Link to="/home" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/accomodations" onClick={() => setOpen(false)}>Accomodations</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

            {user && (
              <>
                <li><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li>
                <li className="cursor-pointer" onClick={handleLogout}>Logout</li>
              </>
            )}

            {!user && (
              <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
            )}
          </div>

          <svg
            onClick={() => setOpen(false)}
            className="w-10 cursor-pointer"
            fill="#000000"
            viewBox="0 0 32 32"
          >
            <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5 5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
          </svg>
        </div>

        <img
          className="mt-auto mb-6 mx-auto w-16"
          src={logo}
          alt="Holidaze logo"
        />
      </ul>
    </header>
  );
};

export default Header;
