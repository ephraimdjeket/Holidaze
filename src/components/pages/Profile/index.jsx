import { useState, useEffect } from "react";
import ProfileModal from "./components/ProfileModal";
import VenueModal from "./components/VenueModal";
import InfoCard from "../../ui/Cards/InfoCard";
import { API_BASE } from "../../../api/config.mjs";
import { UseAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = UseAuth();

  const [profileModal, setProfileModal] = useState(false);
  const [venueModal, setVenueModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    if (profileModal || venueModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [profileModal, venueModal]);

  useEffect(() => {
    if (!user) return;

    async function fetchBookings() {
      try {
        const res = await fetch(
          `${API_BASE}holidaze/profiles/${user.name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
              "X-Noroff-API-Key": apiKey,
            },
          }
        );

        const data = await res.json();
        setBookings(data.data || []);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user, apiKey]);

  if (!user) return <p>Loading profile...</p>;
  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <ProfileModal
        openModal={profileModal}
        closeModal={setProfileModal}
        userName={user.name}
      />

      <VenueModal
        openModal={venueModal}
        closeModal={setVenueModal}
      />

      <img
        className="w-full max-w-7xl mx-auto rounded-xl object-cover h-48 md:h-60 object-center"
        src={user.banner?.url}
        alt={user.banner?.alt || "User banner"}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row px-4">
        <img
          className="rounded-full w-34 md:w-40 z-10 -mt-5"
          src={user.avatar?.url}
          alt={user.avatar?.alt || "User profile picture"}
        />

        <div className="mt-2 md:ml-5 flex flex-col gap-2">
          <h1 className="text-h2 font-poppins">{user.name}</h1>
          <p className="text-p font-rubik">{user.email}</p>
          {user.bio && <p className="text-p font-rubik">{user.bio}</p>}
        </div>
      </div>

      <div className="max-w-7xl sm:mx-auto items-center flex flex-col gap-5 my-15 md:flex-row px-4">
        <button
          onClick={() => setProfileModal(true)}
          className="bg-primary-blue rounded-md px-6 py-1 text-white w-48 cursor-pointer"
        >
          Update profile
        </button>

        <button
          onClick={() => setVenueModal(true)}
          className="bg-primary-blue rounded-md px-6 py-1 text-white w-48 cursor-pointer"
        >
          Create a venue
        </button>

        <button
          className="bg-primary-blue rounded-md px-6 py-1 text-white w-48 cursor-pointer"
        >
          Venue Dashboard
        </button>
      </div>

      <div className="max-w-md md:max-w-7xl mx-auto px-4">
        <h2 className="font-poppins text-h3">
          My bookings ({bookings.length})
        </h2>

        {bookings.length === 0 && <p>No bookings yet.</p>}

        {bookings.map((booking) => (
          <InfoCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
