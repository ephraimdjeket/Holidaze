const Register = () => {
  return (
    <div className="h-full py-24">
      <h1 className="text-2xl font-bold text-center mb-12">Sign up</h1>
      <form className="bg-light-grey border rounded-xl mx-10 py-8 flex flex-col justify-center">
        <div className="mx-10 py-3 flex flex-col gap-1 ">
          <label className="text-1xl" htmlFor="Email">Email</label>
          <input className="bg-white w-full border h-7 " type="text" />
        </div>
        <div className="mx-10 py-3 flex flex-col gap-1 ">
          <label className="text-1xl" htmlFor="Password">Password</label>
          <input className="bg-white w-full border h-7 " type="text" />
        </div>
        <div className="mx-10 py-3 flex flex-col gap-1 ">
          <label className="text-1xl" htmlFor="Password-two">Confirm Password</label>
          <input className="bg-white w-full border h-7 " type="text" />
        </div>
        <div className="mx-10 py-3 flex flex-col gap-1 ">
          <label className="text-1xl" htmlFor="Avatar">Avatar URL (Optional)</label>
          <input className="bg-white w-full border h-7 " type="text" />
        </div>
        <div className="mx-10 py-3 flex items-center gap-3">
          <input
            id="Avatar"
            type="checkbox"
            className="w-5 h-5"
          />
          <label htmlFor="Avatar" className="text-lg">
            Register as a host
          </label>
        </div>
        <button className="cursor-pointer bg-green-600  h-10 text-white mx-10 font-bold">Register</button>
        <p className="text-center text-1xl py-3">Already have an account?<span className="cursor-pointer text-accent-aqua font-bold"> Login here</span></p>
      </form>
    </div>
  )
}

export default Register;