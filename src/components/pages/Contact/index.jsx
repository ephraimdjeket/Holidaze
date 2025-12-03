const Contact = () => {
  return (
    <div>
      <div className="bg-dark-navy-blue">
        <div className="h-[45vh] flex flex-col justify-center items-left px-4 gap-6 max-w-7xl mx-auto">
          <h1 className="text-white font-poppins mt-20 text-h1">About Holidaze</h1>
          <p className="text-white font-rubik text-p max-w-2xl">At Holidaze, we believe travel is more than just checking into a hotel —
            it’s about creating stories, memories, and moments that stay with you long after you’ve returned home.</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 md:items-baseline md:flex-row py-15 px-4 max-w-7xl justify-between  mx-auto">
        <div className="flex flex-col md:max-w-98">
          <h2 className="text-h2 font-poppins">For Guests:</h2>
          <p className="text-p font-rubik max-w-90">Need help with reservations, payments, or travel tips? Our team is ready to assist.</p>
          <h2 className="text-h2 font-poppins mt-8">For Hosts:</h2>
          <p className="text-p font-rubik max-w-90">Questions about listing your property or becoming a Venue Manager? We’re here to guide you through the process.
            We pride ourselves on quick responses — most inquiries are answered within 24 hours.
            Because at Holidaze, your journey matters before it even begins. </p>
        </div>
        <form action="#" className="bg-light-grey w-full border rounded-xl px-15 max-w-98 font-rubik">
          <h2 className="text-center font-poppins text-h2 my-4">Contact Form</h2>
          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="text"
              id="name"
              required
            />
          </div>
          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="email"
              id="email"
              required
            />
          </div>
          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="subject">Subject</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="subject"
              id="subject"
              required
            />
          </div>
          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="message">Message</label>
            <textarea
              className="w-full bg-white rounded border h-28 pl-2"
              type="message"
              id="message"
              required
            />
          </div>
          <button type="submit" className="cursor-pointer bg-green-600   text-white my-5 font-bold font-poppins text-p w-full items-center py-2 rounded">Register</button>
        </form>
      </div >
    </div >

  )
}

export default Contact;