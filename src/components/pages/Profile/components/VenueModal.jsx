import { useState } from "react";
import { API_BASE, HOLIDAZE_VENUES } from "../../../../api/config.mjs";

const VenueModal = ({ openModal, closeModal }) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    imageUrl: "",
    city: "",
    country: "",
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          [id]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsError(false);

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      media: formData.imageUrl
        ? [{ url: formData.imageUrl, alt: formData.name }]
        : [],
      meta: formData.meta,
      location: {
        city: formData.city,
        country: formData.country,
      },
    };

    try {
      const response = await fetch(`${API_BASE}${HOLIDAZE_VENUES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": localStorage.getItem("apiKey"),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setStatusMessage(data.errors?.[0]?.message || "Something went wrong");
        return;
      }

      setIsError(false);
      closeModal(false);
    } catch (error) {
      setIsError(true);
      setStatusMessage(error.message);
    }
  };

  return (
    <>
      {openModal ? (
        <div className="fixed inset-0 bg-black/60 w-full z-50 flex justify-center items-center px-4 overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="bg-light-grey w-full max-w-3xl border rounded-xl px-10 font-rubik relative py-5 overflow-y-auto max-h-[80vh]"
          >
            <svg
              onClick={() => closeModal(false)}
              className="w-8 ml-auto cursor-pointer absolute right-3 top-3"
              fill="#000000"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
            </svg>

            <h2 className="text-center font-poppins text-h3 font-bold my-4">
              Create a venue
            </h2>

            <div className="flex flex-col md:flex-row justify-between md:gap-10">
              <div className="w-full flex flex-col">
                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="name">Title</label>
                  <input
                    className="w-full bg-white rounded border h-7 pl-2 py-4"
                    type="text"
                    id="name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="w-full bg-white rounded border h-28 pl-2"
                    id="description"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="country">Country</label>
                  <input
                    className="w-full bg-white rounded border h-7 pl-2 py-4"
                    type="text"
                    id="country"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="city">City</label>
                  <input
                    className="w-full bg-white rounded border h-7 pl-2 py-4"
                    type="text"
                    id="city"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2">
                  <div className="flex gap-2">
                    <input type="checkbox" id="wifi" onChange={handleChange} />
                    <label htmlFor="wifi">Wifi</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id="pets" onChange={handleChange} />
                    <label htmlFor="pets">Pets</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="breakfast"
                      onChange={handleChange}
                    />
                    <label htmlFor="breakfast">Breakfast</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="parking"
                      onChange={handleChange}
                    />
                    <label htmlFor="parking">Parking</label>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="maxGuests">Max guests</label>
                  <input
                    className="w-full bg-white rounded border h-7 pl-2 py-4"
                    type="number"
                    id="maxGuests"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="price">Price per night</label>
                  <input
                    className="w-full bg-white rounded border h-7 pl-2 py-4"
                    type="number"
                    id="price"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="py-3 flex flex-col gap-1">
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    className="w-full bg-white rounded border h-7 pl-2 py-4"
                    type="text"
                    id="imageUrl"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-green-600 text-white my-5 font-bold w-full py-2 rounded hover:bg-green-700"
            >
              Add Venue
            </button>
            {isError && (<small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">
              {statusMessage}
            </small>)}
          </form>
        </div>
      ) : null}
    </>
  );
};

export default VenueModal;
