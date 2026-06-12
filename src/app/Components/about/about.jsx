import localFont from "next/font/local";

// If you don't have these fonts set up, add to your layout.js:
// import { Cormorant_Garamond, DM_Sans } from "next/font/google"

export default function AboutPage() {
  return (
    <div className="font-sans bg-[#f8f5f0] text-[#1a1a1a] overflow-hidden">

      {/* ── HERO ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

        {/* Left — dark panel */}
        <div className="relative bg-[#1a1210] px-12 py-16 flex flex-col justify-center overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full border border-amber-600/20" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full border border-amber-600/10" />

          <p className="text-amber-600 text-[11px] tracking-[8px] uppercase mb-7">
            About Nidhi Designs
          </p>

          <h1
            className="text-5xl md:text-[52px] font-light leading-[1.15] text-[#f8f5f0]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Where Vision
            <br />
            Meets{" "}
            <em className="italic text-amber-500 not-italic" style={{ fontStyle: "italic" }}>
              Craft
            </em>
          </h1>

          <p className="mt-7 text-[13px] text-[#f8f5f0]/50 leading-[1.8] max-w-xs font-light">
            We don't just design spaces — we craft experiences that reflect who
            you are, built with precision, elegance, and purpose.
          </p>
        </div>

        {/* Right — geometric art */}
        <div className="bg-[#ede8e0] flex items-center justify-center min-h-[320px]">
          <div className="relative w-64 h-64">
            {/* Rings */}
            <div className="absolute inset-0 rounded-full border border-amber-600 opacity-30" />
            <div className="absolute inset-[35px] rounded-full border border-amber-600 opacity-50" />
            <div className="absolute inset-[70px] rounded-full border border-amber-600 opacity-80" />

            {/* Cross lines */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-amber-600 opacity-25" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-amber-600 opacity-25" />

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center">
              <span
                className="text-white text-2xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
              >
                N
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-amber-600">
        {[
          { num: "12+", label: "Years Experience" },
          { num: "350+", label: "Projects Done" },
          { num: "98%", label: "Client Satisfaction" },
          { num: "40+", label: "Cities Covered" },
        ].map((stat, i) => (
          <div
            key={i}
            className="px-8 py-7 text-center border-r border-white/20 last:border-r-0"
          >
            <div
              className="text-4xl font-light text-white leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {stat.num}
            </div>
            <div className="mt-1.5 text-[10px] tracking-[3px] uppercase text-white/75">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <div className="px-12 py-16 bg-[#f8f5f0]">
        <p className="text-[10px] tracking-[7px] uppercase text-amber-600 mb-3">
          What We Do
        </p>
        <h2
          className="text-4xl font-light text-[#1a1210] mb-12 leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Our Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#d5cfc6]">
          {[
            {
              num: "01",
              icon: "🏛",
              name: "Modern Architecture",
              desc: "Designing bold, functional structures that stand the test of time.",
            },
            {
              num: "02",
              icon: "🛋",
              name: "Luxury Interiors",
              desc: "Refined interiors that blend comfort with timeless elegance.",
            },
            {
              num: "03",
              icon: "🏠",
              name: "Residential Planning",
              desc: "Thoughtful spaces tailored to the way you live and thrive.",
            },
            {
              num: "04",
              icon: "🏢",
              name: "Commercial Design",
              desc: "Professional environments that inspire productivity and growth.",
            },
            {
              num: "05",
              icon: "📍",
              name: "DGPS Surveying",
              desc: "Precision land surveying for accurate, reliable project foundations.",
            },
            {
              num: "06",
              icon: "✏️",
              name: "Custom Consultation",
              desc: "Personalized guidance from concept to stunning completion.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="group bg-[#f8f5f0] px-8 py-9 cursor-default transition-colors duration-300 hover:bg-[#1a1210]"
            >
              <div
                className="text-5xl font-light leading-none mb-4 text-[#ede8e0] group-hover:text-amber-600/40 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {service.num}
              </div>
              <div className="text-2xl mb-3">{service.icon}</div>
              <div className="text-sm font-medium text-[#1a1210] group-hover:text-[#f8f5f0] mb-2.5 tracking-wide transition-colors duration-300">
                {service.name}
              </div>
              <div className="text-xs text-[#7a7068] group-hover:text-[#f8f5f0]/55 leading-relaxed font-light transition-colors duration-300">
                {service.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY / VALUES ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px]">

        {/* Quote */}
        <div className="bg-[#1a1210] px-12 py-16 flex flex-col justify-center">
          <blockquote
            className="text-3xl font-light text-[#f8f5f0] leading-relaxed border-l-2 border-amber-600 pl-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            "Every space has a soul. Our job is to help it speak."
          </blockquote>
          <p className="mt-6 text-[11px] tracking-[4px] uppercase text-amber-600 pl-6">
            — Nidhi Designs Philosophy
          </p>
        </div>

        {/* Values */}
        <div className="bg-[#ede8e0] px-12 py-16 flex flex-col justify-center gap-6">
          <p className="text-[10px] tracking-[7px] uppercase text-amber-600">
            Our Values
          </p>

          {[
            {
              title: "Client-first vision",
              text: "Every decision starts and ends with your needs, lifestyle, and dreams.",
            },
            {
              title: "Detail obsession",
              text: "We sweat the small stuff so you don't have to — flawless in every corner.",
            },
            {
              title: "Timeless over trendy",
              text: "We design spaces that age gracefully, not ones that expire in a season.",
            },
          ].map((value, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
              <div>
                <div className="text-[13px] font-medium text-[#1a1210] mb-1 tracking-wide">
                  {value.title}
                </div>
                <div className="text-xs text-[#7a7068] leading-relaxed font-light">
                  {value.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-amber-600 px-12 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <h3
          className="text-3xl font-light text-white leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ready to build
          <br />
          your dream space?
        </h3>
        <a
          href="/contact"
          className="flex-shrink-0 bg-white text-amber-600 px-9 py-4 text-[11px] tracking-[3px] uppercase font-medium rounded-sm hover:bg-[#1a1210] hover:text-white transition-colors duration-300"
        >
          Contact Us →
        </a>
      </div>

    </div>
  );
}