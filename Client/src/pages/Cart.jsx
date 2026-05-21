import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DeckleCard } from '../components/VicoloBase';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useApp();
  
  const subtotal = cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen text-center px-8 font-body">
        <span className="font-script text-6xl text-vicolo-ochre/30 block mb-8">Empty Receipt</span>
        <h2 className="font-headline text-4xl font-bold text-vicolo-ink mb-12 uppercase tracking-tighter">Your journal is blank.</h2>
        <Link to="/menu" className="px-12 py-5 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-widest text-sm hover:bg-vicolo-ochre transition-all">
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen font-body relative overflow-hidden">
      {/* Background spill/ink blot */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-vicolo-ochre/5 blur-3xl rounded-full" />
      
      <main className="max-w-3xl mx-auto px-8 relative z-10">
        <header className="mb-16 text-center">
          <span className="font-script text-4xl text-vicolo-ochre mb-2 block">The Selection</span>
          <h1 className="font-headline text-6xl font-bold text-vicolo-ink tracking-tighter uppercase">Your Receipt</h1>
          <div className="h-[2px] w-24 bg-vicolo-ochre/30 mx-auto mt-4" />
        </header>

        <DeckleCard className="bg-vicolo-surface/40 p-8 md:p-12 shadow-2xl skew-x-[-1deg]">
          <div className="space-y-10">
            {cart.map((item) => (
              <motion.div 
                key={item._id} 
                layout 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-vicolo-outline-light/20 pb-8 last:border-0"
              >
                <div className="flex-grow">
                  <h3 className="font-headline text-2xl font-bold text-vicolo-ink uppercase">{item.name}</h3>
                  <p className="font-body text-vicolo-ink-wash text-sm mt-1">{item.description}</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-4 bg-vicolo-paper/60 px-4 py-2 border border-vicolo-outline-light/10 rough-border">
                    <button 
                      onClick={() => updateQuantity(item._id, -1)}
                      className="text-vicolo-ink hover:text-vicolo-ochre font-bold text-xl px-2 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-headline text-xl font-bold text-vicolo-ink w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, 1)}
                      className="text-vicolo-ink hover:text-vicolo-ochre font-bold text-xl px-2 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[80px]">
                    <span className="font-script text-2xl text-vicolo-ochre tracking-tighter block leading-none">
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="font-headline text-[10px] uppercase tracking-widest text-vicolo-ink/30 hover:text-red-800 transition-colors mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t-2 border-vicolo-ink/10 space-y-6">
            <div className="flex justify-between items-end">
              <span className="font-headline text-sm tracking-[0.3em] uppercase text-vicolo-ink-wash">Subtotal</span>
              <span className="font-headline text-2xl font-bold text-vicolo-ink">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <span className="font-headline text-sm tracking-[0.3em] uppercase text-vicolo-ink-wash">Taxes</span>
                <span className="font-script text-xl text-vicolo-ochre/40 rotate-6 inline-block">Roma Tax</span>
              </div>
              <span className="font-headline text-2xl font-bold text-vicolo-ink">₹{(subtotal * 0.1).toFixed(0)}</span>
            </div>
            <div className="h-4 w-full bg-[linear-gradient(to_right,transparent_2px,#1b1c19_2px)] bg-[length:4px_1px] opacity-20" />
            <div className="flex justify-between items-baseline pt-4">
              <span className="font-headline text-2xl tracking-[0.1em] font-bold text-vicolo-ink uppercase">Grand Total</span>
              <span className="font-headline text-6xl font-bold text-vicolo-ochre tracking-tighter">₹{(subtotal * 1.1).toFixed(0)}</span>
            </div>
          </div>
        </DeckleCard>
        
        <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/menu" className="font-headline text-xs tracking-widest uppercase text-vicolo-ink/40 border-b border-vicolo-ink/10 hover:border-vicolo-ink transition-all pb-1">
            Back to Notebook
          </Link>
          <Link to="/checkout" className="px-16 py-6 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-[0.4em] text-sm hover:bg-vicolo-ochre transition-all shadow-2xl skew-x-[-2deg] rough-border text-center">
            Proceed to Checkout
          </Link>
        </div>
      </main>
    </div>
  );
}
