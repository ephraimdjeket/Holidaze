import { useEffect, useState } from "react";
import beachbg from "../../../assets/wooden-beach-resort.jpg";
import { API_BASE, HOLIDAZE_VENUES } from "../../../api/config.mjs";
import Card from "../../ui/Cards/Card";
import Loader from "../../ui/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const res = await fetch(
          `${API_BASE}${HOLIDAZE_VENUES}/?limit=3&sort=rating&sortOrder=desc`
        );
        const data = await res.json();
        setVenues(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  return (
    <>
      <div
        className="relative h-[55vh] lg:h-[70vh] max-h-[70vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${beachbg})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center px-6">
          <div className="text-white flex flex-col items-center lg:items-start justify-center lg:justify-start text-center w-full max-w-7xl">
            <h1 className="font-bold font-poppins text-center lg:text-left text-h1 lg:text-6xl max-w-3xl">
              Every destination, one click away.
            </h1>
            <p className="font-rubik text-body lg:text-2xl my-2 lg:my-4">
              Book your next accommodation here at affordable prices
            </p>
            <Link to="/accomodations" className="bg-primary-blue px-8 py-3 rounded-2xl font-bold cursor-pointer font-poppins w-full max-w-60">
              Book now
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-center bg-light-grey py-12 px-6">
        <h2 className="font-bold text-h2">Host. Manage. Profit.</h2>
        <p className="px-2 font-rubik text-body max-w-2xl mx-auto">
          Step into the spotlight as a Venue Manager. List your space, set the rules,
          and watch bookings roll in.
        </p>
        <Link
          to="/profile"
          className="bg-primary-blue px-8 py-2 rounded-2xl font-bold mt-4 text-white cursor-pointer font-poppins max-w-90 mx-auto"
        >
          Register as a venue manager
        </Link>
      </div>

      <h2 className="font-poppins text-h2 text-center mt-6">
        Popular Accomodations
      </h2>

      <div className="flex flex-col items-center md:flex-row justify-center mx-auto py-5 px-6 w-full max-w-7xl">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl place-items-center">
            {venues.map((venue) => (
              <Card key={venue.id} venueDetails={venue} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
