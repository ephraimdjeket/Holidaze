import { useState, useEffect } from "react";
import { API_BASE, UPDATE_PROFILE } from "../../../../api/config.mjs";
import { UseAuth } from "../../../context/AuthContext";

const ProfileModal = ({ openModal, closeModal, userName, venueManager }) => {
  const [avatarURL, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(false);

  const { setUser } = UseAuth();

  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    if (openModal) {
      setIsVenueManager(venueManager);
    }
  }, [openModal, venueManager]);

  async function updateAvatar(e) {
    e.preventDefault();
    setError("");

    const body = {
      avatar: { url: avatarURL, alt: "Profile avatar" },
      banner: { url: bannerUrl, alt: "Profile banner" },
      bio,
      venueManager: isVenueManager,
    };

    try {
      const res = await fetch(
        API_BASE + UPDATE_PROFILE + `/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Failed to update profile");
      }

      const profileRes = await fetch(
        `${API_BASE}${UPDATE_PROFILE}/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

      const profileData = await profileRes.json();
      const storedUser = JSON.parse(localStorage.getItem("user"));

      const updatedUser = {
        ...storedUser,
        ...profileData.data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      closeModal(false);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 w-full z-50 flex justify-center items-center px-4">
      <form
        onSubmit={updateAvatar}
        className="bg-light-grey w-full border rounded-xl px-10 max-w-98 font-rubik relative py-5"
      >
        <svg
          onClick={() => closeModal(false)}
          className="w-8 ml-auto cursor-pointer absolute right-3 top-3"
          fill="#000000"
          viewBox="0 0 32 32"
        >
          <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5 5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
        </svg>

        <h2 className="text-center font-poppins text-h3 font-bold my-4">
          Update Profile
        </h2>

        <div className="py-3 flex flex-col gap-1">
          <label htmlFor="avatar">Avatar URL</label>
          <input
            className="w-full bg-white rounded border py-2 px-2"
            type="text"
            id="avatar"
            onChange={(e) => setAvatarUrl(e.target.value)}
            required
          />
        </div>

        <div className="py-3 flex flex-col gap-1">
          <label htmlFor="banner">Banner URL</label>
          <input
            className="w-full bg-white rounded border py-2 px-2"
            type="text"
            id="banner"
            onChange={(e) => setBannerUrl(e.target.value)}
            required
          />
        </div>

        <div className="py-3 flex flex-col gap-1">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="w-full bg-white rounded border h-28 px-2"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>

        <div className="py-3 flex items-center gap-2">
          <input
            id="venueManager"
            type="checkbox"
            className="w-5 h-5 cursor-pointer"
            checked={isVenueManager}
            onChange={(e) => setIsVenueManager(e.target.checked)}
          />
          <label
            htmlFor="venueManager"
            className="text-md font-rubik cursor-pointer select-none"
          >
            Register as a venue manager
          </label>
        </div>

        {error && (
          <p className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white my-5 font-bold w-full py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileModal;
