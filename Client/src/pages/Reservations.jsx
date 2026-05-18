import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DeckleCard } from '../components/VicoloBase';

export default function Reservations() {
  const { addReservation, user, showPopup } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    guests: 1,
    date: '',
    time: 'Morning Ritual (08:00)',
    specialRequests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Attach user info to the reservation implicitly
    const reservationData = {
      ...formData,
      name: user?.name || 'Anonymous Thinker',
      email: user?.email || 'member@vicolo.com'
    };
    
    try {
      await addReservation(reservationData);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert("Failed to make reservation. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen lg:min-h-[110vh] overflow-hidden bg-vicolo-ink text-vicolo-paper flex flex-col justify-center py-20 pb-32 font-body">
      {/* ─── Background Atmosphere ─── */}
      <div className="fixed inset-0 -z-10 opacity-5 grayscale contrast-125">
        <img 
          src="/assets/hero_mid.png" 
          alt="Alley background" 
          className="w-full h-full object-cover"
        />
      </div>

      <main className="max-w-4xl mx-auto px-8 relative z-10">
        <header className="text-center mb-8 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="font-script text-3xl text-vicolo-ochre mb-1 block">The Alley Table</span>
            <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-3">
              Claim Your <br /> Corner
            </h1>
            <div className="h-px w-12 bg-vicolo-ochre/30 mx-auto" />
            
            {user && (
              <div className="mt-8 flex items-center justify-center gap-4 opacity-70">
                <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-paper/40 italic">Member: <span className="text-vicolo-paper font-bold underline decoration-vicolo-ochre/30">{user.name}</span></span>
              </div>
            )}
          </motion.div>
        </header>

        {/* ─── Reservation Form: "The Logbook" ─── */}
        <DeckleCard className="bg-vicolo-paper/90 p-8 md:p-12 shadow-2xl rotate-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-vicolo-ink">
              <div className="space-y-4">
                <label className="font-headline text-xs uppercase tracking-widest text-vicolo-ink/60 block">Guests</label>
                <input 
                  type="number"
                  min="1"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                  className="w-full bg-transparent border-b border-vicolo-ink/20 py-4 font-body focus:border-vicolo-ochre outline-none"
                />
              </div>
              <div className="space-y-4">
                <label className="font-headline text-xs uppercase tracking-widest text-vicolo-ink/60 block">Date</label>
                <input 
                  required
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-transparent border-b border-vicolo-ink/20 py-4 font-body focus:border-vicolo-ochre outline-none" 
                />
              </div>
              <div className="space-y-4">
                <label className="font-headline text-xs uppercase tracking-widest text-vicolo-ink/60 block">Time</label>
                <select 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-transparent border-b border-vicolo-ink/20 py-4 font-body focus:border-vicolo-ochre outline-none cursor-pointer"
                >
                  <option>Morning Ritual (08:00)</option>
                  <option>Noon Draft (12:00)</option>
                  <option>Evening Ink (18:00)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 text-vicolo-ink">
              <label className="font-headline text-xs uppercase tracking-widest text-vicolo-ink/60 block">Special Requests (Optional)</label>
              <textarea 
                rows="3" 
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                placeholder="Preferred corner? Natural lighting?"
                className="w-full bg-transparent border border-vicolo-ink/10 rounded-none p-4 font-body focus:border-vicolo-ochre outline-none transition-colors resize-none shadow-inner"
              ></textarea>
            </div>

            <div className="pt-8 text-center relative group">
              <button 
                type="submit"
                className="w-full px-12 py-6 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-[0.5em] text-sm hover:bg-vicolo-ochre transition-all duration-700 relative z-10 shadow-2xl skew-x-[-1deg] rough-border"
              >
                Inscribe Reservation
              </button>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <span className="font-script text-6xl text-vicolo-ochre whitespace-nowrap">~ Vicolo Romano</span>
              </div>
            </div>
          </form>
        </DeckleCard>

        {/* ─── Sidebar Note ─── */}
        <div className="mt-12 text-center md:text-left">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="font-script text-2xl text-vicolo-ochre/60 italic px-8">
                 "Every corner of the alley holds a different light. We protect yours for the duration of your draft."
              </div>
              <div className="text-right pr-8 hidden md:block">
                 <span className="font-headline text-6xl font-black text-vicolo-paper/5 tracking-tighter select-none">ARCHITECTURE</span>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
