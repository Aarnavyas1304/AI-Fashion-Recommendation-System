import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword || !password) {
      login(email || "new.user@fashion.ai", password);
      // Redirect to AI Stylist page as requested in prompt!
      navigate('/ai-stylist');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-fashion-darkGray/60 border border-fashion-gold/30 rounded-2xl p-8 shadow-editorial">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-fashion-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-fashion-gold font-bold">JOIN THE CLUB</span>
          </div>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-wider text-fashion-ivory">
            CREATE YOUR STYLE PROFILE
          </h2>
          <p className="text-xs text-fashion-muted mt-1">Unlock AI recommendation algorithms & customized edits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-fashion-ivory">
          <div>
            <label className="block uppercase font-bold tracking-wider text-fashion-gold mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-fashion-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. Aria Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold tracking-wider text-fashion-gold mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-fashion-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="aria.sharma@fashion.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold tracking-wider text-fashion-gold mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-fashion-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold tracking-wider text-fashion-gold mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-fashion-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] border border-fashion-gold shadow-gold-glow flex items-center justify-center gap-2 transition-all cursor-pointer mt-6"
          >
            CREATE ACCOUNT
            <ArrowRight className="w-4 h-4 text-fashion-gold" />
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-fashion-muted">
          Already registered?{' '}
          <Link to="/login" className="text-fashion-gold font-bold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
