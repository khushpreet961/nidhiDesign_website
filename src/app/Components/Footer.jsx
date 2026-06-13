"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Architectural Design",
  "Interior Design",
  "Space Planning",
  "3D Visualization",
  "Project Management",
  "Renovation & Remodeling",
];

const socials = [
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/nidhidesigns10/",
    label: "Instagram",
  },
  {
    icon: <FaYoutube />,
    href: "https://www.youtube.com/@nidhidesigns10",
    label: "YouTube",
  },
];
const currentYear = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* TOP CTA BAND */}
      <div className="border-t border-b border-[#C8A97E]/20 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C8A97E] text-xs tracking-[4px] mb-2">
              LET'S CREATE TOGETHER
            </p>
            <h2 className="text-white text-3xl lg:text-4xl font-light tracking-widest">
              HAVE A PROJECT IN MIND?
            </h2>
          </div>

          <Link
            href="/contact"
            className="group flex items-center gap-4 border border-[#C8A97E] text-[#C8A97E] px-8 py-4 rounded-full text-sm tracking-[3px] hover:bg-[#C8A97E] hover:text-black transition-all duration-300"
          >
            GET IN TOUCH
            <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* COL 1 — BRAND */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src="/images/logonew2.png"
                  alt="Nidhi Design Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-light tracking-[6px]">
                  NIDHI
                </h3>
                <p className="text-[#C8A97E] text-xs tracking-[5px]">
                  DESIGN
                </p>
              </div>
            </Link>

            <p className="text-[#888] text-sm leading-7 mb-8 max-w-xs">
              Crafting luxury spaces that blend aesthetics with functionality.
              Architecture and interior design rooted in elegance.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
               <a
  key={s.label}
  href={s.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={s.label}
  className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#888] hover:border-[#C8A97E] hover:text-[#C8A97E] transition-all duration-300 text-sm"
>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — NAVIGATION */}
          <div>
            <h4 className="text-white text-xs tracking-[4px] mb-6 pb-3 border-b border-[#222]">
              NAVIGATION
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#888] text-sm tracking-[1px] hover:text-[#C8A97E] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-[#444] group-hover:bg-[#C8A97E] group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — SERVICES */}
          <div>
            <h4 className="text-white text-xs tracking-[4px] mb-6 pb-3 border-b border-[#222]">
              SERVICES
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[#888] text-sm tracking-[1px] hover:text-[#C8A97E] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-[#444] group-hover:bg-[#C8A97E] group-hover:w-6 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — CONTACT */}
          <div>
            <h4 className="text-white text-xs tracking-[4px] mb-6 pb-3 border-b border-[#222]">
              CONTACT
            </h4>
            <ul className="space-y-5 text-sm text-[#888]">
              <li>
                <p className="text-[#C8A97E] text-xs tracking-[2px] mb-1">
                  ADDRESS
                </p>
                <p className="leading-6">
                  Shop no. 5 Malviya nagar <br />
                  Alwar, Rajasthan — 301001
                </p>
              </li>
              <li>
                <p className="text-[#C8A97E] text-xs tracking-[2px] mb-1">
                  EMAIL
                </p>
                <a
                  href="mailto:nidhidesignss@gmail.com"
                  className="hover:text-[#C8A97E] transition-colors duration-300"
                >
                  nidhidesignss@gmail.com
                </a>
              </li>
              <li>
                <p className="text-[#C8A97E] text-xs tracking-[2px] mb-1">
                  PHONE
                </p>
                <a
                  href="tel:+91 9887369510"
                  className="hover:text-[#C8A97E] transition-colors duration-300"
                >
                  +91 9887369510
                </a>
              </li>
              <li>
                <p className="text-[#C8A97E] text-xs tracking-[2px] mb-1">
                  HOURS
                </p>
                <p>Mon – Sat: 10am – 7pm</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555] tracking-[1px]">
          <p>
            © {new Date().getFullYear()} NIDHI DESIGNS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C8A97E] transition-colors duration-300">
              PRIVACY POLICY
            </Link>
            <span className="text-[#333]">|</span>
            <Link href="/terms" className="hover:text-[#C8A97E] transition-colors duration-300">
              TERMS OF USE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}