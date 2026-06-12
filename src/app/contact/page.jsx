"use client";

import { useState } from "react";
import axios from "axios";

export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/contact",
      formData
    );

    alert(response.data.message);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      error.message
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <section
      className="
      min-h-screen
      bg-[#f8f5f0]
      flex
      items-center
      justify-center
      px-6
      py-20
      "
    >

      <div
        className="
        w-full
        max-w-4xl
        bg-white
        rounded-[30px]
        p-10
        shadow-xl
        "
      >

        {/* HEADING */}
        <div className="text-center">

          <p
            className="
            text-amber-600
            tracking-[6px]
            uppercase
            text-sm
            "
          >
            Contact Us
          </p>

          <h1
            className="
            mt-4
            text-4xl
            md:text-5xl
            font-light
            text-gray-900
            "
          >
            Let’s Build Your
            <span className="block font-semibold">
              Dream Space
            </span>
          </h1>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
            border
            border-gray-300
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-amber-500
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
            border
            border-gray-300
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-amber-500
            "
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="
            border
            border-gray-300
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-amber-500
            "
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            className="
            md:col-span-2
            border
            border-gray-300
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-amber-500
            resize-none
            "
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
            md:col-span-2
            bg-gradient-to-r
            from-amber-500
            to-orange-500
            text-white
            py-4
            rounded-xl
            font-semibold
            hover:scale-[1.02]
            transition-all
            duration-300
            "
          >
            {
              loading
              ? "Sending..."
              : "Send Message"
            }
          </button>

        </form>

      </div>

    </section>
  );
}