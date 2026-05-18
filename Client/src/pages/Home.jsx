import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RoughInkBorder, DeckleCard } from '../components/VicoloBase';
import { useHeroParallax } from '../hooks/useParallax';

export default function Home() {
  const { 
    ref: heroRef, 
    backgroundY, 
    midgroundY, 
    foregroundY, 
    textY, 
    overlayOpacity 
  } = useHeroParallax();

  return (
    <div className="relative -mt-[1px]"> {/* Negate any subpixel edge gaps */}
      {/* ─── Hero: The Alley Arrival (Parallax) ─── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-vicolo-paper">
        {/* Layer 1: Background (Farthest) */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 opacity-30 filter contrast-125"
        >
          <img 
            src="/assets/hero_bg.png" 
            alt="Alleyway background" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer 2: Mid-Alley Sketch */}
        <motion.div 
          style={{ y: midgroundY }}
          className="absolute inset-x-0 top-0 z-10 opacity-60 mix-blend-multiply"
        >
          <img 
            src="/assets/hero_mid.png" 
            alt="Alleyway details" 
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Layer 3: Foreground Text & HUD Elements */}
        <motion.div 
          style={{ y: textY }}
          className="absolute inset-x-0 inset-y-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="space-y-4"
          >
            <span className="font-headline text-xs uppercase tracking-[0.4em] text-vicolo-ochre block mb-4">
              Est. 1984 — Roma
            </span>
            <h1 className="font-headline text-7xl md:text-9xl text-vicolo-ink leading-none font-bold tracking-tighter mix-blend-multiply">
              The Soul of <br />
              <span className="text-vicolo-ochre italic font-light signature block mt-2 text-8xl md:text-[10rem]">the Alleyway.</span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Layer 4: Close Foreground (Nearest) */}
        <motion.div 
          style={{ y: foregroundY }}
          className="absolute inset-0 z-30 pointer-events-none"
        >
          <div className="absolute top-1/2 left-20 -rotate-6">
            <span className="font-script text-3xl text-vicolo-ochre/60">"Wait for the golden hour."</span>
          </div>
        </motion.div>

        {/* Bottom Fade Gradient for Smooth Scroll Entry */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-40 bg-gradient-to-b from-transparent via-vicolo-paper/40 to-vicolo-paper pointer-events-none" 
        />
      </section>

      {/* ─── Story: Written in Ink ─── */}
      <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-5 space-y-8">
          <div className="sketch-line">
            <span className="font-script text-4xl text-vicolo-ochre mb-2 block">Our Story</span>
          </div>
          <h2 className="font-headline text-5xl md:text-6xl text-vicolo-ink leading-[1.1] font-bold">
            Written in Ink, brewed in Charcoal.
          </h2>
          <p className="font-body text-lg text-vicolo-ink-wash leading-relaxed">
            Vicolo was born from a single sketch made in a rainy Trastevere alleyway. We believe that coffee is more than a caffeine ritual—it's a narrative. Our space is designed as a living sketchbook, where every stain tells a story and every cup is a brushstroke.
          </p>
          <div className="flex gap-4 items-center">
            <div className="h-[1px] w-12 bg-vicolo-outline-light" />
            <span className="font-headline text-xs tracking-widest text-vicolo-outline uppercase">Hand-drawn with love</span>
          </div>
        </div>

        <div className="md:col-span-7">
          <DeckleCard className="aspect-[4/5] p-2 rotate-1 shadow-2xl overflow-hidden group">
            <img 
              src="/assets/story_interior.png" 
              alt="Cafe interior sketch" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 contrast-[1.1] grayscale hover:grayscale-0"
            />
          </DeckleCard>
        </div>
      </section>

      {/* ─── Gallery: The Journal ─── */}
      <section className="bg-vicolo-surface/30 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-20">
            <div className="space-y-4">
              <h2 className="font-headline text-5xl font-bold">The Journal</h2>
              <p className="font-body text-vicolo-ink-wash">Captured moments from our favorite corners.</p>
            </div>
            <Link to="/journal" className="font-headline text-sm tracking-[0.2em] uppercase text-vicolo-ochre border-b-2 border-vicolo-ochre/20 hover:border-vicolo-ochre transition-all pb-1">
              Explore Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-[700px]">
            <div className="md:col-span-2 md:row-span-2 shadow-sm rounded-sm overflow-hidden group">
              <img src="/assets/journal_coffee.png" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Ritual" />
            </div>
            <div className="md:col-span-1 shadow-sm rounded-sm overflow-hidden group">
              <img src="/assets/journal_cornetto.png" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Pastry" />
            </div>
            <div className="md:col-span-1 shadow-sm rounded-sm overflow-hidden group">
              <img src="/assets/journal_window.png" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Reading" />
            </div>
            <div className="md:col-span-2 shadow-sm rounded-sm overflow-hidden group relative">
               <div className="absolute top-4 left-4 z-10 -rotate-3">
                <span className="bg-vicolo-ochre text-vicolo-paper px-3 py-1 font-script text-2xl shadow-lg">Chef's Selection</span>
              </div>
              <img src="/assets/journal_food.png" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Beans" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
