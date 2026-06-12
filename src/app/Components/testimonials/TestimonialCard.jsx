import { FaStar } from "react-icons/fa";

export default function TestimonialCard({ name, role, review }) {
  return (
    <div className="group bg-white rounded-[30px] p-8 border border-gray-200 hover:border-amber-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

      {/* TOP ICON */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl font-semibold">
        {name.charAt(0)}
      </div>

      {/* STARS */}
      <div className="flex gap-1 text-amber-400 mt-6">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      {/* REVIEW */}
      <p className="mt-6 text-gray-500 leading-relaxed text-[15px]">
        "{review}"
      </p>

      {/* CLIENT INFO */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">
          {name}
        </h3>
        <p className="text-sm text-amber-600 mt-1 tracking-[2px] uppercase">
          {role}
        </p>
      </div>

    </div>
  );
}