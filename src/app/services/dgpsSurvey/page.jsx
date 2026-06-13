"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function DgpsSurveyPage() {
  const [isOwner, setIsOwner] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "DGPS Surveying",
  });

  const stats = [
    { number: 5, suffix: "cm", label: "Survey Accuracy", desc: "Centimeter-level precision on every project" },
    { number: 500, suffix: "+", label: "Projects Completed", desc: "Successfully delivered across Rajasthan" },
    { number: 15, suffix: "+", label: "Years Experience", desc: "Trusted expertise in DGPS surveying" },
    { number: 100, suffix: "%", label: "Client Satisfaction", desc: "Every client leaves happy" },
    { number: 24, suffix: "hr", label: "Quick Turnaround", desc: "Fast report delivery after survey" },
    { number: 30, suffix: "+", label: "Cities Covered", desc: "Pan-Rajasthan project presence" },
  ];
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
          const filtered = data.photos.filter(p => p.category === 'DGPS Surveying');
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
    alert("Delete Clicked");

    if (!confirm("Delete this photo?")) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      console.log(data);
      alert(JSON.stringify(data));

      if (data.success) {
        setPhotos((prev) =>
          prev.filter((p) => p._id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
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
          category: "DGPS Surveying",
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
        category: "DGPS Surveying",
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
    <section className="bg-[#f8f5f0] min-h-screen">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <p className="uppercase tracking-[6px] text-amber-600 text-sm">Nidhi Designs</p>
        <h1 className="mt-5 text-4xl md:text-7xl font-light text-gray-900 leading-tight">
          Professional
          <span className="block font-semibold">DGPS Survey Services</span>
        </h1>
        <p className="mt-8 text-gray-600 max-w-3xl text-lg leading-8">
          Accurate land surveying with high precision technology for architecture, construction, mapping and site planning.
        </p>
      </div>

      {/* ABOUT */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-[40px] p-10 shadow-md">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">What is DGPS Survey?</h2>
          <p className="mt-6 text-gray-600 leading-8 text-lg">
            DGPS (Differential Global Positioning System) survey provides highly accurate land measurements for construction, architectural planning and site development. We ensure precision, reliability and professional execution in every project.
          </p>
        </div>
      </div>

      {/* PHOTO GALLERY */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div>
          <p className="uppercase tracking-[5px] text-amber-600 text-sm">Gallery</p>
          <h2 className="text-4xl font-semibold mt-3">Project Photos</h2>
        </div>
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

           {photos.map((photo) => {
  console.log("PHOTO", photo);

  return (
    <div
      key={photo._id}
      className="relative h-[350px] rounded-[35px] overflow-hidden"
    >
      <Image
  src={photo.imageUrl}
  alt={photo.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover hover:scale-105 transition-transform duration-500"
/>
      {isOwner && (
        <button
          onClick={() => {
            console.log("PHOTO OBJECT:", photo);
            console.log("PHOTO ID:", photo._id);
            handleDelete(photo._id);
          }}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg z-20"
        >
          🗑️
        </button>
      )}
    </div>
  );
})}
          </div>
        )}
      </div>

      {/* ANIMATED STATS SECTION */}
      <div className="relative bg-black overflow-hidden py-24 px-6">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[5px] text-amber-500 text-sm">Our Numbers</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white">
              Results That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Speak For Themselves</span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">Every number here is earned through precision, dedication and trust of our clients across Rajasthan.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="group relative bg-white/5 border border-white/10 rounded-[30px] p-8 hover:bg-white/10 hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-[30px] rounded-tr-[30px]" />
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{stat.label}</h3>
                <p className="mt-2 text-gray-400 text-sm leading-relaxed">{stat.desc}</p>
                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">Need DGPS Survey For Your Project?</h2>
          <p className="text-gray-300 mt-6 text-lg">Get accurate surveying solutions for construction, architecture and land mapping.</p>
          <Link href="/contact" className="inline-block mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:scale-105 transition-all duration-300">Contact Us</Link>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">
              Add New DGPS Photo
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-amber-500 text-white py-3 rounded-lg"
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