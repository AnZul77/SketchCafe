import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useApp } from "../context/AppContext";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc: earliest first, desc: latest first
  const { showPopup } = useApp();

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations/all");
      setReservations(res.data);
    } catch (err) {
      showPopup("Failed to fetch reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/reservations/${id}/status`, { status });
      showPopup("Reservation status updated!");
      fetchReservations();
    } catch (err) {
      showPopup("Failed to update status");
    }
  };

  const getLocalDateString = (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const processedReservations = reservations
    .filter(res => !selectedDate || getLocalDateString(res.date) === selectedDate)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <h1 className="text-4xl">Manage <span className="font-script text-vicolo-ochre normal-case">Reservations</span></h1>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-vicolo-ink-wash">Filter Date:</span>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="bg-transparent border-b border-vicolo-ink/30 pb-1 focus:outline-none focus:border-vicolo-ochre text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedDate(getLocalDateString(new Date()))}
                className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors ${
                  selectedDate === getLocalDateString(new Date())
                  ? 'bg-vicolo-ink text-vicolo-paper border-vicolo-ink' 
                  : 'border-vicolo-ink/30 hover:border-vicolo-ochre hover:text-vicolo-ochre'
                }`}
              >
                Today
              </button>
              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate("")} 
                  className="px-3 py-1 text-xs uppercase tracking-wider border border-red-500/30 text-red-500 hover:bg-red-50/50 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="h-6 w-[1px] bg-vicolo-outline/30 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-vicolo-ink-wash">Sort:</span>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-b border-vicolo-ink/30 pb-1 focus:outline-none focus:border-vicolo-ochre text-sm font-headline"
              >
                <option value="asc">Earliest First</option>
                <option value="desc">Latest First</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-vicolo-surface p-8 border border-vicolo-outline/20">
          {processedReservations.length === 0 ? (
            <p className="text-vicolo-ink-wash py-8 text-center">
              {selectedDate 
                ? `No reservations scheduled for ${new Date(selectedDate + "T00:00:00").toLocaleDateString(undefined, { dateStyle: 'long' })}.`
                : "No reservations found."}
            </p>
          ) : (
            <div className="space-y-6">
              {processedReservations.map(res => (
                <motion.div key={res._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border border-vicolo-outline/30 bg-vicolo-paper flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div>
                    <h3 className="font-headline text-lg mb-1">
                      {new Date(res.date).toLocaleDateString(undefined, { dateStyle: 'long' })} at {res.time}
                    </h3>
                    <p className="text-sm text-vicolo-ink-wash">{res.guests} Guests</p>
                    <p className="text-sm text-vicolo-ink-wash mt-2">
                      User: {res.user?.name || "Unknown"} ({res.user?.email || "N/A"})
                    </p>
                    {res.specialRequests && (
                      <p className="text-sm text-vicolo-ink/80 mt-3 italic">
                        Note: "{res.specialRequests}"
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[150px]">
                    <span className={`text-xs uppercase tracking-wider font-bold mb-2 ${
                      res.status === 'pending' ? 'text-vicolo-ochre' :
                      res.status === 'confirmed' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      Status: {res.status}
                    </span>
                    <select 
                      value={res.status}
                      onChange={(e) => updateStatus(res._id, e.target.value)}
                      className="bg-transparent border-b border-vicolo-ink/30 pb-1 focus:outline-none focus:border-vicolo-ochre font-headline text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
