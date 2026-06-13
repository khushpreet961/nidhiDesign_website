"use client";
import { motion } from "framer-motion";
import ServiceCard from "./serviceCard";

export default function Services() {
  const services = [
    {
      number: "01",
      title: "DGPS Surveying",
      description:
        "DGPS survey is a high-accuracy land measurement method that uses satellite signals and correction data to map positions more precisely than normal GPS.",
      link: "/services/dgpsSurvey",
      image: "/images/projects/DgpsSurvey.png", // ✅ sirf ek image rakhi
    },
    {
      number: "02",
      title: "Land Surveying",
      description:
        "Accurate and detailed land measurement services for precise planning and development.",
      link: "/services/landSurvey",
      image: "/images/projects/landSurvey.png",
    },
    {
      number: "03",
      title: "Agricultural Surveying",
      description:
        "Specialized surveying services for agricultural land assessment and planning.",
      link: "/services/agricultureSurvey",
      image: "/images/projects/agricultureSurvey.png",
    },
    {
      number: "04",
      title: "Architecture Design",
      description:
        "Modern and luxurious architectural concepts crafted with innovation and elegance.",
      link: "/services/ArchitectureDesign",
     image: "/images/projects/architectureDesign.png",
    },
    {
      number: "05",
      title: "Interior Design",
      description:
        "Premium interior experiences blending aesthetics, comfort, and functionality.",
      link: "/services/interiorDesign",
      image: "/images/projects/interiorDesign.png",
    },
    {
      number: "06",
      title: "Farm House Design",
      description:
        "Farmhouse design blends rustic charm with modern comfort, featuring open spaces, natural materials, and a warm, welcoming look.",
      link: "/services/FarmhouseDesign",
      image: "/images/projects/farmhouse1.png",
    },
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
            Our Services
          </p>

          <h2 className="mt-6 text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            Creating Spaces That
            <span className="block font-semibold">Inspire Modern Living</span>
          </h2>

          <p className="mt-6 text-gray-500 leading-relaxed">
            We deliver exceptional architectural and interior design solutions
            with creativity, precision, and premium aesthetics.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                number={service.number}
                title={service.title}
                description={service.description}
                link={service.link}
                image={service.image} 
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}