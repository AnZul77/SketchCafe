import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { DeckleCard } from "../components/VicoloBase";

export default function Profile() {
  const { user, reservations, orders, logout, fetchMyReservations, fetchMyOrders } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      fetchMyReservations();
      fetchMyOrders();
    }
  }, [user, navigate, fetchMyReservations, fetchMyOrders]);

  if (!user) return null;

  return (
    <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen font-body relative overflow-hidden">
      {/* Hand-drawn coffee cup stain */}
      <div className="absolute top-20 right-[-10%] w-[30rem] h-[30rem] border border-vicolo-ink/5 rounded-full opacity-40 blur-sm pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-8 relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-4">
            <span className="font-script text-4xl text-vicolo-ochre mb-2 block">Member Journal</span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold text-vicolo-ink tracking-tighter uppercase relative">
              {user.name.split(' ')[0]}'s <span className="italic signature text-vicolo-ochre block md:inline">Chapter.</span>
            </h1>
          </div>
          <button 
            onClick={handleLogout}
            className="font-headline text-[10px] uppercase tracking-[0.5em] text-vicolo-ink/30 hover:text-red-800 transition-colors border-b border-vicolo-ink/5 pb-1"
          >
            Close Passport
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Section: Active Reservations */}
          <section className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-6">
               <h2 className="font-headline text-2xl font-bold text-vicolo-ink uppercase tracking-widest italic">Reservations</h2>
               <div className="h-px flex-grow bg-vicolo-ink/5" />
            </div>
            
            <AnimatePresence mode="popLayout">
              {reservations.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 border-2 border-vicolo-ink/5 border-dashed rough-border text-center group"
                >
                  <p className="font-body text-vicolo-ink-wash mb-8 italic opacity-40">No chairs claimed yet.</p>
                  <Link to="/reservations" className="px-10 py-4 bg-vicolo-ochre text-vicolo-paper font-headline uppercase tracking-widest text-xs hover:bg-vicolo-ink transition-all shadow-xl inline-block group-hover:rotate-1">
                    Book a Table
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {reservations.map((res) => (
                    <motion.div 
                      key={res._id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="relative"
                    >
                      <DeckleCard className="bg-vicolo-surface/40 p-8 shadow-xl border-l-4 border-vicolo-ochre skew-x-[-1deg] overflow-hidden">
                        <div className="flex justify-between items-start">
                           <div>
                              <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink/40 block mb-2">{res.date ? new Date(res.date).toLocaleDateString() : ''} @ {res.time}</span>
                              <h3 className="font-headline text-2xl font-bold text-vicolo-ink uppercase">{res.guests} Guests</h3>
                           </div>
                           <span className="font-script text-2xl text-vicolo-ochre opacity-60">#{res._id?.slice(-4)}</span>
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                           <span className="font-headline text-[10px] text-vicolo-ochre tracking-widest uppercase font-bold">{res.status}</span>
                           <div className="h-[1px] w-24 bg-vicolo-ochre/20" />
                        </div>
                      </DeckleCard>
                      {/* Decorative Tape effect */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-24 bg-vicolo-ink/5 opacity-40 blur-sm pointer-events-none skew-x-12" />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </section>

          {/* Section: Order History & Status */}
          <section className="lg:col-span-7 space-y-12">
            <div className="flex items-center gap-6">
               <h2 className="font-headline text-2xl font-bold text-vicolo-ink uppercase tracking-widest italic">The Feed</h2>
               <div className="h-px flex-grow bg-vicolo-ink/5" />
            </div>

            <div className="space-y-12">
              {orders.length === 0 ? (
                <div className="p-12 border-2 border-vicolo-ink/5 border-dashed rough-border text-center opacity-40">
                  <p className="font-body italic italic">No narratives brewed yet.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <motion.div 
                    key={order._id}
                    layout
                    className="relative group"
                  >
                    <div className="bg-vicolo-paper p-10 shadow-2xl skew-x-[-0.5deg] border border-vicolo-outline-light/10 rough-border relative z-10">
                      <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
                        <div>
                          <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink/40 mb-2 block">{new Date(order.createdAt).toLocaleTimeString()} — {order.tableNumber}</span>
                          <h3 className="font-headline text-4xl font-bold text-vicolo-ink tracking-tight">#{order._id?.slice(-6)}</h3>
                        </div>
                        <div className="text-right">
                          <span className="font-script text-4xl text-vicolo-ochre tracking-tighter block leading-none">₹{order.totalAmount?.toFixed(0)}</span>
                          <span className="font-headline text-[8px] tracking-[0.4em] uppercase text-vicolo-ink/20 font-bold block mt-2 italic">{order.status}</span>
                        </div>
                      </div>

                      {/* Live Status Journey (Progress Bar) */}
                      <div className="space-y-4">
                        <div className="h-1 lg:h-2 bg-vicolo-surface overflow-hidden relative">
                           <motion.div 
                             initial={{ width: '0%' }}
                             animate={{ width: order.status === 'pending' ? '33%' : order.status === 'preparing' ? '66%' : '100%' }}
                             className="h-full bg-vicolo-ochre transition-all duration-1000"
                           />
                        </div>
                        <div className="flex justify-between font-headline text-[8px] uppercase tracking-widest text-vicolo-ink-wash/30 font-bold">
                           <span className={order.status === 'pending' ? 'text-vicolo-ochre' : ''}>Pending</span>
                           <span className={order.status === 'preparing' ? 'text-vicolo-ochre' : ''}>Preparing</span>
                           <span className={order.status === 'served' ? 'text-vicolo-ochre font-black' : ''}>Served</span>
                        </div>
                      </div>

                      <div className="mt-10 pt-8 border-t border-vicolo-ink/5 grid grid-cols-2 gap-4">
                        {order.items.slice(0, 4).map(item => (
                          <div key={item._id} className="font-body text-[10px] text-vicolo-ink-wash flex justify-between">
                            <span>{item.menuItem?.name}</span>
                            <span className="font-bold">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
