import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full bg-vicolo-surface mt-24 border-t border-vicolo-outline-light/10 relative overflow-hidden">
      {/* Deckle Edge Transition */}
      <div className="absolute top-0 left-0 w-full h-8 bg-vicolo-paper deckle-edge -translate-y-1/2 shadow-sm z-10" />

      <div className="max-w-7xl mx-auto px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand Signature */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-script text-5xl text-vicolo-ink">Vicolo</h2>
            <p className="font-body text-vicolo-ink-wash max-w-sm leading-relaxed">
              Every Sketch. Every Pour. <br />
              Capturing the fleeting moments of a Roman morning since 1984.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="font-headline text-xs uppercase tracking-[0.25em] text-vicolo-ink/40">The Book</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'About', path: '/about' },
                { name: 'Journal', path: '/journal' },
                { name: 'Reservations', path: '/reservations' }
              ].map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="font-headline text-sm text-vicolo-ink hover:text-vicolo-ochre transition-all hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="font-headline text-xs uppercase tracking-[0.25em] text-vicolo-ink/40">Connect</h4>
            <div className="space-y-4">
              <p className="font-body text-sm text-vicolo-ink-wash">
                Join the alley. <br />
                Get occasional sketches and secrets.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="The journal awaits..." 
                  className="w-full bg-transparent border-b-2 border-vicolo-outline-light/50 focus:border-vicolo-ink outline-none px-0 py-3 font-body text-sm transition-all duration-500 placeholder:text-vicolo-outline-light italic"
                />
                <motion.button 
                  className="absolute right-0 bottom-3 text-vicolo-ochre hover:text-vicolo-ink transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="mt-20 pt-8 border-t border-vicolo-outline-light/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-headline uppercase tracking-widest text-vicolo-ink/30">
          <span>&copy; 1984 - 2026 THE VICOLO JOURNAL</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-vicolo-ink">Privacy</a>
            <a href="#" className="hover:text-vicolo-ink">Terms</a>
            <a href="#" className="hover:text-vicolo-ink">Architectural Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
