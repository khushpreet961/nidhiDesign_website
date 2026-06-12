"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {

  const testimonials = [
    { name: "Rahul Sharma", role: "Luxury Villa Client", review: "Nidhi Designs delivered an exceptional modern villa design with premium aesthetics and outstanding attention to detail." },
    { name: "Priya Kapoor", role: "Interior Design Client", review: "The interior transformation was elegant, luxurious, and perfectly aligned with our vision. Highly professional team." },
    { name: "Arjun Mehta", role: "Commercial Project Owner", review: "Creative architectural solutions, smooth execution, and excellent communication throughout the project journey." },
  ];

  return (
    <section className="py-28 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-amber-600 tracking-[6px] uppercase text-sm">
            Testimonials
          </p>
          <h2 className="mt-6 text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            What Our
            <span className="block font-semibold">Clients Say</span>
          </h2>
          <p className="mt-6 text-gray-500 leading-relaxed">
            We create premium architectural experiences with modern design, innovation, and elegance.
          </p>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TestimonialCard
                name={item.name}
                role={item.role}
                review={item.review}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}