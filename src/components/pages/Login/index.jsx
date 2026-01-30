import { useState } from "react";
import { API_BASE, AUTH_LOGIN, UPDATE_PROFILE } from "../../../api/config.mjs";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { UseAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [catchErrorCheck, setCatchErrorCheck] = useState(false);

  const { setUser } = UseAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setCatchErrorCheck(false);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    try {
      const res = await fetch(API_BASE + AUTH_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorData = {};
        data.errors?.forEach(err => {
          const field = err.path?.[0] || "general";
          errorData[field] = err.message;
        });
        setErrors(errorData);
        setLoading(false);
        return;
      }

      const token = data.data.accessToken;
      const name = data.data.name;

      localStorage.setItem("accessToken", token);

      if (!localStorage.getItem("apiKey")) {
        const keyRes = await fetch(`${API_BASE}auth/create-api-key`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Holidaze App Key" }),
        });

        const keyData = await keyRes.json();
        localStorage.setItem("apiKey", keyData.data.key);
      }

      const profileRes = await fetch(
        `${API_BASE}${UPDATE_PROFILE}/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
        }
      );

      const profileData = await profileRes.json();

      const user = {
        name: data.data.name,
        email: data.data.email,
        venueManager: profileData.data.venueManager,
        avatar: profileData.data.avatar,
        banner: profileData.data.banner,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      navigate("/home");
    } catch (error) {
      setCatchErrorCheck(true);
      setCatchError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`max-w-md mx-auto py-24 min-h-[88.6vh] ${loading && "flex justify-center items-center"}`}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-12 mt-20">
            Welcome to Holidaze - Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-light-grey border rounded-xl mx-10 py-8 flex flex-col"
          >
            <div className="mx-10 py-3 flex flex-col gap-1">
              <label>Email</label>
              <input
                className="bg-white w-full border h-7 pl-2 py-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className="bg-red-200 p-2">{errors.email}</small>}
            </div>

            <div className="mx-10 py-3 flex flex-col gap-1">
              <label>Password</label>
              <input
                className="bg-white w-full border h-7 pl-2 py-4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.general && <small className="bg-red-200 p-2">{errors.general}</small>}
            </div>

            <button className="bg-green-600 h-10 text-white mx-10 mt-4 cursor-pointer">
              Login
            </button>

            <p className="text-center py-3">
              Don’t have an account?
              <Link to="/register" className="text-accent-aqua font-bold block">
                Register here
              </Link>
            </p>

            {catchErrorCheck && (
              <small className="bg-red-200 p-2 mx-10 text-center">
                {catchError}
              </small>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
