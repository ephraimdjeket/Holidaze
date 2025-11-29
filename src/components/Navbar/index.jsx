import logo from "../../assets/Holidaze-logo.png"
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full py-5 border-b fixed z-50 bg-white">
      <nav className="flex justify-between px-10">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="Holidaze logo" className=" w-8" />
          <h1 className="font-poppins text-primary-blue text-h1 hidden md:block"><a href="#">Holidaze</a></h1>
        </div>

        <svg onClick={() => setOpen(prev => !prev)} className="w-6 cursor-pointer md:hidden" fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1920 1411.412v225.882H0v-225.882h1920Zm0-564.706v225.882H0V846.706h1920ZM1920 282v225.882H0V282h1920Z" fill-rule="evenodd"></path> </g></svg>
        {/* Desktop NAV */}
        <ul className="hidden md:flex gap-3 font-rubik items-center">
          <li><a href="#">Home</a></li>
          <li><a href="#">Accomodations</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Logout</a></li>
        </ul>

        {/* Mobile NAV */}
        <ul className={`${open ? "block" : "hidden"} md-hidden bg-white  fixed inset-0 z-5 font-poppins`}>
          <div className="flex justify-between px-10">
            <div className="flex flex-col gap-10 text-2xl mt-30">
              <li>Home</li>
              <li>Accomodations</li>
              <li>Contact</li>
              <li>Profile</li>
              <li>Logout</li>
            </div>
            <svg onClick={() => setOpen(prev => !prev)} className="block md:hidden w-10 mb-auto mt-3 -mr-3 cursor-pointer" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>
          </div>
          <img
            className="fixed bottom-4 left-1/1 transform -translate-x-1/2"
            src={logo}
            alt="Holidaze logo"
          />
        </ul>
      </nav>
    </header>
  )
}

export default Navbar;