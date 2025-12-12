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
    try {
      const res = await fetch(API_BASE + AUTH_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager
        })
      })
      const data = await res.json();
      const errorData = {};
      if (password !== confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      }
      if (!res.ok) {
        data.errors.forEach(error => {
          const field = error.path[0];
          errorData[field] = error.message;
        })

        setErrors(errorData);
      } else {
        setRegisterSuccess(true)
        { setTimeout(() => { setRegisterSuccess(prev => !prev) }, 4000) }
      }
    } catch (error) {
      setCatchErrorCheck(true);
      setCatchError(error.message);
    }
  }
  return (
    <div className={`max-w-md mx-auto py-24 min-h-[88.6vh] ${"loading && flex flex-col justify-center items-center"}`}>
      {loading ? <Loader /> : (
        <>
          <h1 className="text-2xl font-bold text-center mb-12 mt-20">Sign up</h1>
          <form onSubmit={handleSubmit} className="bg-light-grey border rounded-xl mx-10 py-8 flex flex-col justify-center">
            <div className="mx-10 py-3 flex flex-col gap-1">
              <label className="text-1xl" htmlFor="username">Username</label>
              <input
                className="bg-white w-full border h-7  pl-2 py-4"
                id="username"
                type="text"
                onChange={(e) => setName(e.target.value)} />
              {errors.name && <small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">{errors.name}</small>}
            </div>
            <div className="mx-10 py-3 flex flex-col gap-1">
              <label className="text-1xl" htmlFor="email">Email</label>
              <input
                className="bg-white w-full border h-7 pl-2 py-4"
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">{errors.email}</small>}
            </div>
            <div className="mx-10 py-3 flex flex-col gap-1 ">
              <label className="text-1xl" htmlFor="password">Password</label>
              <input
                className="bg-white w-full border h-7 pl-2 py-4"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">{errors.password}</small>}
            </div>
            <div className="mx-10 py-3 flex flex-col gap-1 ">
              <label className="text-1xl" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="bg-white w-full border h-7 pl-2 py-4"
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)} />
              {errors.confirmPassword && (<small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">{errors.confirmPassword}</small>)}
            </div>
            <div className="mx-10 py-3 flex items-center gap-3 flex-row-reverse justify-end">
              <label htmlFor="venueManager" className="text-md font-rubik">
                Register as a venue manager
              </label>
              <input
                id="venueManager"
                type="checkbox"
                className="w-5 h-5 pl-2 py-4"
                onChange={(e) => { setVenueManager(e.target.checked) }}
              />
            </div>
            <button type="submit" className="cursor-pointer bg-green-600  h-10 text-white mx-10 font-bold font-poppins">Register</button>
            {registerSuccess && <small className="mx-10 py-3 text-color-600 bg-green-200 px-2 my-4 border-green-500 border"> Registration is successful!</small>}
            <p className="text-center text-1xl py-3 flex flex-col">Already have an account? <Link to="/login" className="cursor-pointer text-accent-aqua font-bold"> Login here</Link></p>
            {catchErrorCheck && (<small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border text-center mx-10">{catchError}</small>)}
          </form>
        </>)}
    </div >
  )
}

export default Register;