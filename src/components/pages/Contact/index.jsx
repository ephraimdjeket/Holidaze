import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div>
      <div className="bg-dark-navy-blue">
        <div className="h-[45vh] flex flex-col justify-center items-left px-4 gap-6 max-w-7xl mx-auto">
          <h1 className="text-white font-poppins mt-20 text-h1">
            About Holidaze
          </h1>
          <p className="text-white font-rubik text-p max-w-2xl">
            At Holidaze, we believe travel is more than just checking into a hotel —
            it’s about creating stories, memories, and moments that stay with you long after you’ve returned home.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 md:items-baseline md:flex-row py-15 px-4 max-w-7xl justify-between mx-auto">
        <div className="flex flex-col md:max-w-98">
          <h2 className="text-h2 font-poppins">For Guests:</h2>
          <p className="text-p font-rubik max-w-90">
            Need help with reservations, payments, or travel tips? Our team is ready to assist.
          </p>
          <h2 className="text-h2 font-poppins mt-8">For Hosts:</h2>
          <p className="text-p font-rubik max-w-90">
            Questions about listing your property or becoming a Venue Manager? We’re here to guide you through the process.
            We pride ourselves on quick responses — most inquiries are answered within 24 hours.
            Because at Holidaze, your journey matters before it even begins.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-light-grey w-full border rounded-xl px-15 max-w-98 font-rubik"
        >
          <h2 className="text-center font-poppins text-h2 my-4">
            Contact Form
          </h2>

          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border">
                {errors.name}
              </small>
            )}
          </div>

          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border">
                {errors.email}
              </small>
            )}
          </div>

          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="subject">Subject</label>
            <input
              className="w-full bg-white rounded border h-7 pl-2 py-4"
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border">
                {errors.subject}
              </small>
            )}
          </div>

          <div className="py-3 flex flex-col gap-1">
            <label htmlFor="message">Message</label>
            <textarea
              className="w-full bg-white rounded border h-28 pl-2"
              id="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <small className="text-color-600 bg-red-200 py-2 px-2 border-red-500 border">
                {errors.message}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-green-600 text-white my-5 font-bold font-poppins text-p w-full py-2 rounded hover:bg-green-700"
          >
            Send message
          </button>

          {success && (
            <small className="block text-center bg-green-200 text-green-800 py-3 px-2 my-3 border border-green-500">
              Message sent successfully! We’ll get back to you shortly.
            </small>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
