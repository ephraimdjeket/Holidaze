import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE, UPDATE_PROFILE, HOLIDAZE_VENUES } from "../../../api/config.mjs";
import { UseAuth } from "../../context/AuthContext";
import Loader from "../../ui/Loader";
import VenueCard from "../../ui/Cards/VenueCard";
import UpdateVenueModal from "../../UpdateVenueModal";

const VenueDashboard = () => {
  const { user } = UseAuth();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [catchErrorCheck, setCatchErrorCheck] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!user) return;

    async function fetchVenues() {
      setLoading(true);
      setCatchError("");
      setCatchErrorCheck(false);

      try {
        const res = await fetch(
          `${API_BASE}${UPDATE_PROFILE}/${user.name}/venues?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "X-Noroff-API-Key": apiKey,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.errors?.[0]?.message || "Failed to fetch venues");
        }

        setVenues(data.data || []);
      } catch (error) {
        setCatchErrorCheck(true);
        setCatchError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [user, apiKey, accessToken]);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this venue?")) return;

    try {
      const res = await fetch(`${API_BASE}${HOLIDAZE_VENUES}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete venue");
      }

      setVenues((prev) => prev.filter((venue) => venue.id !== id));
    } catch (error) {
      alert(error.message);
    }
  }

  function openUpdateModal(venue) {
    setSelectedVenue(venue);
    setUpdateModal(true);
  }

  function handleVenueUpdated(updatedVenue) {
    setVenues((prev) =>
      prev.map((v) => (v.id === updatedVenue.id ? updatedVenue : v))
    );
  }

  return (
    <div className="min-h-screen">
      <UpdateVenueModal
        openModal={updateModal}
        closeModal={setUpdateModal}
        venue={selectedVenue}
        onUpdated={handleVenueUpdated}
      />

      <div className="bg-dark-navy-blue h-[35vh] flex flex-col justify-center items-center px-4 text-center gap-6">
        <h1 className="text-white font-poppins mt-10 text-h1">
          Venue Dashboard
        </h1>
      </div>

      <div className="max-w-md md:max-w-7xl w-full mx-auto px-4 py-10">
        <Link
          to="/profile"
          className="flex items-center text-button text-2xl font-rubik mb-5 cursor-pointer"
        >
          &lt; Back
        </Link>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            <h2 className="text-poppins text-h2 text-center my-10">
              My venues ({venues.length})
            </h2>

            {venues.length === 0 && !catchErrorCheck && (
              <p className="text-center">
                You haven’t created any venues yet.
              </p>
            )}

            {venues.map((venue) => (
              <div key={venue.id} className="mb-10">
                <VenueCard venue={venue} />

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => openUpdateModal(venue)}
                    className="cursor-pointer bg-primary-blue text-white px-4 py-1 rounded-md"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="cursor-pointer bg-red-600 text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {catchErrorCheck && (
          <small className="block text-color-600 bg-red-200 py-3 px-4 mt-6 border-red-500 border text-center">
            {catchError}
          </small>
        )}
      </div>
    </div>
  );
};

export default VenueDashboard;
