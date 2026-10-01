import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck, Check, ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { formatPrice } from '../utils/formatters';

export default function Orders() {
  const { orders } = useUser();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ["All", "Ordered", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/profile" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#966F33] hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Profile
      </Link>

      <div className="border-b border-[#E5E0D8] pb-4 mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-zinc-900">
          My Orders
        </h1>
      </div>

      {/* Filter Tabs matching reference image */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === t
                ? 'bg-[#0B0B0B] text-white font-bold'
                : 'bg-white text-zinc-600 border border-[#E5E0D8] hover:border-zinc-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Order Cards List matching reference image */}
      <div className="space-y-6">
        {orders.map((order) => {
          const steps = ["Ordered", "Packed", "Shipped", "Delivered"];
          const currentStepIdx = order.step || 3;

          return (
            <div key={order.id} className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-card space-y-6 text-xs text-zinc-800">
              
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-4 gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-zinc-900">Order {order.id}</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Placed on {order.date}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">Items & Total</span>
                  <span className="font-bold text-zinc-900">{order.itemsCount || 2} Items • <span className="text-base text-zinc-900 font-extrabold">{formatPrice(order.total)}</span></span>
                </div>
              </div>

              {/* Progress Bar matching reference image */}
              <div className="py-2">
                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {steps.map((st, idx) => {
                    const isCompleted = idx + 1 <= currentStepIdx;
                    return (
                      <div key={st} className="flex flex-col items-center relative z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border transition-all mb-1 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                        }`}>
                          {isCompleted ? <Check className="w-3.5 h-3.5" /> : (idx + 1)}
                        </div>
                        <span className={`text-[11px] font-semibold ${isCompleted ? 'text-zinc-900' : 'text-zinc-400'}`}>
                          {st}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Purchased Items List */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded-md" />
                      <div>
                        <p className="font-bold text-zinc-900">{item.name}</p>
                        <p className="text-[10px] text-zinc-500">{item.brand} • Size: {item.size} • Color: {item.color}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-zinc-900">₹{item.price * (item.quantity || 1)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
