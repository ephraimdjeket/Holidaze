import { useState } from "react";
import { API_BASE, AUTH_LOGIN } from "../../../api/config.mjs";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [catchErrorCheck, setCatchErrorCheck] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setCatchErrorCheck(false);
    try {
      const res = await fetch(API_BASE + AUTH_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json();
      const errorData = {};
      if (!res.ok) {
        data.errors.forEach(error => {
          if (error.path) {
            const field = error.path[0] || "general";
            errorData[field] = error.message;
          } else {
            errorData.general = error.message;
          }
        })
        setErrors(errorData);
      }
    } catch (error) {
      setCatchErrorCheck(true);
      setCatchError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={`max-w-md mx-auto py-24 min-h-[88.6vh] ${loading && "flex flex-col justify-center items-center"}`} >
      {loading ? (<Loader />) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-12 mt-20">Welcome to Holidaze - Login</h1>
          <form onSubmit={handleSubmit} className="bg-light-grey border rounded-xl mx-10 py-8 flex flex-col justify-center">
            <div className="mx-10 py-3 flex flex-col gap-1">
              <label className="text-1xl" htmlFor="Email">Email</label>
              <input className="bg-white w-full border h-7 pl-2 py-4"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (<small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">{errors.email}</small>)}
            </div>
            <div className="mx-10 py-3 flex flex-col gap-1">
              <label className="text-1xl" htmlFor="Password">Password</label>
              <input className="bg-white w-full border h-7 pl-2 py-4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.general && (<small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border">{errors.general}</small>)}
            </div>
            <button className="cursor-pointer bg-green-600  h-10 text-white mx-10">Login</button>
            <p className="text-center text-1xl py-3 flex flex-col">Don’t have an account?<Link to="/register" className="cursor-pointer text-accent-aqua font-bold"> Register here</Link></p>
            {catchErrorCheck && (<small className="text-color-600 bg-red-200 py-2 px-2 my-2 border-red-500 border text-center mx-10">{catchError}</small>)}
          </form>
        </>)
      }
    </div >
  )
}

export default Login;