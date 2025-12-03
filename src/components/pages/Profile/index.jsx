import { useState, useEffect } from "react";
import ProfileModal from "./components/ProfileModal";
import VenueModal from "./components/VenueModal";
import InfoCard from "../../ui/Cards/InfoCard";

const Profile = () => {
  const [profileModal, setProfileModal] = useState(false);
  const [venueModal, setVenueModal] = useState(false);
  useEffect(() => {
    if (profileModal || venueModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [profileModal, venueModal])
  return (
    <div>
      {<ProfileModal openModal={profileModal} closeModal={setProfileModal} />}
      {<VenueModal openModal={venueModal} closeModal={setVenueModal} />}
      <div>
        <img className="w-full max-w-7xl mx-auto rounded-xl object-cover h-48 md:h-60 object-center relative" src="https://www.morphico.com/_ipx/_/images/54856169-empty.jpg" alt="bio" />
        <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row justify-center md:justify-start text-center md:text-left px-4">
          <img className="rounded-full w-34 md:w-40 z-10 -mt-5 top-56" src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg" alt="Profile pic" />
          <div className="mt-2 ml-0 md:ml-5 flex flex-col gap-2">
            <h1 className="text-h2 font-poppins">Profile name</h1>
            <p className="text-p font-rubik">Email@stud.noroff.no</p>
            <p className="text-p font-rubik">Bio...</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col gap-5 my-15 md:flex-row items-center px-4 mb-15">
          <button onClick={() => {
            setProfileModal(prev => !prev);
          }} className="cursor-pointer bg-primary-blue rounded-md px-6 py-1 text-white w-48 font-poppins text-p hover:bg-accent-aqua transition-colors duration-200 ease">Update profile</button>
          <button onClick={() => {
            setVenueModal(prev => !prev)
          }} className="cursor-pointer bg-primary-blue rounded-md px-6 py-1 text-white w-48 font-poppins text-p hover:bg-accent-aqua transition-colors duration-200 ease">Create a venue</button>
          <button className="cursor-pointer bg-primary-blue rounded-md px-4 py-1 text-white w-48 font-poppins text-p hover:bg-accent-aqua transition-colors duration-200 ease">Venue dashboard</button>
        </div>
        <div className=" max-w-md md:max-w-7xl w-full mx-auto px-4">
          <h2 className="text-poppins text-h3">My bookings (3)</h2>
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </div>
      </div >
    </div >
  )
}

export default Profile;