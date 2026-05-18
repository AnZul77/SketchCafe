import React from 'react';
import { motion } from 'framer-motion';
import { DeckleCard, RoughInkBorder } from '../components/VicoloBase';

const journalEntries = [
  {
    id: 1,
    title: "Rituale Matutino",
    date: "A rainy Wednesday",
    image: "/assets/journal_coffee.png",
    note: "The steam rises in the same pattern as the alley mist. Seven grams precisely, ground till it smells like earth after rain.",
    rotation: "-rotate-1",
    type: "ritual"
  },
  {
    id: 2,
    title: "The Golden Flake",
    date: "07:45 AM",
    image: "/assets/journal_cornetto.png",
    note: "Puff pastry like whispered secrets. The sugar dusts the morning air. Best enjoyed before the first Vespa passes.",
    rotation: "rotate-2",
    type: "food"
  },
  {
    id: 3,
    title: "Vicolo Dei Fiori",
    date: "Noon Shadows",
    image: "/assets/journal_window.png",
    note: "Counted 42 geraniums today. The ironwork is rusting beautifully—a perfect gradient of deep orange and black ink.",
    rotation: "-rotate-2",
    type: "architectural"
  },
  {
    id: 4,
    title: "Bruschetta Al Pomodoro",
    date: "Sunset Aperitivo",
    image: "/assets/journal_food.png",
    note: "Rustic bread charred on the grill. The tomatoes were picked at sunrise in the garden behind the church. Salt, oil, basil.",
    rotation: "rotate-1",
    type: "food"
  },
  {
    id: 5,
    title: "The Lone Observer",
    date: "Late Evening",
    image: "/assets/journal_bench.png",
    note: "A bench was built for staring at nothing. Tonight, nothing looked particularly beautiful under the street lamp.",
    rotation: "-rotate-1",
    type: "architectural"
  }
];

export default function Journal() {
  return (
    <div className="relative pt-32 pb-32 min-h-screen bg-vicolo-paper text-vicolo-ink overflow-hidden font-body">
      {/* ─── Paper Texture & Ink Wash Background ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
      
      <main className="max-w-7xl mx-auto px-8">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="font-script text-4xl text-vicolo-ochre mb-4 block">Chronicles from the Alley</span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
              The Journal
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs font-headline uppercase tracking-[0.3em] text-vicolo-outline">
              <div className="h-px w-12 bg-vicolo-outline-light" />
              <span>Written in Charcoal & Coffee</span>
              <div className="h-px w-12 bg-vicolo-outline-light" />
            </div>
          </motion.div>
        </header>

        {/* ─── Journal Grid ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start">
          {journalEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col ${entry.rotation}`}
            >
              <DeckleCard className="p-2 mb-6 bg-white shadow-xl overflow-hidden group">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={entry.image} 
                    alt={entry.title} 
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  {/* Decorative ink stain overlay on images */}
                  <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
                </div>
              </DeckleCard>
              
              <div className="px-4 space-y-4">
                <div className="flex justify-between items-baseline gap-4">
                   <h3 className="font-headline text-2xl font-bold uppercase tracking-tight leading-tight">{entry.title}</h3>
                   <span className="font-script text-lg text-vicolo-ochre whitespace-nowrap">{entry.date}</span>
                </div>
                <div className="relative">
                  <p className="font-body text-sm italic leading-relaxed text-vicolo-ink-wash border-l-2 border-vicolo-ochre/20 pl-4 py-1">
                    "{entry.note}"
                  </p>
                  <div className="absolute -bottom-2 right-0 font-headline text-[0.6rem] uppercase tracking-widest text-vicolo-ink/10">
                    Observation #{entry.id}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ─── Special Note Block ─── */}
          <motion.div 
            className="md:col-span-1 lg:col-span-1 h-full flex items-center justify-center rotate-3 pt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="text-center space-y-4 border-2 border-dashed border-vicolo-outline-light/30 p-12 bg-vicolo-surface/10 rounded-sm">
               <span className="font-script text-3xl text-vicolo-outline">To be continued...</span>
               <p className="font-headline text-[0.6rem] uppercase tracking-widest text-vicolo-ink/20">
                 More moments are being sketched as we speak in the shadowed corners of our alley.
               </p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ─── Decorative Corner Scribble ─── */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-20 -rotate-12 z-0 hidden lg:block">
        <span className="font-script text-7xl text-vicolo-ochre uppercase font-bold tracking-tighter mix-blend-multiply">Vicolo Roma</span>
      </div>
    </div>
  );
}
