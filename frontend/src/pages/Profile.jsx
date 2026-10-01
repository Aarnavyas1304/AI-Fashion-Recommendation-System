import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Sparkles, PackageCheck, Heart, SlidersHorizontal, MapPin, History, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { user, logout, aiPreferences, orders, recentlyViewed } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav matching reference image bottom right 3 */}
        <div className="lg:col-span-3 bg-white border border-[#E5E0D8] rounded-2xl p-4 shadow-card space-y-1 self-start">
          {[
            { id: 'profile', label: 'Profile Info', icon: User },
            { id: 'orders', label: 'My Orders', icon: PackageCheck },
            { id: 'preferences', label: 'AI Preferences', icon: SlidersHorizontal },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'recently', label: 'Recently Viewed', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0B0B0B] text-white font-bold shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#966F33]' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold text-[#7A1020] hover:bg-red-50 transition-colors pt-4 border-t border-zinc-100 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#7A1020]" />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content Area matching reference image */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Profile Info Tab matching image */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
                <h2 className="font-serif text-2xl font-bold text-zinc-900">Profile Information</h2>
                <button className="text-xs font-bold text-[#966F33] border border-[#966F33] px-3 py-1 rounded-lg">Edit</button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 text-white font-bold font-serif text-xl flex items-center justify-center border-2 border-[#966F33]">
                  AV
                </div>
                <div>
                  <h3 className="font-bold text-lg text-zinc-900">Aarna Vyas</h3>
                  <p className="text-xs text-zinc-500">aarna.vyas@example.com</p>
                  <p className="text-xs text-zinc-500">+91 98765 43210</p>
                </div>
              </div>

              {/* AI Preferences Box matching reference image */}
              <div className="bg-zinc-50 border border-[#E5E0D8] rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#966F33]" /> AI Preferences
                  </h4>
                  <Link to="/ai-stylist" className="text-xs font-bold text-[#966F33] hover:underline">Update</Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-2">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Style</span>
                    <span className="font-bold text-zinc-800">Casual</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Occasion</span>
                    <span className="font-bold text-zinc-800">College</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Colors</span>
                    <span className="font-bold text-zinc-800">Black, Blue, White</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Budget</span>
                    <span className="font-bold text-zinc-800">₹500 - ₹3,000</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Season</span>
                    <span className="font-bold text-zinc-800">Summer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-card">
              <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-4">My Orders ({orders.length})</h2>
              <Link to="/orders" className="text-xs font-bold text-[#966F33] underline uppercase">View Orders Timeline</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
