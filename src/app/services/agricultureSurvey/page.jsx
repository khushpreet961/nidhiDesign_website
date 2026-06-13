"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

const services = [
  { icon: "🌾", title: "Crop Land Measurement", desc: "Precise field boundaries for optimized crop planning and yield management." },
  { icon: "💧", title: "Irrigation Planning", desc: "Water flow analysis and channel mapping for efficient irrigation systems." },
  { icon: "🪨", title: "Soil & Terrain Analysis", desc: "Deep evaluation of soil composition, elevation, and farming suitability." },
  { icon: "📐", title: "Boundary Verification", desc: "Legal land boundary mapping with certified documentation." },
  { icon: "🗺️", title: "Development Planning", desc: "Strategic agricultural layout planning for modern farming growth." },
];

const steps = [
  { num: "01", title: "Site Inspection", desc: "Understanding field conditions and survey scope on-ground." },
  { num: "02", title: "Field Measurement", desc: "Accurate measurement using GPS and drone technology." },
  { num: "03", title: "Data Analysis", desc: "Evaluating terrain, soil, and agricultural suitability data." },
  { num: "04", title: "Final Report", desc: "Detailed certified survey report delivered to your hands." },
];

export default function AgricultureSurveyPage() {
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "Agriculture Survey",
  });

  useEffect(() => {
    setIsOwner(
      localStorage.getItem("isOwner") === "true"
    );
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch('/api/admin/gallery');
        const data = await res.json();
        if (data.success) {
          const filtered = data.photos.filter(p => p.category === 'Agriculture Survey');
          setPhotos(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPhotos(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setPhotos((prev) =>
          prev.filter((p) => p._id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a photo");
      return;
    }

    if (!newPhoto.title) {
      alert("Please enter photo title");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error(uploadData.message);
      }

      const saveRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPhoto.title,
          category: "Agriculture Survey",
          imageUrl: uploadData.imageUrl,
          publicId: uploadData.publicId,
        }),
      });

      const saveData = await saveRes.json();

      if (!saveData.success) {
        throw new Error(saveData.message);
      }

      setPhotos((prev) => [saveData.photo, ...prev]);

      setShowAddModal(false);
      setSelectedFile(null);

      setNewPhoto({
        title: "",
        category: "Agriculture Survey",
      });

      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-[#f4f0e8] min-h-screen overflow-hidden">

      {/* HERO */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16 py-24 bg-[#1a1a14]">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0} className="uppercase tracking-[8px] text-amber-400/70 text-xs">Nidhi Designs · Agriculture</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-8 text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight">
            Fields<br />
            <span className="text-amber-400 font-semibold">Mapped.</span><br />
            Harvests<br />
            <span className="font-semibold">Optimised.</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-10 text-gray-400 leading-8 max-w-md text-base">Scientific land surveys for smarter crop planning, irrigation management, and agricultural development — powered by advanced GPS and drone technology.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-12 flex gap-4 flex-wrap">
            <Link href="/contact" className="px-8 py-4 rounded-full bg-amber-400 text-black font-semibold text-sm tracking-wide hover:bg-amber-300 hover:scale-105 transition-all duration-300">Get a Quote</Link>
            <a href="#process" className="px-8 py-4 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300">Our Process</a>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {[["500+", "Projects"], ["99%", "Accuracy"], ["15+", "Years"]].map(([n, l], i) => (
              <div key={i}>
                <p className="text-2xl font-semibold text-amber-400">{n}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="relative h-[50vh] lg:h-auto">
          <Image
            src="/images/projects/agriculture2.png"
            alt="Agriculture Survey Field"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a14]/40 to-transparent lg:bg-none" />
          <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-medium">Live Field Survey</p>
            <p className="text-gray-900 font-semibold mt-1">Rajasthan Agricultural Zone</p>
          </div>
        </motion.div>
      </div>

      {/* GALLERY */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <p className="uppercase tracking-[6px] text-amber-600 text-xs">Gallery</p>
        <h2 className="mt-3 text-4xl font-semibold text-gray-900">Project Photos</h2>
        {isOwner && (
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            + Add New Photo
          </button>
        )}

        {loadingPhotos ? (
          <div className="mt-10 text-center text-amber-600">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="mt-10 text-center text-gray-400">No photos added yet.</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="relative h-[350px] rounded-[35px] overflow-hidden shadow-lg"
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />

                {isOwner && (
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg z-20"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ABOUT */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative h-[500px] rounded-[35px] overflow-hidden shadow-2xl order-2 lg:order-1">
            <Image src="/images/projects/agriculture1.png" alt="Agriculture Survey Aerial" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-8 left-8 bg-amber-400 text-black text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">Drone Mapped</div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white font-semibold text-lg">Agricultural Land Assessment</p>
              <p className="text-amber-400 text-sm mt-1">GPS + Drone Technology</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="order-1 lg:order-2">
            <span className="text-amber-600 text-xs uppercase tracking-[6px]">What We Do</span>
            <h2 className="mt-5 text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              Agriculture
              <span className="block font-semibold text-amber-600">Surveying.</span>
            </h2>
            <p className="mt-6 text-gray-600 leading-9 text-lg">Agriculture surveying is the scientific measurement and mapping of farmland — helping farmers and developers unlock better productivity through data-driven insights on soil, water, and land boundaries.</p>
            <div className="mt-10 space-y-3">
              {services.map((s, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.1} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-amber-50 transition-colors duration-300 group cursor-default">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">{s.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5 leading-6">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* PROCESS */}
      <div id="process" className="bg-[#1a1a14] py-28 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-amber-400/70 text-xs uppercase tracking-[6px]">How We Work</span>
              <h2 className="mt-3 text-4xl font-semibold text-white">Survey Process</h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-7">From first contact to final certified report — a clear, professional workflow.</p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-amber-400/20" />
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.15} className="relative text-center">
                <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center mx-auto bg-[#1a1a14] relative z-10">
                  <span className="text-amber-400 font-semibold text-sm">{step.num}</span>
                </div>
                <h3 className="mt-6 text-white font-semibold text-lg">{step.title}</h3>
                <p className="mt-3 text-gray-500 text-sm leading-7">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-28">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-amber-400 rounded-[40px] px-10 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-black/60 text-xs uppercase tracking-[6px] font-medium">Ready to start?</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">
              Survey your land.
              <span className="block font-semibold">Grow smarter.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <Link href="/contact" className="px-10 py-5 rounded-full bg-black text-white font-semibold text-sm tracking-wider hover:bg-gray-900 hover:scale-105 transition-all duration-300 text-center">Contact Us Today</Link>
            <p className="text-black/50 text-xs text-center">Free initial consultation</p>
          </div>
        </motion.div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6">
              Add New Agriculture Photo
            </h2>

            <input
              type="text"
              placeholder="Photo Title"
              value={newPhoto.title}
              onChange={(e) =>
                setNewPhoto({
                  ...newPhoto,
                  title: e.target.value,
                })
              }
              className="w-full border rounded-xl px-5 py-4 mb-5"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
              className="w-full border rounded-xl px-5 py-4 mb-5"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border rounded-xl py-4"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-amber-500 text-white rounded-xl py-4"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}