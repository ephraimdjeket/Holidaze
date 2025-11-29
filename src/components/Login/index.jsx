const Login = () => {
  return (
    <div className="h-full py-24">
      <h1 className="text-2xl font-bold text-center mb-12">Welcome to Holidaze - Login</h1>
      <form className="bg-light-grey border rounded-xl mx-10 py-8 flex flex-col justify-center">
        <div className="mx-10 py-3 flex flex-col gap-1 ">
          <label className="text-1xl" htmlFor="Email">Email</label>
          <input className="bg-white w-full border h-7 " type="text" />
        </div>
        <div className="mx-10 py-3 flex flex-col gap-1 ">
          <label className="text-1xl" htmlFor="Password">Password</label>
          <input className="bg-white w-full border h-7 " type="text" />
        </div>
        <p className="text-center text-1xl py-3">Don’t have an account?<span className="cursor-pointer text-accent-aqua font-bold"> Register here</span></p>
        <button className="cursor-pointer bg-green-600  h-10 text-white mx-10">Login</button>
      </form>
    </div>
  )
}

export default Login;