import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { cart, user } = useApp();

  return (
    <nav className="fixed top-0 left-0 w-full z-100 flex justify-center px-4 py-4 pointer-events-none">
      <div className="flex items-center justify-between w-full max-w-6xl px-12 py-3 bg-vicolo-surface/80 backdrop-blur-md rough-border ink-shadow pointer-events-auto">
        {/* Signature Logo */}
        <NavLink to="/" className="group relative">
          <span className="font-script text-4xl text-vicolo-ink group-hover:text-vicolo-ochre transition-colors duration-500">
            Vicolo
          </span>
          <motion.div 
            className="absolute -bottom-1 left-0 h-[2px] bg-vicolo-ochre"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />
        </NavLink>

        {/* Navigation Links - Margin Note Style */}
        <div className="flex gap-10 items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
            { name: 'Journal', path: '/journal' },
            { name: 'About', path: '/about' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative font-headline text-sm uppercase tracking-[0.2em] transition-all duration-300 hidden md:block ${
                  isActive ? 'text-vicolo-ochre underline underline-offset-8 decoration-vicolo-ochre/20' : 'text-vicolo-ink/60 hover:text-vicolo-ink'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          <div className="h-4 w-[1px] bg-vicolo-ink/10 mx-2 hidden md:block" />

          {/* New Reactive Icons: Cart & Profile */}
          <div className="flex items-center gap-8">
            <NavLink to="/cart" className="relative group">
               <span className="font-headline text-[10px] tracking-widest uppercase text-vicolo-ink/40 group-hover:text-vicolo-ochre transition-colors pt-1 block">Receipt</span>
               <AnimatePresence>
                 {cart.length > 0 && (
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     exit={{ scale: 0 }}
                     className="absolute -top-1 -right-4 w-5 h-5 bg-vicolo-ochre text-vicolo-paper text-[10px] flex items-center justify-center font-headline font-bold rounded-full shadow-[0_4px_10px_rgba(227,160,50,0.3)] skew-x-12"
                   >
                     {cart.length}
                   </motion.div>
                 )}
               </AnimatePresence>
            </NavLink>

            <NavLink 
              to={user ? "/profile" : "/login"} 
              className={({ isActive }) => 
                `flex items-center gap-3 font-headline text-[10px] uppercase tracking-widest transition-all ${
                  isActive ? 'text-vicolo-ochre' : 'text-vicolo-ink/40 hover:text-vicolo-ink'
                }`
              }
            >
              <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center opacity-60">
                 <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                 </svg>
              </div>
              <span className="hidden lg:block">{user ? user.name.split(' ')[0] : 'Passport'}</span>
            </NavLink>

            {user?.role === 'admin' && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  `px-6 py-2 bg-transparent text-vicolo-ink border border-vicolo-ink font-headline text-xs uppercase tracking-widest transition-all duration-500 rough-border ${
                    isActive ? 'bg-vicolo-ink text-vicolo-paper' : 'hover:bg-vicolo-ink hover:text-vicolo-paper'
                  }`
                }
              >
                Admin
              </NavLink>
            )}

            <NavLink 
              to="/reservations" 
              className={({ isActive }) => 
                `px-6 py-2 bg-vicolo-ink text-vicolo-paper font-headline text-xs uppercase tracking-widest transition-all duration-500 rough-border ${
                  isActive ? 'bg-vicolo-ochre' : 'hover:bg-vicolo-ochre'
                }`
              }
            >
              Reservations
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
