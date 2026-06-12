import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ServiceCard({ number, title, description, link, image , isOwner}) {
  return (
    <div className="group bg-white rounded-[30px] overflow-hidden border border-gray-200 hover:border-amber-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* IMAGE */}
      {image ? (
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          No Image
        </div>
      )}

      {/* CONTENT */}
      <div className="p-8">

        {/* NUMBER */}
        <div className="text-5xl font-light text-gray-200 group-hover:text-amber-300 transition-all duration-500">
          {number}
        </div>

        {/* TITLE */}
        <h3 className="mt-6 text-2xl font-semibold text-gray-800">{title}</h3>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-500 leading-relaxed">{description}</p>

        {/* BUTTON */}
        <Link
          href={link || "#"}
          className="mt-8 flex items-center gap-3 text-amber-600 font-medium group-hover:gap-5 transition-all duration-300"
        >
          Learn More
          <FaArrowRight />
        </Link>

      </div>
    </div>
  );
}