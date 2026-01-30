const InfoCard = ({ booking }) => {
  if (!booking || !booking.venue) return null;

  const venue = booking.venue;

  const nights = Math.max(
    1,
    (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
    (1000 * 60 * 60 * 24)
  );

  const totalPrice = nights * venue.price;

  return (
    <article className="w-full bg-light-grey rounded-xl border my-4">
      <div className="flex flex-col md:flex-row md:rounded-xl">
        <img
          className="w-full md:max-w-md md:rounded-l-xl rounded-t-xl md:rounded-t-none"
          src={venue.media?.[0]?.url}
          alt={venue.media?.[0]?.alt || venue.name}
        />

        <div className="w-full px-20 py-2 flex-start">
          <h2 className="text-h2 font-poppins">{venue.name}</h2>

          <p className="font-rubik text-h3 mb-4">
            {venue.location?.city}, {venue.location?.country}
          </p>

          <span className="font-rubik text-xl block">
            ${venue.price}/night
          </span>

          <div className="flex justify-between mt-3">
            <span>Check-in:</span>
            <strong>
              {new Date(booking.dateFrom).toLocaleDateString()}
            </strong>
          </div>

          <div className="flex justify-between">
            <span>Check-out:</span>
            <strong>
              {new Date(booking.dateTo).toLocaleDateString()}
            </strong>
          </div>

          <div className="flex justify-between">
            <span>Nights:</span>
            <strong>{nights}</strong>
          </div>

          <div className="flex justify-between mt-2">
            <span>Total:</span>
            <strong>${totalPrice}</strong>
          </div>

          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-9"></div>
        </div>
      </div>
    </article>
  );
};

export default InfoCard;
