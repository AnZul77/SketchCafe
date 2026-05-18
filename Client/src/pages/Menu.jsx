import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { DeckleCard } from '../components/VicoloBase';
import { useApp } from '../context/AppContext';

export default function Menu() {
  const { cart, addToCart } = useApp();
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    API.get("/menu")
      .then(res => {
        const grouped = res.data.reduce((acc, item) => {
          const cat = item.category || 'other';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-vicolo-paper min-h-screen relative overflow-hidden font-body">
      {/* Background Textures */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-vicolo-surface/20 border-l border-vicolo-outline-light/10 hidden lg:block" />
      
      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <header className="mb-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <span className="font-script text-5xl text-vicolo-ochre mb-2 block">The Notebook</span>
            <div className="h-[2px] w-full bg-vicolo-ochre/30" />
          </motion.div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-vicolo-ink mt-6 uppercase tracking-tighter">
            Our Roasts & <br /> Rituals
          </h1>
        </header>

        {/* Menu Sections */}
        <div className="space-y-24">
          {Object.entries(menuData).map(([category, items], idx) => (
            <motion.section 
              key={category}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center gap-8 mb-12">
                <h2 className="font-headline text-3xl font-bold uppercase tracking-widest text-vicolo-ink">
                  {category}
                </h2>
                <div className="h-[1px] flex-grow bg-vicolo-outline-light/30" />
                <span className="font-script text-2xl text-vicolo-ochre opacity-60 italic">
                  #{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                  <DeckleCard className="p-2 rotate-[-2deg] shadow-lg grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                      src={
                        category === 'espresso' 
                          ? '/assets/menu_espresso.png'
                          : category === 'brewed'
                          ? '/assets/menu_brewed.png'
                          : '/assets/menu_signature.png'
                      }
                      alt={category}
                      className="w-full aspect-square object-cover"
                    />
                  </DeckleCard>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {items.map((item) => (
                    <div key={item._id} className="group relative pr-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-headline text-xl font-bold text-vicolo-ink group-hover:text-vicolo-ochre transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-script text-xl text-vicolo-ochre">€{Number(item.price).toFixed(2)}</span>
                      </div>
                      <p className="font-body text-vicolo-ink-wash leading-relaxed text-sm mb-4">
                        {item.description}
                      </p>
                      
                      {/* Interactive Scribble Button */}
                      <button 
                        onClick={() => addToCart(item)}
                        className="font-headline text-[10px] uppercase tracking-[0.2em] text-vicolo-ink/40 hover:text-vicolo-ochre transition-all flex items-center gap-2 group/btn"
                      >
                        <span className="w-4 h-[1px] bg-vicolo-ink/20 group-hover/btn:bg-vicolo-ochre group-hover/btn:w-6 transition-all" />
                        Add to Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Floating "View Receipt" Action */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-12 right-12 z-50"
            >
              <Link to="/cart">
                <div className="bg-vicolo-ink text-vicolo-paper p-6 shadow-2xl skew-x-[-2deg] rough-border cursor-pointer hover:bg-vicolo-ochre transition-all group">
                  <span className="font-headline text-xs tracking-widest uppercase block mb-1 opacity-60">Your Selection</span>
                  <div className="flex items-center gap-6">
                    <span className="font-headline text-4xl font-bold">{cart.length}</span>
                    <div className="h-10 w-[1px] bg-vicolo-paper/20" />
                    <span className="font-script text-2xl group-hover:translate-x-2 transition-transform">View Receipt →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA: Reservations */}
        <div className="mt-32 flex justify-center">
          <Link to="/reservations" className="block w-full max-w-2xl px-4">
            <div className="bg-vicolo-surface p-12 md:p-20 text-center relative shadow-xl deckle-edge group cursor-pointer hover:rotate-1 transition-transform">
               <span className="font-script text-4xl text-vicolo-ochre mb-6 block">Join the alley.</span>
               <h3 className="font-headline text-4xl font-bold text-vicolo-ink mb-8">Ready to start your chapter?</h3>
               <div className="inline-block px-12 py-4 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-[0.3em] text-sm group-hover:bg-vicolo-ochre transition-all duration-500">
                 Reserve a table
               </div>
               
               <div className="absolute -bottom-8 -right-8 rotate-[-5deg]">
                 <span className="font-script text-2xl text-vicolo-ink/40">P.S. Bringing a notebook is <br /> highly encouraged.</span>
               </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
