"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LandSurveyPage() {
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "Land Surveying",
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
          const filtered = data.photos.filter(p => p.category === 'Land Surveying');
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
          category: "Land Surveying",
          imageUrl: uploadData.imageUrl,
          publicId: uploadData.publicId,
        })
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
        category: "Land Surveying",
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
      <div className="relative h-[90vh] w-full overflow-hidden">
        <Image src="/images/projects/LandSurvey.png" alt="Land Survey Project" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto">
          <p className="uppercase tracking-[6px] text-amber-400 text-sm">Nidhi Designs</p>
          <h1 className="mt-5 text-5xl md:text-8xl font-light text-white leading-tight">
            Precise Land
            <span className="block font-semibold text-amber-400">Surveying Services</span>
          </h1>
          <p className="mt-6 text-gray-300 max-w-2xl text-lg leading-8">Accurate and detailed land measurement services for precise planning, development and architectural excellence.</p>
          <div className="mt-10 flex gap-4">
            <Link href="/contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:scale-105 transition-all duration-300">Get a Quote</Link>
            <a href="#gallery" className="px-8 py-4 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition-all duration-300">View Gallery</a>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "99%", label: "Accuracy Rate" },
            { number: "10+", label: "Years Experience" },
            { number: "50+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-semibold text-amber-400">{stat.number}</p>
              <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[5px] text-amber-600 text-sm">What We Do</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
              What is
              <span className="block text-amber-600">Land Surveying?</span>
            </h2>
            <p className="mt-6 text-gray-600 leading-8 text-lg">Land surveying is the science of measuring and mapping land boundaries, elevations, and features with high accuracy. Our expert surveyors use cutting-edge technology to deliver precise data for construction, legal, and planning purposes.</p>
            <ul className="mt-8 space-y-4">
              {["Boundary and topographic surveys", "Construction layout and site planning", "Legal land documentation", "3D terrain mapping"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl">
            <Image src="/images/projects/landSurvey2.png" alt="Land Survey Map Document" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div id="gallery" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[5px] text-amber-600 text-sm">Gallery</p>
          <h2 className="text-4xl font-semibold mt-3 text-gray-900">Project Photos</h2>
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
          <div className="text-center text-amber-600">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="text-center text-gray-400">No photos added yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos[0] && (
              <div className="md:col-span-2 relative h-[400px] rounded-[35px] overflow-hidden shadow-lg">
                <Image src={photos[0].imageUrl} alt={photos[0].title} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                {isOwner && (
                  <button
                    onClick={() => handleDelete(photos[0]._id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg z-20"
                  >
                    🗑️
                  </button>
                )}

              </div>
            )}
            <div className="flex flex-col gap-6">
              {photos[1] && (
                <div className="relative flex-1 h-[190px] rounded-[35px] overflow-hidden shadow-lg">
                  <Image src={photos[1].imageUrl} alt={photos[1].title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />

                  {isOwner && (
                    <button
                      onClick={() => handleDelete(photos[1]._id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg z-20"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              )}
              {photos[2] && (
                <div className="relative flex-1 h-[190px] rounded-[35px] overflow-hidden shadow-lg">
                  <Image src={photos[2].imageUrl} alt={photos[2].title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-left hover:scale-105 transition-transform duration-500" />

                  {isOwner && (
                    <button
                      onClick={() => handleDelete(photos[2]._id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg z-20"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* PROCESS */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[5px] text-amber-600 text-sm">How We Work</p>
            <h2 className="text-4xl font-semibold mt-3 text-gray-900">Our Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Site Visit", desc: "Initial assessment and planning of the survey area." },
              { step: "02", title: "Data Collection", desc: "Precise measurements using advanced GPS equipment." },
              { step: "03", title: "Processing", desc: "Data analysis and mapping with professional software." },
              { step: "04", title: "Delivery", desc: "Final reports, maps and legal documentation delivered." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-6xl font-light text-amber-200">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">
            Need Land Surveying
            <span className="block text-amber-400">For Your Project?</span>
          </h2>
          <p className="text-gray-300 mt-6 text-lg">Get accurate surveying solutions for construction, architecture and land mapping.</p>
          <Link href="/contact" className="inline-block mt-10 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg hover:scale-105 transition-all duration-300">Contact Us Today</Link>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6">
              Add New Land Survey Photo
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