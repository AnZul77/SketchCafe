import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useApp } from "../context/AppContext";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { showPopup } = useApp();
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "espresso", imageUrl: "", available: true
  });
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await API.get("/menu?all=true");
      setMenuItems(res.data);
    } catch (err) {
      showPopup("Failed to fetch menu");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/menu/${editingId}`, formData);
        showPopup("Menu item updated");
      } else {
        await API.post("/menu", formData);
        showPopup("Menu item added");
      }
      setFormData({ name: "", description: "", price: "", category: "espresso", imageUrl: "", available: true });
      setEditingId(null);
      fetchMenu();
    } catch (err) {
      showPopup("Error saving menu item");
    }
  };

  const editItem = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category || "espresso",
      imageUrl: item.imageUrl || "",
      available: item.available
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async (id) => {
    try {
      await API.delete(`/menu/${id}`);
      showPopup("Menu item deleted");
      setDeletingId(null);
      fetchMenu();
    } catch (err) {
      showPopup("Failed to delete");
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-12">Manage <span className="font-script text-vicolo-ochre normal-case">Menu</span></h1>
        
        <div className="bg-vicolo-surface p-8 border border-vicolo-outline/20 mb-12">
          <h2 className="text-2xl mb-6 font-headline">{editingId ? "Edit Item" : "Add New Item"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b border-vicolo-ink/30 pb-2 focus:outline-none focus:border-vicolo-ochre" />
            <input required type="number" step="0.01" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-transparent border-b border-vicolo-ink/30 pb-2 focus:outline-none focus:border-vicolo-ochre" />
            <input required type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-transparent border-b border-vicolo-ink/30 pb-2 focus:outline-none focus:border-vicolo-ochre md:col-span-2" />
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-transparent border-b border-vicolo-ink/30 pb-2 focus:outline-none focus:border-vicolo-ochre">
              <option value="espresso">espresso</option>
              <option value="brewed">brewed</option>
              <option value="signatures">signatures</option>
            </select>
            <input type="text" placeholder="Image URL (optional)" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="bg-transparent border-b border-vicolo-ink/30 pb-2 focus:outline-none focus:border-vicolo-ochre" />
            <label className="flex items-center gap-2 text-sm text-vicolo-ink-wash">
              <input type="checkbox" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} className="accent-vicolo-ochre" />
              Available
            </label>
            <div className="md:col-span-2 mt-4 flex gap-4">
              <button type="submit" className="px-8 py-3 bg-vicolo-ink text-vicolo-paper hover:bg-vicolo-ochre transition-colors font-headline uppercase text-sm tracking-widest">
                {editingId ? "Update Item" : "Add Item"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData({name:"", description:"", price:"", category:"espresso", imageUrl:"", available:true}); }} className="px-8 py-3 border border-vicolo-ink hover:text-vicolo-ochre transition-colors font-headline uppercase text-sm tracking-widest">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {menuItems.map(item => (
            <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border border-vicolo-outline/30 bg-vicolo-paper flex justify-between items-center gap-4">
              <div>
                <h3 className="font-headline text-lg">{item.name} <span className="text-vicolo-ochre ml-2">${item.price}</span></h3>
                <p className="text-sm text-vicolo-ink-wash">{item.category} | {item.available ? 'Available' : 'Unavailable'}</p>
              </div>
              <div className="flex gap-4">
                {deletingId === item._id ? (
                  <>
                    <button onClick={() => confirmDelete(item._id)} className="text-sm uppercase tracking-wider text-red-500 font-bold hover:text-red-700">Confirm</button>
                    <button onClick={() => setDeletingId(null)} className="text-sm uppercase tracking-wider text-vicolo-ink-wash hover:text-vicolo-ink">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editItem(item)} className="text-sm uppercase tracking-wider text-vicolo-ink hover:text-vicolo-ochre">Edit</button>
                    <button onClick={() => setDeletingId(item._id)} className="text-sm uppercase tracking-wider text-red-500 hover:text-red-700">Delete</button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
