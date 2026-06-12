import Image from "next/image";

export default function ProjectCard({ image, category, title }) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] cursor-pointer">

      {/* IMAGE CONTAINER */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 z-10 p-8">

        {/* CATEGORY */}
        <p className="text-amber-400 text-sm tracking-[4px] uppercase">
          {category}
        </p>

        {/* TITLE */}
        <h3 className="text-white text-3xl font-semibold mt-3">
          {title}
        </h3>

      </div>

    </div>
  );
}