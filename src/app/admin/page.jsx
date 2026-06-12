'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminDashboard() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', category: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const router = useRouter();

  const categories = ['Architecture Design', 'Land Surveying', 'DGPS Surveying', 'Agriculture Survey', 'Interior Design', 'Other'];

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.success) setPhotos(data.photos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddPhoto = async () => {
    if (!selectedFile || !newPhoto.title || !newPhoto.category) {
      alert('Please fill all fields and select a photo');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error(uploadData.message);

      const saveRes = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPhoto.title, category: newPhoto.category, imageUrl: uploadData.imageUrl, publicId: uploadData.publicId }),
      });
      const saveData = await saveRes.json();
      if (!saveData.success) throw new Error(saveData.message);

      await fetchPhotos();
      setShowAddModal(false);
      setNewPhoto({ title: '', category: '' });
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) await fetchPhotos();
      else alert('Error deleting photo');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = async () => {
    if (!editingPhoto.title || !editingPhoto.category) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await fetch(`/api/admin/gallery/${editingPhoto._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingPhoto.title, category: editingPhoto.category }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchPhotos();
        setEditingPhoto(null);
      } else alert('Error updating photo');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
      <p className="text-[#d97706] text-xl">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1210]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Nidhi Designs — Admin Panel</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowAddModal(true)} className="bg-[#d97706] text-white px-6 py-2 rounded-lg hover:bg-[#b45309] transition-colors">+ Add Photo</button>
          <button onClick={handleLogout} className="border border-[#d97706] text-[#d97706] px-6 py-2 rounded-lg hover:bg-[#d97706] hover:text-white transition-colors">Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 py-6">
        <p className="text-[#6b5c4e]">Total Photos: <span className="font-bold text-[#1a1210]">{photos.length}</span></p>
      </div>

      {/* Photos Grid */}
      <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.length === 0 ? (
          <div className="col-span-4 text-center py-20">
            <p className="text-[#6b5c4e] text-lg">No photos yet. Add your first photo!</p>
          </div>
        ) : (
          photos.map((photo) => (
            <div key={photo._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src={photo.imageUrl} alt={photo.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#1a1210] truncate">{photo.title}</h3>
                <p className="text-sm text-[#d97706] mb-3">{photo.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => setEditingPhoto(photo)} className="flex-1 border border-[#d97706] text-[#d97706] py-1 rounded-lg text-sm hover:bg-[#d97706] hover:text-white transition-colors">Edit</button>
                  <button onClick={() => handleDelete(photo._id)} className="flex-1 border border-red-400 text-red-400 py-1 rounded-lg text-sm hover:bg-red-400 hover:text-white transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#1a1210] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Add New Photo</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1a1210] mb-2">Title</label>
              <input type="text" value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} placeholder="e.g. Modern Villa Design" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d97706]" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1a1210] mb-2">Category</label>
              <select value={newPhoto.category} onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d97706]">
                <option value="">Select Category</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1a1210] mb-2">Photo</label>
              <input type="file" accept="image/*" onChange={handleFileSelect} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none" />
              {previewUrl && (
                <div className="relative h-40 mt-3 rounded-lg overflow-hidden">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowAddModal(false); setNewPhoto({ title: '', category: '' }); setSelectedFile(null); setPreviewUrl(''); }} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleAddPhoto} disabled={uploading} className="flex-1 bg-[#d97706] text-white py-3 rounded-lg hover:bg-[#b45309] transition-colors disabled:opacity-50">{uploading ? 'Uploading...' : 'Add Photo'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#1a1210] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Edit Photo</h2>

            <div className="relative h-48 rounded-xl overflow-hidden mb-6">
              <Image src={editingPhoto.imageUrl} alt={editingPhoto.title} fill className="object-cover" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1a1210] mb-2">Title</label>
              <input type="text" value={editingPhoto.title} onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d97706]" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1a1210] mb-2">Category</label>
              <select value={editingPhoto.category} onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d97706]">
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setEditingPhoto(null)} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleEdit} className="flex-1 bg-[#d97706] text-white py-3 rounded-lg hover:bg-[#b45309] transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}