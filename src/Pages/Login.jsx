import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShoppingBag } from "lucide-react";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 justify-center mb-8">
    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 60 30 A 24 24 0 1 0 60 70" stroke="black" strokeWidth="16" fill="none" strokeLinecap="butt" />
        <path d="M 80 30 A 24 24 0 1 0 80 70" stroke="#3b82f6" strokeWidth="16" fill="none" strokeLinecap="butt" />
      </svg>
    </div>
    <span className="font-heading font-bold text-2xl tracking-tighter text-brand-dark">
      Clean<span className="text-brand-accent">Cuts.</span>
    </span>
  </Link>
);

const InputField = ({ id, label, type = "text", placeholder, icon: Icon, value, onChange, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative">
      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent transition-all duration-200"
      />
      {children}
    </div>
  </div>
);

const PasswordField = ({ id, label, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <InputField id={id} label={label} type={show ? "text" : "password"} placeholder={placeholder} icon={Lock} value={value} onChange={onChange}>
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-accent transition-colors"
        tabIndex={-1}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </InputField>
  );
};

const SocialButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
  >
    {children}
  </button>
);

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('cc_users') || '[]');
    const user = users.find(u => u.email === form.email);
    
    if (!user) {
      setError("No account found with this email");
      return;
    }
    
    if (user.password !== form.password) {
      setError("Incorrect password");
      return;
    }

    // Success
    localStorage.setItem('cc_active_user', JSON.stringify(user));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={form.email}
        onChange={handleChange}
      />
      <PasswordField
        id="password"
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
          <input type="checkbox" className="rounded border-slate-300 accent-brand-accent" />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-brand-accent hover:underline">
          Forgot password?
        </a>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100"
        >
          {error}
        </motion.div>
      )}

      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        className="mt-1 w-full py-3 rounded-xl bg-brand-dark text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors duration-200 shadow-sm"
      >
        Sign In <ArrowRight size={16} />
      </motion.button>
    </form>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields");
      return;
    }
    
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem('cc_users') || '[]');
    if (users.find(u => u.email === form.email)) {
      setError("Email already exists. Please use a different email or sign in.");
      return;
    }

    // Success
    const newUser = { name: form.name, email: form.email, password: form.password };
    users.push(newUser);
    localStorage.setItem('cc_users', JSON.stringify(users));
    localStorage.setItem('cc_active_user', JSON.stringify(newUser));
    
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        id="name"
        label="Full name"
        placeholder="John Doe"
        icon={User}
        value={form.name}
        onChange={handleChange}
      />
      <InputField
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={form.email}
        onChange={handleChange}
      />
      <PasswordField
        id="password"
        label="Password"
        placeholder="Create a strong password"
        value={form.password}
        onChange={handleChange}
      />
      <PasswordField
        id="confirm"
        label="Confirm password"
        placeholder="Repeat your password"
        value={form.confirm}
        onChange={handleChange}
      />

      <p className="text-xs text-slate-500 leading-relaxed">
        By creating an account you agree to our{" "}
        <a href="#" className="text-brand-accent hover:underline font-medium">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="text-brand-accent hover:underline font-medium">Privacy Policy</a>.
      </p>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100"
        >
          {error}
        </motion.div>
      )}

      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        className="mt-1 w-full py-3 rounded-xl bg-brand-dark text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors duration-200 shadow-sm"
      >
        Create Account <ArrowRight size={16} />
      </motion.button>
    </form>
  );
}

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-[calc(100vh-7rem)] flex">
      {/* ── Left panel – decorative ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-brand-dark flex-col items-center justify-center p-16">
        {/* Animated blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-72 h-72 rounded-full bg-brand-accent/20 blur-3xl animate-blob" />
        <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 rounded-full bg-blue-300/10 blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl animate-blob [animation-delay:4s]" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <ShoppingBag size={14} className="text-brand-accent" />
              <span className="text-white/80 text-xs font-medium tracking-wide uppercase">Premium Fashion</span>
            </div>

            <h1 className="font-heading text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Your style,{" "}
              <span className="text-brand-accent">elevated.</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              Join thousands of fashion enthusiasts discovering curated collections from the world's top brands — all in one place.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "50K+", label: "Products" },
                { value: "200+", label: "Brands" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
                  <p className="font-heading font-bold text-2xl text-white">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <Logo />

          {/* Tab switcher */}
          <div className="relative flex bg-slate-100 rounded-xl p-1 mb-8">
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-y-1 rounded-lg bg-white shadow-sm"
              style={{ width: "calc(50% - 4px)", left: activeTab === "login" ? "4px" : "calc(50%)" }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 capitalize ${
                  activeTab === tab ? "text-brand-dark" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Animated form swap */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <h2 className="font-heading font-bold text-2xl text-brand-dark">
                  {activeTab === "login" ? "Welcome back 👋" : "Join CleanCuts ✨"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {activeTab === "login"
                    ? "Sign in to access your account and orders."
                    : "Create an account to start shopping today."}
                </p>
              </div>

              {activeTab === "login" ? <LoginForm /> : <SignupForm />}

              {/* Divider */}
              <div className="relative flex items-center my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="px-3 text-xs text-slate-400 font-medium">or continue with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Social logins */}
              <div className="grid grid-cols-2 gap-3">
                <SocialButton>
                  {/* Google icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </SocialButton>
                <SocialButton>
                  {/* GitHub icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </SocialButton>
              </div>

              <p className="text-center text-sm text-slate-500 mt-6">
                {activeTab === "login" ? (
                  <>Don't have an account?{" "}
                    <button onClick={() => setActiveTab("signup")} className="font-semibold text-brand-accent hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>Already have an account?{" "}
                    <button onClick={() => setActiveTab("login")} className="font-semibold text-brand-accent hover:underline">
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
