import { useState, useEffect } from "react";
import ProfileModal from "./components/ProfileModal";
import VenueModal from "./components/VenueModal";
import BookingCard from "../../ui/Cards/BookingCard";
import Loader from "../../ui/Loader";
import { API_BASE, UPDATE_PROFILE } from "../../../api/config.mjs";
import { UseAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = UseAuth();

  const [venueManager, setVenueManager] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [venueModal, setVenueModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (user?.venueManager !== undefined) {
      setVenueManager(user.venueManager);
    }
  }, [user]);

  useEffect(() => {
    if (profileModal || venueModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [profileModal, venueModal]);

  useEffect(() => {
    if (!user || !accessToken) return;

    async function fetchBookings() {
      try {
        const res = await fetch(
          `${API_BASE}${UPDATE_PROFILE}/${user.name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
  }, [user, apiKey, accessToken]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProfileModal
        openModal={profileModal}
        closeModal={setProfileModal}
        userName={user.name}
        venueManager={venueManager}
        setVenueManager={setVenueManager}
      />

      <VenueModal openModal={venueModal} closeModal={setVenueModal} />

      <div>
        <img
          className="w-full max-w-7xl mx-auto h-48 md:h-64 rounded-xl object-cover object-center shadow-sm"
          src={user.banner?.url}
          alt={user.banner?.alt || "User banner"}
        />

        <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row px-4">
          <img
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg z-10 -mt-5"
            src={user.avatar?.url}
            alt={user.avatar?.alt || "User profile picture"}
          />

          <div className="mt-2 md:ml-5 flex flex-col gap-2">
            <h1 className="text-center md:text-left text-h2 font-poppins">
              {user.name}
            </h1>
            <p className="text-p font-rubik">{user.email}</p>
            {user.bio && <p className="text-p font-rubik">{user.bio}</p>}
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center gap-5 my-15 md:flex-row px-4">
          <button
            onClick={() => setProfileModal(true)}
            className="bg-primary-blue rounded-md px-6 py-1 text-white w-48 cursor-pointer"
          >
            Update profile
          </button>

          {venueManager && (
            <>
              <button
                onClick={() => setVenueModal(true)}
                className="bg-primary-blue rounded-md px-6 py-1 text-white w-48 cursor-pointer"
              >
                Create a venue
              </button>

              <Link
                to="/venue-dashboard"
                className="bg-primary-blue rounded-md px-6 py-1 text-white w-48 text-center cursor-pointer"
              >
                Venue Dashboard
              </Link>
            </>
          )}
        </div>

        <div className="text-center md:text-left max-w-md md:max-w-7xl mx-auto px-4">
          <h2 className="font-poppins text-h3">
            My bookings ({bookings.length})
          </h2>

          {bookings.length === 0 && <p>No bookings yet.</p>}

          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
