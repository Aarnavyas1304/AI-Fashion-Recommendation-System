import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft, Check, CreditCard, Truck, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { formatPrice } from '../utils/formatters';

export default function Checkout() {
  const { cart, grandTotal, clearCart } = useCart();
  const { createOrder, user } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState('address'); // address -> delivery -> payment -> review

  // Form states
  const [address, setAddress] = useState({
    name: user.name || "Aria Sharma",
    phone: "+91 98765 43210",
    street: "402 Vogue Heights, Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400020"
  });

  const [deliveryMethod, setDeliveryMethod] = useState('express'); // standard vs express
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking, cod

  const handlePlaceOrder = () => {
    const orderData = {
      items: cart.map(item => ({
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })),
      total: grandTotal + (deliveryMethod === 'express' ? 100 : 0),
      itemsCount: cart.length,
      shippingAddress: address,
      deliveryMethod,
      paymentMethod
    };

    const newOrder = createOrder(orderData);
    clearCart();
    navigate('/order-confirmation', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Checkout Header & Steps */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fashion-darkGray border border-fashion-gold/40 text-fashion-gold text-xs uppercase tracking-[0.3em] font-medium mb-3">
          <ShieldCheck className="w-4 h-4 text-fashion-gold" />
          <span>LUXURY CHECKOUT PORTAL</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-6">
          CHECKOUT
        </h1>

        {/* Steps Stepper */}
        <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-semibold uppercase tracking-wider text-fashion-gold border-b border-fashion-lightGray/10 pb-4">
          <span className={step === 'address' ? 'text-fashion-gold font-bold underline' : 'text-fashion-muted'}>
            1. Address
          </span>
          <span>→</span>
          <span className={step === 'delivery' ? 'text-fashion-gold font-bold underline' : 'text-fashion-muted'}>
            2. Delivery
          </span>
          <span>→</span>
          <span className={step === 'payment' ? 'text-fashion-gold font-bold underline' : 'text-fashion-muted'}>
            3. Payment
          </span>
          <span>→</span>
          <span className={step === 'review' ? 'text-fashion-gold font-bold underline' : 'text-fashion-muted'}>
            4. Review
          </span>
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-fashion-darkGray/60 border border-fashion-gold/30 rounded-2xl p-6 sm:p-8 shadow-editorial text-xs text-fashion-ivory space-y-6">
        
        {/* Step 1: Address */}
        {step === 'address' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-fashion-gold flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-fashion-gold mb-1">Full Name</label>
                <input
                  type="text"
                  value={address.name}
                  onChange={e => setAddress({ ...address, name: e.target.value })}
                  className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg p-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-fashion-gold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={address.phone}
                  onChange={e => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg p-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-fashion-gold mb-1">House / Street / Area</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={e => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg p-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-fashion-gold mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg p-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-fashion-gold mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={e => setAddress({ ...address, state: e.target.value })}
                  className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg p-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-fashion-gold mb-1">Pincode</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={e => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full bg-fashion-black border border-fashion-lightGray/20 rounded-lg p-3 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('delivery')}
              className="w-full bg-fashion-gold text-fashion-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              Continue to Delivery Options <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Delivery */}
        {step === 'delivery' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-fashion-gold flex items-center gap-2">
              <Truck className="w-5 h-5" /> Delivery Method
            </h3>

            <div className="space-y-3">
              <label
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliveryMethod === 'standard'
                    ? 'border-fashion-gold bg-fashion-gold/10 font-bold'
                    : 'border-fashion-lightGray/10 bg-fashion-black'
                }`}
              >
                <div>
                  <p className="font-bold text-fashion-ivory uppercase">Standard Delivery (3-5 Business Days)</p>
                  <p className="text-[11px] text-fashion-muted">Standard surface shipping with tracking updates</p>
                </div>
                <span className="text-fashion-gold font-bold">FREE</span>
              </label>

              <label
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliveryMethod === 'express'
                    ? 'border-fashion-gold bg-fashion-gold/10 font-bold'
                    : 'border-fashion-lightGray/10 bg-fashion-black'
                }`}
              >
                <div>
                  <p className="font-bold text-fashion-ivory uppercase">Express Air Delivery (24-48 Hours)</p>
                  <p className="text-[11px] text-fashion-muted">Priority courier handling with luxury gift boxing</p>
                </div>
                <span className="text-fashion-gold font-bold">+₹100</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('address')}
                className="px-4 py-3 rounded-lg border border-fashion-lightGray/20 text-fashion-muted hover:text-fashion-ivory"
              >
                Back
              </button>
              <button
                onClick={() => setStep('payment')}
                className="flex-1 bg-fashion-gold text-fashion-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 'payment' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-fashion-gold flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Select Payment Option
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'upi', label: 'UPI / GPay / PhonePe' },
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'netbanking', label: 'Net Banking' },
                { id: 'cod', label: 'Cash on Delivery' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`p-4 rounded-xl border text-center font-bold uppercase text-xs transition-all cursor-pointer ${
                    paymentMethod === opt.id
                      ? 'bg-fashion-burgundy text-fashion-ivory border-fashion-gold shadow-gold-glow'
                      : 'bg-fashion-black border-fashion-lightGray/10 text-fashion-muted'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="p-3 bg-fashion-black/80 rounded-lg border border-fashion-lightGray/10 text-[11px] text-fashion-muted">
              * Note: Prototype Checkout Mode — No real gateway charged.
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('delivery')}
                className="px-4 py-3 rounded-lg border border-fashion-lightGray/20 text-fashion-muted hover:text-fashion-ivory"
              >
                Back
              </button>
              <button
                onClick={() => setStep('review')}
                className="flex-1 bg-fashion-gold text-fashion-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                Review Order <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Review */}
        {step === 'review' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-fashion-gold">
              REVIEW YOUR ORDER
            </h3>

            <div className="p-4 bg-fashion-black rounded-lg border border-fashion-lightGray/10 space-y-2">
              <p className="font-bold text-fashion-ivory uppercase">Deliver To: {address.name}</p>
              <p className="text-fashion-muted">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
              <p className="text-fashion-gold">Payment Method: {paymentMethod.toUpperCase()}</p>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex justify-between items-center p-2 bg-fashion-black/50 rounded">
                  <span>{item.product.name} ({item.size}) x{item.quantity}</span>
                  <span className="font-bold text-fashion-gold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="text-xl font-serif font-bold text-right text-fashion-ivory pt-2 border-t border-fashion-lightGray/10">
              Total Payable: <span className="text-fashion-gold">{formatPrice(grandTotal + (deliveryMethod === 'express' ? 100 : 0))}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory py-4 rounded-xl text-xs font-bold uppercase tracking-[0.25em] border border-fashion-gold shadow-gold-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-fashion-gold" />
              PLACE ORDER & PAY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
