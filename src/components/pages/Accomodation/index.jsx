import Card from "../../ui/Cards/Card";
import { useState, useEffect } from "react";
import { API_BASE, HOLIDAZE_VENUES } from "../../../api/config.mjs";
import Loader from "../../ui/Loader";

const Accomodation = () => {
  const [loader, setLoader] = useState(false);
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setLoader(true);
    async function holidazeVenues() {
      try {
        const res = await fetch(API_BASE + HOLIDAZE_VENUES);
        if (!res.ok) {
          setLoader(false);
          console.log(res.status)
        } else {
          const data = await res.json();
          setVenues(data.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoader(false);
      }
    }
    holidazeVenues();

  }, [])

  const filteredVenues = venues.filter((venue) => {
    return venue.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="bg-dark-navy-blue h-[45vh] flex flex-col justify-center items-center px-4 text-center gap-6">
        <h1 className="text-white font-poppins mt-10 text-h1">Find your accomodation, anywhere</h1>
        <p className="text-white font-rubik text-p">Discover stays around the world at prices that fit your journey.</p>
        <input type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          className="w-full h-9 bg-white rounded-xl outline-none pl-3 max-w-88" />
      </div>
      {loader ? (
        <div className="flex justify-center items-center mx-auto h-[45vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid mx-auto justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center max-w-7xl">
          {filteredVenues.length === 0 ? (
            <h3 className="flex items-center text-h3 font-poppins mx-auto h-[45vh] col-span-full text-center">No venues found</h3>
          ) : (
            filteredVenues.map((venue) => (
              <Card key={venue.id} venueDetails={venue} />
            ))
          )}
        </div>
      )}

    </>
  )
}

export default Accomodation;