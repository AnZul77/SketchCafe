import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { DeckleCard } from "../components/VicoloBase";
import API from "../services/api";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login, showPopup } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const endpoint = isLogin
        ? "/auth/login"
        : "/auth/register";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await API.post(
        endpoint,
        payload
      );

      if (!isLogin) {
        setIsLogin(true);
        showPopup("Registration successful! Please access your passport.");
        return;
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      login({
        ...res.data.user,
        avatar: "/assets/profile_sketch.png",
      });

      navigate(from, {
        replace: true,
      });

    } catch (error) {

      console.log(error);

      showPopup(
        error.response?.data?.message ||
        "Authentication failed"
      );
    }
  };

  return (
    <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen font-body relative overflow-hidden flex items-center justify-center">
      {/* Background Stains */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-vicolo-ochre/5 blur-3xl rounded-full" />

      <main className="max-w-xl w-full px-8 relative z-10">
        <header className="mb-12 text-center">
          <span className="font-script text-4xl text-vicolo-ochre mb-2 block">{isLogin ? "Welcome Back" : "The Entrance"}</span>
          <h1 className="font-headline text-5xl font-bold text-vicolo-ink uppercase tracking-tighter italic">Vicolo Passport</h1>
          <div className="h-[2px] w-16 bg-vicolo-ochre/30 mx-auto mt-4" />
        </header>

        <DeckleCard className="p-8 md:p-12 bg-vicolo-surface/40 shadow-[20px_20px_60px_rgba(0,0,0,0.1)] skew-x-[-1deg] border border-vicolo-outline-light/10 relative">
          {/* Passport Photo Frame Overlay */}
          <div className="absolute top-10 right-10 w-24 h-24 border border-vicolo-ink/10 opacity-40 rough-border border-dashed p-1 rotate-6 hidden md:block">
            <div className="w-full h-full bg-vicolo-paper flex items-center justify-center">
              <span className="font-script text-[10px] text-vicolo-ink/20">Sign Here</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            {!isLogin && (
              <div className="space-y-4">
                <label className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40 block">Traveler's Name</label>
                <input
                  required={!isLogin}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-vicolo-ink/10 focus:border-vicolo-ochre outline-none font-headline text-xl text-vicolo-ink transition-all placeholder:text-vicolo-ink/10"
                  placeholder="Type your name"
                />
              </div>
            )}

            <div className="space-y-4">
              <label className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40 block">Contact Inscription</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-vicolo-ink/10 focus:border-vicolo-ochre outline-none font-headline text-xl text-vicolo-ink transition-all placeholder:text-vicolo-ink/10"
                placeholder="Email address"
              />
            </div>

            <div className="space-y-4">
              <label className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40 block">Secret Cipher (Password)</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-vicolo-ink/10 focus:border-vicolo-ochre outline-none font-headline text-xl text-vicolo-ink transition-all placeholder:text-vicolo-ink/10"
                placeholder="Enter password"
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full py-6 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-[0.5em] text-sm hover:bg-vicolo-ochre transition-all shadow-xl rough-border skew-x-[-1deg] relative group"
              >
                {isLogin ? "Access Passport" : "Inscribe Passport"}
                {/* Custom Ink blot stamp */}
                <div className="absolute -bottom-6 -right-6 w-16 h-16 opacity-10 group-hover:opacity-30 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-vicolo-ochre">
                    <path d="M50 10 Q70 20 80 50 Q70 80 50 90 Q30 80 20 50 Q30 20 50 10" />
                  </svg>
                </div>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-headline text-xs text-vicolo-ink/60 hover:text-vicolo-ochre uppercase tracking-widest transition-colors"
            >
              {isLogin ? "Need a passport? Sign up" : "Already have a passport? Login"}
            </button>
          </div>
        </DeckleCard>

        <p className="mt-12 text-center font-body text-xs text-vicolo-ink-wash uppercase tracking-widest opacity-40">
          Est. 1984 — Roman Chronicles
        </p>
      </main>
    </div>
  );
}
