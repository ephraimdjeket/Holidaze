import { API_BASE, HOLIDAZE_VENUES, CREATE_BOOKING } from "../../../api/config.mjs";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
const ViewDetail = ({ viewImage, setViewImage }) => {
  const [detailVenue, setDetailVenue] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [amountOfNights, setAmountOfNights] = useState(null);
  const [booking, setBooking] = useState(false);

  const [errors, setErrors] = useState({});
  const [catchError, setCatchError] = useState("");
  const [catchErrorCheck, setCatchErrorCheck] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    async function fetchVenues() {
      try {
        const res = await fetch(`${API_BASE}${HOLIDAZE_VENUES}/${id}`);
        const data = await res.json();
        if (res.ok) {
          setDetailVenue(data.data);
        }
      } catch (error) {
        setCatchErrorCheck(true);
        setCatchError(error.message);
      } finally {
        console.log("done");
      }
    }
    fetchVenues();
  }, [id]);

  async function bookNow(e) {
    e.preventDefault();

    setErrors({});
    setCatchError("");
    setCatchErrorCheck(false);

    const errorData = {};

    if (!checkInDate) errorData.checkIn = "Check-in date is required";
    if (!checkOutDate) errorData.checkOut = "Check-out date is required";
    if (!numberOfGuests || numberOfGuests < 1) {
      errorData.guests = "At least 1 guest is required";
    }
    if (!amountOfNights || amountOfNights <= 0) {
      errorData.dates = "Check-out must be after check-in";
    }

    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
      return;
    }

    const token = localStorage.getItem("token");

    const bookingData = {
      dateFrom: checkInDate,
      dateTo: checkOutDate,
      guests: Number(numberOfGuests),
      venueId: id,
    };
  }

  useEffect(() => {
    if (!checkInDate || !checkOutDate) return;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut - checkIn;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    setAmountOfNights(diffDays > 0 ? diffDays : 0);
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    document.body.style.overflow = viewImage ? "hidden" : "auto";
  }, [viewImage]);

  async function bookNow(e) {
    e.preventDefault();

    setErrors({});
    setCatchError("");
    setCatchErrorCheck(false);

    const errorData = {};

    if (!checkInDate) errorData.checkIn = "Check-in date is required";
    if (!checkOutDate) errorData.checkOut = "Check-out date is required";
    if (!numberOfGuests || numberOfGuests < 1) errorData.guests = "At least 1 guest is required";
    if (!amountOfNights || amountOfNights <= 0) errorData.dates = "Check-out must be after check-in";

    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
      return;
    }

    const token = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    const bookingData = {
      dateFrom: checkInDate,
      dateTo: checkOutDate,
      guests: Number(numberOfGuests),
      venueId: id,
    };

    try {

      const res = await fetch(`${API_BASE}${CREATE_BOOKING}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        const apiErrors = {};
        data.errors?.forEach(error => {
          apiErrors.general = error.message;
        });
        setErrors(apiErrors);
        return;
      }

      setBooking(true);
    } catch (error) {
      setCatchErrorCheck(true);
      setCatchError(error.message);
    }
  };

  return (
    <>
      {
        viewImage && <div onClick={() => setViewImage(false)} className="fixed flex items-center inset-0 bg-black/50 z-999 overflow-hidden h-full">
          <img className="max-w-[70vw] max-h-[70vh] rounded-xl mx-auto" src={currentImage.url} alt={currentImage.alt} /></div>
      }
      <div className={`max-w-7xl mx-auto ${viewImage && "blur-sm"} `}>
        <div className="relative w-full h-79 rounded-xl">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={detailVenue.media?.[0]?.url}
            alt={detailVenue.media?.[0]?.alt}
          />
          <div className="absolute bg-black/50 h-full w-full">
            <div className="absolute bottom-0 text-white">
              <div className="ml-10 mb-5">
                <Link to="/accomodations" className="flex items-center text-button font-rubik mb-5 cursor-pointer">
                  &lt; Back </Link>
                <div className="flex flex-col">
                  <h1 className="text-6xl font-bold font-poppins mb-5">{detailVenue.name?.length > 10 ? detailVenue.name?.substring(0, 10) + "..." : detailVenue.name}</h1>
                  <div className="grid grid-cols-1">
                    <div className="grid grid-cols-1 gap-0  md:grid-cols-2 items-start md:gap-20">
                      <p className="flex items-center text-p font-rubik gap-1">Location: <span className="font-bold"> {detailVenue?.location?.address}, {detailVenue?.location?.city}</span></p>
                      <p className="flex items-center text-p font-poppins gap-1">Rating: <span className="font-bold">{detailVenue.rating}</span></p></div>
                    <div className="grid grid-cols-1 gap-0  md:grid-cols-2 items-start md:gap-20">
                      <p className="flex items-center text-p font-rubik gap-1">Price: <span className="font-bold">${detailVenue.price}</span></p>
                      <p className="flex items-center text-p font-rubik gap-1">Max Guests: <span className="font-bold">{detailVenue.maxGuests} guests</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto px-4 xl:px-0 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10">
              <div className="flex flex-col justify-between">
                <div className="flex flex-wrap flex-col md:flex-row gap-10 my-10  justify-center items-center md:justify-start md:items-start">
                  {detailVenue.media?.map(image => {
                    return <img key={image.url} onClick={() => {
                      setCurrentImage(image);
                      setViewImage(true);
                    }} className="h-35 w-35 border rounded-xl cursor-pointer hover:scale-110 ease-out duration-500 hover:blur-none" src={image.url} alt={image.alt} />
                  })}
                </div>

                <div className="flex flex-col justify-top bg-primary-blue text-white p-8 rounded-xl h-full">
                  <h2 className="text-h2 font-poppins">Description</h2>
                  <p className="text-p font-rubik">
                    {detailVenue.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5 my-5">
                    {detailVenue?.meta?.wifi &&
                      <div className="flex items-end gap-2">
                        <svg className="w-6" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 7L1.17157 5.82843C2.98259 4.01741 5.43884 3 8 3C10.5612 3 13.0174 4.01742 14.8284 5.82843L16 7L14.5858 8.41421L13.4142 7.24264C11.9783 5.8067 10.0307 5 8 5C5.96928 5 4.02173 5.8067 2.58579 7.24264L1.41421 8.41421L0 7Z" fill="#ffffff"></path> <path d="M4.24264 11.2426L2.82843 9.82843L4 8.65685C5.06086 7.59599 6.49971 7 8 7C9.50029 7 10.9391 7.59599 12 8.65686L13.1716 9.82843L11.7574 11.2426L10.5858 10.0711C9.89999 9.38527 8.96986 9 8 9C7.03014 9 6.1 9.38527 5.41421 10.0711L4.24264 11.2426Z" fill="#ffffff"></path> <path d="M8 15L5.65685 12.6569L6.82842 11.4853C7.13914 11.1746 7.56057 11 8 11C8.43942 11 8.86085 11.1746 9.17157 11.4853L10.3431 12.6569L8 15Z" fill="#ffffff"></path> </g></svg>
                        <small className="text-p font-rubik leading-none">Wifi</small>
                      </div>
                    }
                    {detailVenue?.meta?.pets &&
                      <div className="flex gap-2 items-end">
                        <svg className="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.0803 15.7203C18.4903 12.1903 15.1003 9.32031 11.5203 9.32031C7.63028 9.32031 4.21028 12.4703 3.88028 16.3503C3.75028 17.8503 4.23028 19.2703 5.22028 20.3403C6.20028 21.4103 7.58028 22.0003 9.08028 22.0003H13.7603C15.4503 22.0003 16.9303 21.3403 17.9403 20.1503C18.9503 18.9603 19.3503 17.3803 19.0803 15.7203Z" fill="#ffffff"></path> <path d="M10.2796 7.86C11.8978 7.86 13.2096 6.54819 13.2096 4.93C13.2096 3.31181 11.8978 2 10.2796 2C8.66141 2 7.34961 3.31181 7.34961 4.93C7.34961 6.54819 8.66141 7.86 10.2796 7.86Z" fill="#ffffff"></path> <path d="M16.94 9.02844C18.2876 9.02844 19.38 7.93601 19.38 6.58844C19.38 5.24086 18.2876 4.14844 16.94 4.14844C15.5924 4.14844 14.5 5.24086 14.5 6.58844C14.5 7.93601 15.5924 9.02844 16.94 9.02844Z" fill="#ffffff"></path> <path d="M20.5496 12.9313C21.6266 12.9313 22.4996 12.0582 22.4996 10.9812C22.4996 9.90429 21.6266 9.03125 20.5496 9.03125C19.4727 9.03125 18.5996 9.90429 18.5996 10.9812C18.5996 12.0582 19.4727 12.9313 20.5496 12.9313Z" fill="#ffffff"></path> <path d="M3.94 10.9816C5.28757 10.9816 6.38 9.88914 6.38 8.54156C6.38 7.19399 5.28757 6.10156 3.94 6.10156C2.59243 6.10156 1.5 7.19399 1.5 8.54156C1.5 9.88914 2.59243 10.9816 3.94 10.9816Z" fill="#ffffff"></path> </g></svg>
                        <small className="text-p font-rubik leading-none">Pets</small>
                      </div>
                    }
                    {detailVenue?.meta?.breakfast &&
                      <div className="flex gap-2 items-end">
                        <svg
                          className="w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"><path d="M6 2C5.45 2 5 2.45 5 3V11C5 12.1 5.9 13 7 13V22H9V13C10.1 13 11 12.1 11 11V3C11 2.45 10.55 2 10 2C9.45 2 9 2.45 9 3V8H8V3C8 2.45 7.55 2 7 2C6.45 2 6 2.45 6 3V8H5V3C5 2.45 4.55 2 4 2Z" fill="#ffffff"
                          /><path d="M14 2C13.45 2 13 2.45 13 3V12C13 13.1 13.9 14 15 14V22H17V3C17 2.45 16.55 2 16 2H14Z" fill="#ffffff"
                          />
                        </svg>
                        <small className="text-p font-rubik leading-none">Breakfast</small>
                      </div>
                    }
                    {detailVenue?.meta?.parking &&
                      <div className="flex gap-2">
                        <svg
                          className="w-6 h-6 block"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"><path d="M6 2H14C17.31 2 20 4.69 20 8C20 11.31 17.31 14 14 14H10V22H6V2Z" fill="currentColor"
                          /><path d="M10 6V10H14C15.1 10 16 9.1 16 8C16 6.9 15.1 6 14 6H10Z" fill="white"
                          />
                        </svg>
                        <label htmlFor="parking">Parking</label>
                      </div>
                    }
                  </div>

                </div>
              </div>
              <div className="bg-primary-blue text-white p-8 rounded-xl w-full md:max-w-96 md:ml-auto mt-10 md:px-10">
                <h2 className="text-h2 font-poppins text-center">Book this venue</h2>
                <form className="w-full flex flex-col justify-center items-center" onSubmit={bookNow}>
                  <div className="form-group my-3 w-full max-w-72 flex flex-col gap-2">
                    <label className="text-p font-rubik" htmlFor="checkIn">Check-in:</label>
                    <input
                      className="bg-white text-black w-full max-w-72 h-8 rounded-xl px-3 cursor-pointer"
                      id="checkIn"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                    {errors.checkIn && <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border text-black">{errors.checkIn}</small>}
                  </div>
                  <div className="form-group my-3 w-full max-w-72 flex flex-col gap-2">
                    <label className="text-p font-rubik" htmlFor="checkOut">Check-out:</label>
                    <input
                      className="bg-white text-black w-full max-w-72 h-8 rounded-xl px-3 cursor-pointer"
                      id="checkOut"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                    {errors.checkOut && <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border text-black">{errors.checkOut}</small>}
                  </div>
                  <div className="form-group my-3 w-full max-w-72 flex flex-col gap-2">
                    <label className="text-p font-rubik" htmlFor="amountOfGuests">Number of guests:</label>
                    <input
                      className="bg-white text-black w-full max-w-72 h-8 rounded-xl px-3 cursor-pointer"
                      id="amountOfGuests"
                      type="number"
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(e.target.value)}
                    />
                    {errors.guests && <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border text-black">{errors.guests}</small>}
                  </div>
                  <div className="text-center my-3">
                    <p className="text-p font-rubik"><span>{amountOfNights}</span> nights</p>
                    <p className="text-p font-rubik">Total Price: <span> ${detailVenue.price && amountOfNights
                      ? detailVenue.price * amountOfNights
                      : 0}</span></p>
                  </div>
                  <button className="cursor-pointer bg-green-700  h-10 text-white mx-10 w-full rounded-xl max-w-48 font-poppins text-p hover:bg-green-600 transition-colors" type="submit">Book now</button>
                  {errors.dates && <small className="text-color-600 bg-red-200 py-2 px-2 mt-5 border-red-500 border text-black">{errors.dates}</small>}
                  {errors.general && <small className="text-color-600 bg-red-200 py-2 px-2 mt-5 border-red-500 border text-black">{errors.general}</small>}
                  {catchErrorCheck && <small className="text-color-600 bg-red-200 py-2 px-2 mt-5 border-red-500 border text-black">{catchError}</small>}
                  {booking && <small className="mx-10 py-3 text-color-600 bg-green-200 px-2 my-4 border-green-500 border text-black">Booking successful!</small>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default ViewDetail;