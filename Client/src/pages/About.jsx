import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DeckleCard, RoughInkBorder } from '../components/VicoloBase';

export default function About() {
  return (
    <div className="relative pt-40 pb-32 overflow-hidden bg-vicolo-paper font-body">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 opacity-10 filter grayscale contrast-125">
        <img 
          src="/assets/hero_bg.png" 
          alt="Alley background" 
          className="w-full h-full object-cover"
        />
      </div>

      <main className="max-w-7xl mx-auto px-8 relative z-10">
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="font-script text-4xl text-vicolo-ochre mb-4 block">Since 1984</span>
            <h1 className="font-headline text-7xl md:text-9xl font-bold text-vicolo-ink leading-[0.85] tracking-tighter">
              The <br /> <span className="text-vicolo-ochre italic font-light signature">Immersive</span> <br /> Sketch.
            </h1>
          </motion.div>
        </header>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Item 1: Large Story Block */}
          <motion.div 
            className="md:col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <DeckleCard className="p-12 md:p-20 bg-vicolo-surface/40 relative">
               <div className="absolute top-8 left-8">
                 <span className="font-headline text-xs tracking-widest text-vicolo-ochre uppercase font-bold">Volume I</span>
               </div>
               <div className="pt-8 space-y-8">
                  <h2 className="font-headline text-5xl font-bold leading-tight text-vicolo-ink">
                    Wait for the golden hour.
                  </h2>
                  <p className="font-body text-xl text-vicolo-ink-wash leading-relaxed max-w-xl">
                    Vicolo was born in the shadows of a sun-drenched Italian passage. Our founder, an architect turned barista, sketched the first floorplan on a napkin using charcoal from a morning fire. He envisioned a place where the precision of architectural design met the organic chaos of a perfect espresso pull.
                  </p>
                  <div className="pt-8 signature text-4xl text-vicolo-ink/30 italic">
                    ~ The Architect's Journal
                  </div>
               </div>
            </DeckleCard>
          </motion.div>

          {/* Item 2: Side Vertical Image */}
          <motion.div 
            className="md:col-span-6 lg:col-span-5 h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-full min-h-[500px] rough-border overflow-hidden rotate-2 shadow-2xl">
              <img 
                src="/assets/story_interior.png" 
                alt="Cafe interior" 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </motion.div>

          {/* Item 3: Philosophy Small Block */}
          <motion.div 
            className="md:col-span-6 lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <DeckleCard className="p-10 rotate-[-1deg] bg-vicolo-paper border border-vicolo-outline-light/10">
                <h3 className="font-headline text-2xl font-bold text-vicolo-ink mb-6 uppercase tracking-wider">The Standard</h3>
                <p className="font-body text-sm text-vicolo-ink-wash leading-loose">
                  In a world of digital perfection, we embrace the jitter. Every bean is roasted in small batches, monitored by human senses rather than algorithms.
                </p>
             </DeckleCard>
          </motion.div>

          {/* Item 4: Wide Breakout Section */}
          <motion.div 
            className="md:col-span-12 lg:col-span-8 mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
               <div className="absolute -top-12 -right-4 z-20">
                 <span className="font-script text-4xl text-vicolo-ochre rotate-12 inline-block">inked and brewed.</span>
               </div>
               <div className="aspect-[21/9] rough-border overflow-hidden grayscale">
                  <img 
                    src="/assets/hero_mid.png" 
                    className="w-full h-full object-cover opacity-80"
                    alt="Process sketch"
                  />
               </div>
            </div>
          </motion.div>
        </div>

        {/* Closing */}
        <section className="mt-40 text-center space-y-12">
           <div className="h-px w-32 bg-vicolo-outline-light/30 mx-auto" />
           <p className="font-script text-5xl text-vicolo-ink/60">Let's sketch a morning together.</p>
           <Link 
             to="/reservations" 
             className="px-16 py-5 bg-vicolo-ink text-vicolo-paper font-headline text-xs uppercase tracking-[0.5em] hover:bg-vicolo-ochre transition-all duration-700 inline-block no-underline"
           >
             Explore Reservations
           </Link>
        </section>
      </main>
    </div>
  );
}
