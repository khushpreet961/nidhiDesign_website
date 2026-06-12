"use client";

import { motion } from "framer-motion";
import ProjectCard from "./projectCard";

export default function Projects() {

  const projects = [
    { image: "/images/projects/project1.jpg", category: "Luxury Villa", title: "Modern Urban Residence" },
    { image: "/images/projects/project2.jpg", category: "Interior Design", title: "Elegant Living Space" },
    { image: "/images/projects/project3.jpg", category: "Commercial", title: "Corporate Architecture" },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <div className="max-w-3xl">
            <p className="text-amber-600 tracking-[6px] uppercase text-sm">
              Featured Projects
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              Our Latest
              <span className="block font-semibold">Architectural Works</span>
            </h2>
          </div>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                image={project.image}
                category={project.category}
                title={project.title}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}