const VenueCard = ({ venue }) => {
  return (
    <article className="w-full bg-light-grey rounded-xl border my-4">
      <div className="flex flex-col md:flex-row">
        <img
          className="w-full md:max-w-md rounded-t-xl md:rounded-l-xl md:rounded-t-none"
          src={venue.media?.[0]?.url}
          alt={venue.media?.[0]?.alt || venue.name}
        />

        <div className="w-full px-6 py-4">
          <h2 className="text-h2 font-poppins">{venue.name}</h2>

          <p className="font-rubik text-p mb-2">
            {venue.location?.city}, {venue.location?.country}
          </p>

          <p className="font-rubik">
            Price: <strong>${venue.price}/night</strong>
          </p>

          <p className="font-rubik">
            Max guests: <strong>{venue.maxGuests}</strong>
          </p>

          <p className="font-rubik mt-2">
            Bookings: <strong>{venue.bookings?.length || 0}</strong>
          </p>
        </div>
      </div>
    </article>
  );
};

export default VenueCard;
