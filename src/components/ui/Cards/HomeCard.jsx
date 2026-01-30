import placeholder from "../../../assets/wooden-beach-resort.jpg";

const HomeCard = () => {
  return (
    <article className="flex flex-col bg-light-grey w-full max-w-78 rounded-lg drop-shadow-2xl my-10 border-b border-r border-l overflow-hidden">
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={placeholder}
        alt="Venue preview"
      />

      <div className="flex justify-between px-6 my-2 items-center">
        <h3 className="text-h3 font-poppins">Beach Resort</h3>
        <span className="flex items-center font-bold text-2xl">
          ⭐ 4.8
        </span>
      </div>

      <div className="flex my-2 mx-6">
        <span className="font-rubik text-p">Maldives</span>
      </div>

      <div className="flex my-2 mx-6 gap-1">
        <span className="font-rubik text-p">$180 / night</span>
      </div>

      <button className="bg-dark-navy-blue text-white rounded-lg mx-6 my-6 py-1 cursor-pointer font-poppins">
        View details
      </button>
    </article>
  );
};

export default HomeCard;
