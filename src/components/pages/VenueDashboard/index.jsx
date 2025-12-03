import InfoCard from "../../ui/Cards/InfoCard";

const VenueDashboard = () => {
  return (
    <div>
      <div className="bg-dark-navy-blue h-[35vh] flex flex-col justify-center items-center px-4 text-center gap-6">
        <h1 className="text-white font-poppins mt-10 text-h1">Venue Dashboard</h1>
      </div>
      <div className=" max-w-md md:max-w-7xl w-full mx-auto px-4">
        <h2 className="text-poppins text-h2 text-center my-10">My bookings (3)</h2>
        <p className="flex items-center text-p lg:text-2xl"><svg className="w-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"></path> </g></svg>Back</p>
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  )
}

export default VenueDashboard;