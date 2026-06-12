"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            {/* SMALL TEXT */}
            <p className="text-amber-400 tracking-[6px] text-sm mb-6 uppercase">
              Luxury Architectural Studio
            </p>

            {/* MAIN HEADING */}
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
              Designing
              <span className="block font-semibold">Modern Spaces</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                With Elegance
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mt-8 text-lg max-w-2xl leading-relaxed">
              We create timeless architecture and premium interior experiences
              that blend innovation, luxury, and functionality for modern living.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button
                className="border border-white/40 text-white px-8 py-4 rounded-full backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => (window.location.href = "/contact")}
                type="button"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}