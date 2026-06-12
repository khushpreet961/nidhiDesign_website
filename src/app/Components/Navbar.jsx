
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenu]);

  useEffect(() => {
    setIsOwner(
      localStorage.getItem("isOwner") === "true"
    );
  }, []);

  console.log("Owner Status:", isOwner);

  // ✅ FIX: Single-line classNames — hydration error fix
  const headerClass = scrolled
    ? "bg-[#111111]/95 backdrop-blur-md shadow-lg border-b border-white/10"
    : "bg-transparent";

  // ✅ FIX: Text color changes based on scroll — white on dark, dark on transparent
  const linkClass = scrolled
    ? "text-white hover:text-[#d97706] transition duration-300 text-sm tracking-[2px]"
    : "text-[#1a1210] hover:text-[#d97706] transition duration-300 text-sm tracking-[2px]";

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerClass} py-4`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            
          
            {/* LOGO */}

            <Link href="/" className="flex items-center">
              <div className="relative -mt-3 w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden border-2 border-[#d97706] bg-black">
                <Image
                  src="/images/logonew2.png"
                  alt="Nidhi Design Logo"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex items-center gap-10">
              <Link href="/" className={linkClass}>HOME</Link>
              <Link href="/about" className={linkClass}>ABOUT</Link>
              <Link href="/services" className={linkClass}>SERVICES</Link>
              <Link href="/projects" className={linkClass}>PROJECTS</Link>
              <Link href="/contact" className={linkClass}>CONTACT</Link>

              {isOwner && (
                <button
                  onClick={() => {
                    localStorage.removeItem("isOwner");
                    window.location.href = "/";
                  }}
                  className="text-red-500 hover:text-red-400 transition duration-300 text-sm tracking-[2px]"
                >
                  LOGOUT
                </button>
              )}
            </nav>

            {/* ✅ FIX: GET QUOTE → Book Consultation */}
            <div className="hidden lg:flex">
              <Link
                href="/contact"
                className="border border-[#d97706] text-[#d97706] px-6 py-3 rounded-full text-sm tracking-[2px] hover:bg-[#d97706] hover:text-white transition-all duration-300"
              >
                BOOK CONSULTATION
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenu}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenu((v) => !v)}
              className={`lg:hidden text-3xl ${scrolled ? "text-white" : "text-[#1a1210]"}`}
            >
              {mobileMenu ? <HiX /> : <HiOutlineMenuAlt3 />}
            </button>

          </div>
        </div>
      </header>

      {/* BACKDROP */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenu(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-screen w-[80%] bg-[#111111] z-[999] transform transition-transform duration-500 lg:hidden ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-[#333]">
          <div>
            <h1 className="text-[#d97706] text-2xl tracking-[16px]">NIDHI</h1>
            <p className="text-[#d97706] text-xs tracking-[4px]">DESIGN</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            className="text-white text-3xl"
            aria-label="Close mobile menu"
          >
            <HiX />
          </button>
        </div>

        <nav className="flex flex-col gap-8 p-8 mt-10">
          {[
            { href: "/", label: "HOME" },
            { href: "/about", label: "ABOUT" },
            { href: "/services", label: "SERVICES" },
            { href: "/projects", label: "PROJECTS" },
            { href: "/contact", label: "CONTACT" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white text-lg tracking-[3px] hover:text-[#d97706] transition-colors duration-300"
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* ✅ FIX: Book Consultation in mobile too — single line className */}
          <Link
            href="/contact"
            onClick={() => setMobileMenu(false)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-center tracking-[2px] text-sm hover:scale-105 transition-all duration-300 mt-4"
          >
            BOOK CONSULTATION
          </Link>
          {isOwner && (
            <button
              onClick={() => {
                localStorage.removeItem("isOwner");
                window.location.href = "/";
              }}
              className="text-red-500 text-left text-lg tracking-[3px] mt-4"
            >
              LOGOUT
            </button>
          )}

        </nav>
      </div>
    </>
  );
}