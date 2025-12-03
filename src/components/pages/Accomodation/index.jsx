import Card from "../../ui/Cards/Card";

const Accomodation = () => {
  return (
    <div>
      <div className="bg-dark-navy-blue h-[45vh] flex flex-col justify-center items-center px-4 text-center gap-6">
        <h1 className="text-white font-poppins mt-10 text-h1">Find your accomodation, anywhere</h1>
        <p className="text-white font-rubik text-p">Discover stays around the world at prices that fit your journey.</p>
        <input type="text"
          value="Search"
          className="w-full h-9 bg-white rounded-xl outline-none pl-3 max-w-88" />
      </div>
      <div className="grid mx-auto justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-items-center max-w-7xl">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Accomodation;