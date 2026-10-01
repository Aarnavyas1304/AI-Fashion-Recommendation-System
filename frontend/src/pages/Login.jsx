import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Login() {
  const [email, setEmail] = useState('aria.sharma@fashion.ai');
  const [password, setPassword] = useState('••••••••');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/profile');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-fashion-darkGray/60 border border-fashion-gold/30 rounded-2xl p-8 shadow-editorial">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-fashion-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-fashion-gold font-bold">AI FASHION INSIDER</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-wider text-fashion-ivory">
            WELCOME BACK
          </h2>
          <p className="text-xs text-fashion-muted mt-1">Sign in to access your saved style DNA & recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-fashion-ivory">
          <div>
            <label className="block uppercase font-bold tracking-wider text-fashion-gold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-fashion-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email..."
                className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="uppercase font-bold tracking-wider text-fashion-gold">Password</label>
              <a href="#forgot" className="text-fashion-muted hover:text-fashion-gold transition-colors text-[11px]">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-fashion-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] border border-fashion-gold shadow-gold-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            LOGIN
            <ArrowRight className="w-4 h-4 text-fashion-gold" />
          </button>

          <div className="relative my-6 flex items-center justify-center">
            <div className="border-t border-fashion-lightGray/10 w-full" />
            <span className="bg-fashion-darkGray px-3 text-[10px] uppercase tracking-widest text-fashion-muted absolute">
              OR CONTINUE WITH
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              login('google.user@fashion.ai', 'googlepass');
              navigate('/profile');
            }}
            className="w-full bg-fashion-black hover:bg-fashion-darkGray text-fashion-ivory py-3 rounded-lg text-xs font-semibold uppercase tracking-wider border border-fashion-lightGray/20 hover:border-fashion-gold/40 flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
            </svg>
            Google Prototype Login
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-fashion-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-fashion-gold font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
