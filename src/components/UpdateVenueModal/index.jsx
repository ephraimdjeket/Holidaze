import { useEffect, useState } from "react";
import { API_BASE } from "../../api/config.mjs";

const UpdateVenueModal = ({ openModal, closeModal, venue, onUpdated }) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (venue) {
      setForm({
        name: venue.name || "",
        description: venue.description || "",
        price: venue.price || 0,
        maxGuests: venue.maxGuests || 1,
      });
    }
  }, [venue]);

  if (!openModal || !form) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}holidaze/venues/${venue.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.[0]?.message || "Update failed");
      }

      onUpdated(data.data);
      closeModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 w-full z-50 flex justify-center items-center px-4 overflow-hidden">
      <div className="bg-light-grey w-full max-w-3xl border rounded-xl px-10 font-rubik relative py-5 overflow-y-auto max-h-[80vh]">
        <svg
          onClick={() => closeModal(false)}
          className="w-8 ml-auto cursor-pointer absolute right-3 top-3"
          fill="#000000"
          viewBox="0 0 32 32"
        >
          <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
        </svg>

        <h2 className="text-center font-poppins text-h3 font-bold my-4">
          Update venue
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="w-full flex flex-col">
              <div className="py-3 flex flex-col gap-1">
                <label>Title</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="py-3 flex flex-col gap-1">
                <label>Description</label>
                <textarea
                  className="w-full bg-white rounded border h-28 pl-2"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="py-3 flex flex-col gap-1">
              <label>Max guests</label>
              <input
                type="number"
                className="w-full bg-white rounded border h-7 pl-2 py-4"
                value={form.maxGuests}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxGuests: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="py-3 flex flex-col gap-1">
              <label>Price per night</label>
              <input
                type="number"
                className="w-full bg-white rounded border h-7 pl-2 py-4"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {error && <p className="text-red-600 mt-3">{error}</p>}

          <button
            disabled={loading}
            className="cursor-pointer bg-primary-blue text-white my-5 font-bold w-full py-2 rounded"
          >
            {loading ? "Updating..." : "Update venue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVenueModal;
