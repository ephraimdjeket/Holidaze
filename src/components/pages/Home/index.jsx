import beachbg from "../../../assets/wooden-beach-resort.jpg";
import Card from "../../ui/Cards/Card";

const Home = () => {
  return (
    <>
      <div
        className="relative h-[55vh] lg:h-[70vh] max-h-[70vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${beachbg})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center px-6">
          <div className="text-white flex flex-col items-center lg:items-start justify-center lg:justify-start text-center w-full max-w-7xl ">
            <h1 className="font-bold font-poppins text-center lg:text-left text-h1 lg:text-6xl max-w-3xl">Every destination, one click away.</h1>
            <p className="font-rubik text-body lg:text-2xl my-2 lg:my-4">Book your next accommodation here
              at affordable prices</p>
            <button className="bg-primary-blue px-8 py-3 rounded-2xl font-bold cursor-pointer font-poppins w-full max-w-62">Book now</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-center bg-light-grey py-12 px-6">
        <h2 className="font-bold text-h2">Host. Manage. Profit.</h2>
        <p className="px-2 font-rubik text-body max-w-2xl mx-auto">Step into the spotlight as a Venue Manager. List your space, set the rules, and watch bookings roll in. It’s your venue — we just help you make the most of it.</p>
        <button className="bg-primary-blue px-8 py-2 rounded-2xl font-bold mt-4 text-white cursor-pointer font-poppins max-w-90 mx-auto">Register as a venue manager</button>
      </div>
      <h2 className="font-poppins text-h2 text-center mt-6">Popular Accomodations</h2>
      <div className="flex flex-col md:flex-row justify-center mx-auto py-5 px-6 w-full max-w-7xl">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl place-items-center">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  )
}

export default Home;