const VenueModal = ({ openModal, closeModal }) => {
  return (
    <>
      {openModal ? <div className="fixed inset-0 bg-black/60 w-full z-50 flex justify-center items-center px-4 overflow-hidden">
        <form action="#" className="bg-light-grey w-full max-w-3xl border rounded-xl px-10 font-rubik relative py-5 overflow-y-auto max-h-[80vh]">
          <svg onClick={() => {
            { closeModal(prev => !prev) }
          }} className="w-8 ml-auto cursor-pointer absolute right-3 top-3" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>
          <h2 className="text-center font-poppins text-h3 font-bold my-4">Create a venue</h2>
          <div className="flex flex-col md:flex-row justify-between md:gap-10">
            <div className="w-full flex flex-col">
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="title">Title</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  type="text"
                  id="title"
                  required
                />
              </div>
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="description">Description</label>
                <textarea
                  className="w-full bg-white rounded border h-28 pl-2"
                  type="text"
                  id="description"
                  required
                />
              </div>
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="country">Country</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  type="text"
                  id="country"
                  required
                />
              </div>
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="city">City</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  type="text"
                  id="city"
                  required
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="flex gap-2">
                  <input className="cursor-pointer w-4" type="checkbox"
                    name="test" />
                  <label htmlFor="wifi">Wifi</label>
                </div>
                <div className="flex gap-2">
                  <input className="cursor-pointer w-4" type="checkbox"
                    name="test" />
                  <label htmlFor="pets">Pets</label>
                </div>
                <div className="flex gap-2">
                  <input className="cursor-pointer w-4" type="checkbox"
                    name="test" />
                  <label htmlFor="breakfast">Breakfast</label>
                </div>
                <div className="flex gap-2">
                  <input className="cursor-pointer w-4" type="checkbox"
                    name="test" />
                  <label htmlFor="parking">Parking</label>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="maxguests">Max guests</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  type="number"
                  id="maxguests"
                  required
                />
              </div>
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="priceprnight">Price per night</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  type="number"
                  id="priceprnight"
                  required
                />
              </div>
              <div className="py-3 flex flex-col gap-1">
                <label className="text-p" htmlFor="imageurl">Image URL</label>
                <input
                  className="w-full bg-white rounded border h-7 pl-2 py-4"
                  type="text"
                  id="imageurl"
                  required
                />
              </div>
              <span className="text-p cursor-pointer">+ Add another image</span>
            </div>
          </div>
          <button type="submit" className="cursor-pointer bg-green-600   text-white my-5 font-bold font-poppins text-p w-full items-center py-2 rounded hover:bg-green-700">Add Venue</button>
        </form>
      </div> : null}
    </>
  )
}

export default VenueModal;