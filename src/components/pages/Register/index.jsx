import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE, AUTH_REGISTER } from "../../../api/config.mjs";
import Loader from "../../ui/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [catchErrorCheck, setCatchErrorCheck] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setCatchErrorCheck(false);

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_BASE + AUTH_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorData = {};
        data.errors?.forEach((error) => {
          errorData[error.path?.[0] || "general"] = error.message;
        });
        setErrors(errorData);
        return;
      }

      setRegisterSuccess(true);
      setTimeout(() => setRegisterSuccess(false), 4000);
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
            Sign up
          </h1>

          <form onSubmit={handleSubmit} className="bg-light-grey border rounded-xl mx-10 py-8 flex flex-col">
            <div className="mx-10 py-3 flex flex-col gap-1">
              <label>Username</label>
              <input
                className="bg-white border h-7 pl-2 py-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <small className="bg-red-200 border border-red-500 p-2">{errors.name}</small>}
            </div>

            <div className="mx-10 py-3 flex flex-col gap-1">
              <label>Email</label>
              <input
                className="bg-white border h-7 pl-2 py-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className="bg-red-200 border border-red-500 p-2">{errors.email}</small>}
            </div>

            <div className="mx-10 py-3 flex flex-col gap-1">
              <label>Password</label>
              <input
                className="bg-white border h-7 pl-2 py-4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small className="bg-red-200 border border-red-500 p-2">{errors.password}</small>}
            </div>

            <div className="mx-10 py-3 flex flex-col gap-1">
              <label>Confirm Password</label>
              <input
                className="bg-white border h-7 pl-2 py-4"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <small className="bg-red-200 border border-red-500 p-2">{errors.confirmPassword}</small>
              )}
            </div>

            <div className="mx-10 py-3 flex items-center gap-3">
              <input
                id="venueManager"
                type="checkbox"
                checked={venueManager}
                onChange={(e) => setVenueManager(e.target.checked)}
              />
              <label htmlFor="venueManager">Register as a venue manager</label>
            </div>

            <button type="submit" className="bg-green-600 h-10 text-white mx-10 font-bold cursor-pointer">
              Register
            </button>

            {registerSuccess && (
              <small className="mx-10 mt-4 bg-green-200 border border-green-500 p-2">
                Registration successful!
              </small>
            )}

            {catchErrorCheck && (
              <small className="mx-10 mt-4 bg-red-200 border border-red-500 p-2">
                {catchError}
              </small>
            )}

            <p className="text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-accent-aqua font-bold ml-1">
                Login here
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
