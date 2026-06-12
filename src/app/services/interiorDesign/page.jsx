"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InteriorDesignPage() {
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "Interior Design",
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
          const filtered = data.photos.filter(p => p.category === 'Interior Design');
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
          category: "Interior Design",
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
        category: "Interior Design",
      });

      alert("Photo uploaded successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const services = [
    { title: "Living Room Design", desc: "Elegant and welcoming spaces designed for comfort." },
    { title: "Bedroom Design", desc: "Luxury bedrooms crafted for relaxation and style." },
    { title: "Kitchen Design", desc: "Modern kitchens with smart functionality." },
    { title: "Office Interiors", desc: "Professional and productive workspace designs." },
  ];

  return (
    <section className="bg-[#f8f5f0] min-h-screen">

      {/* HERO */}
      <div className="relative h-[90vh] overflow-hidden">
        <Image src="/images/projects/interiorDesign.png" alt="Interior Design" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="uppercase tracking-[6px] text-amber-400 text-sm">Nidhi Designs</p>
            <h1 className="mt-5 text-5xl md:text-7xl font-light text-white">
              Interior
              <span className="block font-semibold text-amber-400">Design Studio</span>
            </h1>
            <p className="mt-6 text-gray-300 text-lg max-w-2xl leading-8">Creating luxurious interiors that combine beauty, comfort, functionality and timeless elegance.</p>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[5px] text-amber-600 text-sm">About Interior Design</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900">
              Spaces That Reflect
              <span className="block text-amber-600">Your Lifestyle</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-lg leading-8">Interior design is more than decoration. It is about creating spaces that enhance daily living through thoughtful planning, luxury aesthetics, premium materials and smart functionality.</p>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <p className="uppercase tracking-[5px] text-amber-600 text-sm">Gallery</p>
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
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div key={photo._id} className="relative h-[450px] rounded-[35px] overflow-hidden">
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

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <p className="uppercase tracking-[5px] text-amber-600 text-sm">Services</p>
        <h2 className="text-4xl font-semibold mt-3 text-gray-900">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {services.map((item, index) => (
            <div key={index} className="bg-white rounded-[30px] p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-4 text-gray-500 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[40px] p-12 shadow-lg">
          <h2 className="text-4xl font-semibold text-gray-900">Why Choose Nidhi Designs?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div><h3 className="text-2xl font-semibold text-amber-600">10+</h3><p className="mt-2 text-gray-600">Years of Design Experience</p></div>
            <div><h3 className="text-2xl font-semibold text-amber-600">300+</h3><p className="mt-2 text-gray-600">Successfully Completed Projects</p></div>
            <div><h3 className="text-2xl font-semibold text-amber-600">100%</h3><p className="mt-2 text-gray-600">Customized Design Solutions</p></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">
            Ready To Transform
            <span className="block text-amber-400">Your Space?</span>
          </h2>
          <p className="text-gray-300 mt-6 text-lg">Let's create a beautiful interior that reflects your personality and lifestyle.</p>
          <Link href="/contact" className="inline-block mt-10 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:scale-105 transition-all duration-300">Contact Us</Link>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Add New Interior Design Photo
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