import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

const SESSION_KEY = "cc_admin_authed";
const CORRECT = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminGuard({ children }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  // Persist auth for the browser session
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") setAuthed(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
    } else {
      setError("Incorrect password. Please try again.");
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  if (authed) return children;

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 rounded-full bg-violet-500/10 blur-3xl animate-blob [animation-delay:3s] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={shaking ? { x: [0, -10, 10, -8, 8, 0] } : { opacity: 1, y: 0 }}
        transition={shaking ? { duration: 0.4 } : { duration: 0.5 }}
        className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center">
            <Lock size={28} className="text-brand-accent" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-2xl text-white">Admin Access</h1>
          <p className="text-white/40 text-sm mt-2">Enter your admin password to continue.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              id="admin-password"
              type={showPw ? "text" : "password"}
              placeholder="Admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              autoFocus
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5"
            >
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-brand-accent text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-brand-accent/20"
          >
            <ShieldCheck size={16} /> Enter Dashboard
          </motion.button>
        </form>

        {/* Footer hint */}
        <p className="text-center text-white/20 text-xs mt-6">
          Protected by CleanCuts Admin Guard
        </p>
      </motion.div>
    </div>
  );
}
