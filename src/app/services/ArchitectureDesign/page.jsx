"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function ArchitectureDesignPage() {
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "Architecture Design",
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
          const filtered = data.photos.filter(p => p.category === 'Architecture Design');
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

    const saveRes = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newPhoto.title,
        category: "Architecture Design",
        imageUrl: uploadData.imageUrl,
        publicId: uploadData.publicId,
      }),
    });

    const saveData = await saveRes.json();

    setPhotos((prev) => [saveData.photo, ...prev]);

    setShowAddModal(false);
    setSelectedFile(null);

    setNewPhoto({
      title: "",
      category: "Architecture Design",
    });

  } catch (error) {
    alert(error.message);
  } finally {
    setUploading(false);
  }
};


  const services = [
    { title: "2D Floor Planning", desc: "Functional and efficient layouts designed with precision." },
    { title: "3D Elevation Design", desc: "Realistic architectural visualization before construction." },
    { title: "Luxury Residences", desc: "Premium home designs tailored to your lifestyle." },
    { title: "Farmhouse Design", desc: "Modern farmhouse concepts with elegant aesthetics." },
  ];

  const process = [
    { number: "01", title: "Consultation", desc: "Understanding your requirements and vision." },
    { number: "02", title: "Concept Design", desc: "Creating layouts and architectural concepts." },
    { number: "03", title: "3D Visualization", desc: "Presenting realistic views and elevations." },
    { number: "04", title: "Execution Support", desc: "Guidance throughout project implementation." },
  ];

  return (
    <section className="bg-[#0e0e0c] text-white min-h-screen">

      {/* HERO */}
      <div className="relative h-screen">
        <Image src="/images/projects/architectureDesign.png" alt="Architecture Design" fill priority className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="uppercase tracking-[8px] text-amber-400 text-sm">Nidhi Designs</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="mt-6 text-5xl md:text-8xl font-light leading-tight">
            Architecture
            <span className="block text-amber-400 font-semibold">Design Studio</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mt-8 max-w-2xl text-lg text-gray-300 leading-8">Creating timeless architectural spaces that blend innovation, luxury, functionality and modern design.</motion.p>
          <Link href="/contact" className="mt-10 w-fit px-8 py-4 rounded-full bg-amber-400 text-black font-semibold hover:scale-105 transition-all duration-300">Start Your Project</Link>
        </div>
      </div>

      {/* ABOUT */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[6px] text-amber-400 text-sm">About Us</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-light">
              Architecture
              <span className="block font-semibold text-amber-400">Redefined</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-400 leading-9 text-lg">We specialize in luxury residential, commercial, and farmhouse architecture. Our focus is on creating elegant spaces that are visually stunning, functional, and built for the future.</p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div><h3 className="text-3xl font-bold text-amber-400">12+</h3><p className="text-gray-500">Years</p></div>
              <div><h3 className="text-3xl font-bold text-amber-400">300+</h3><p className="text-gray-500">Projects</p></div>
              <div><h3 className="text-3xl font-bold text-amber-400">100%</h3><p className="text-gray-500">Custom</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <p className="uppercase tracking-[6px] text-amber-400 text-sm">Gallery</p>
        <h2 className="text-4xl font-semibold mt-3">Project Photos</h2>
        {isOwner && (
  <button
    onClick={() => setShowAddModal(true)}
    className="mt-4 px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
  >
    + Add New Photo
  </button>
)}

        {loadingPhotos ? (
          <div className="mt-10 text-center text-amber-400">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">No photos added yet.</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div key={photo._id} className="relative h-[400px] rounded-[35px] overflow-hidden">
                <Image src={photo.imageUrl} alt={photo.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
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

      {/* DESIGN PROCESS */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <p className="uppercase tracking-[6px] text-amber-400 text-sm">Process</p>
        <h2 className="text-4xl font-semibold mt-3">How We Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {process.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-[30px] p-8">
              <p className="text-5xl font-light text-amber-400">{item.number}</p>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-gray-400 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <p className="uppercase tracking-[6px] text-amber-400 text-sm">Services</p>
        <h2 className="text-4xl font-semibold mt-3">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-[30px] p-8">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-4 text-gray-400 leading-7">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/10 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light">
            Ready To Build
            <span className="block text-amber-400 font-semibold">Your Dream Project?</span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg">Let's transform your vision into a stunning architectural reality.</p>
          <Link href="/contact" className="inline-block mt-10 px-10 py-5 rounded-full bg-amber-400 text-black font-semibold hover:scale-105 transition-all duration-300">Contact Us</Link>
        </div>
      </div>
{showAddModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-black">
        Add New Architecture Photo
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
        className="w-full border rounded-xl px-5 py-4 mb-5 text-black"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setSelectedFile(e.target.files[0])
        }
        className="w-full border rounded-xl px-5 py-4 mb-5 text-black"
      />

      <div className="flex gap-4">
        <button
          onClick={() => setShowAddModal(false)}
          className="flex-1 border rounded-xl py-4 text-black"
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