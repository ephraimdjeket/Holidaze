const ProfileModal = ({ openModal, closeModal }) => {
  return (
    <>
      {openModal ? <div className="fixed inset-0 bg-black/60 w-full z-50 flex justify-center items-center px-4 overflow-hidden">
        <form action="#" className="bg-light-grey w-full border rounded-xl px-10 max-w-98 font-rubik relative py-5">
          <svg onClick={() => {
            { closeModal(prev => !prev) }
          }} className="w-8 ml-auto cursor-pointer absolute right-3 top-3" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>
          <h2 className="text-center font-poppins text-h3 font-bold my-4">Update Profile</h2>
          <div className="py-3 flex flex-col gap-1">
            <label className="text-p" htmlFor="avatar">Avatar URL</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="text"
              id="avatar"
              required
            />
          </div>
          <div className="py-3 flex flex-col gap-1">
            <label className="text-p" htmlFor="banner">Banner URL</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="text"
              id="banner"
              required
            />
          </div>
          <div className="py-3 flex flex-col gap-1">
            <label className="text-p" htmlFor="bio">Bio</label>
            <textarea
              className="w-full bg-white rounded border h-28 pl-2"
              type="text"
              id="bio"
              required
            />
          </div>
          <button type="submit" className="cursor-pointer bg-green-600   text-white my-5 font-bold font-poppins text-p w-full items-center py-2 rounded hover:bg-green-700">Update</button>
        </form>
      </div> : null}
    </>
  )
}

export default ProfileModal;