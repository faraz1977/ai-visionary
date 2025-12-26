
import React, { useState } from 'react';
import { User } from '../types';
import { SVGS } from '../constants';

interface PaymentPageProps {
  user: User;
  onComplete: () => void;
  onCancel: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ user, onComplete, onCancel }) => {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('USD');
  const [annualBilling, setAnnualBilling] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pkrRate = 278.50; 
  const baseUsd = 29.00;
  const finalUsd = annualBilling ? baseUsd * 0.84 : baseUsd;
  const usdPrice = finalUsd.toFixed(2);
  const pkrPrice = (finalUsd * pkrRate).toLocaleString('en-US', { minimumFractionDigits: 2 });
  
  const displayPrice = currency === 'USD' ? `$${usdPrice}` : `PKR ${pkrPrice}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate real bank processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center p-6 text-black">
         <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
               <SVGS.Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter">PAYMENT SUCCESS.</h1>
            <p className="text-black/50 font-medium">Welcome to Visionary Pro Studio. Your 1000 credits are ready.</p>
            <div className="w-12 h-1 bg-black/10 mx-auto rounded-full" />
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-black">
      {/* Summary Side */}
      <div className="flex-1 p-12 lg:p-24 flex flex-col border-r border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        
        <button onClick={onCancel} className="relative z-10 flex items-center gap-2 text-white/40 hover:text-white mb-12 group transition-colors font-bold uppercase tracking-widest text-xs">
          <SVGS.ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Cancel and return
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
             <SVGS.Logo />
             <span className="text-2xl font-black tracking-tighter">Visionary Studio</span>
          </div>

          <p className="text-white/40 mb-2 font-bold uppercase tracking-widest text-xs">Plan Selection</p>
          <h2 className="text-6xl font-black mb-12 tracking-tighter">
             {displayPrice} 
             <span className="text-xl font-normal text-white/20 ml-2">/mo</span>
          </h2>

          <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl mb-12 w-fit border border-white/5">
            <button 
              onClick={() => setCurrency('PKR')}
              className={`px-8 py-2.5 rounded-xl font-black text-xs transition-all ${currency === 'PKR' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              PKR
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-8 py-2.5 rounded-xl font-black text-xs transition-all ${currency === 'USD' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              USD
            </button>
          </div>

          <div className="space-y-6 mt-auto">
            <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <h4 className="font-bold text-lg">Pro Studio Yearly</h4>
                     <p className="text-xs text-white/30 mt-1">Full access to all AI image models</p>
                     <p className="text-xs text-white/30 uppercase tracking-widest mt-2 font-bold">1,000 CREDITS MONTHLY</p>
                  </div>
                  <p className="font-black text-xl">{displayPrice}</p>
               </div>
               
               <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div 
                      onClick={() => setAnnualBilling(!annualBilling)}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-500 ${annualBilling ? 'bg-white' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${annualBilling ? 'left-7 bg-black' : 'left-1 bg-white/40'}`} />
                    </div>
                    <span className={`text-xs font-bold transition-colors ${annualBilling ? 'text-white' : 'text-white/40'}`}>Annual billing (Save 16%)</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4 px-4">
               <div className="flex justify-between text-sm">
                  <span className="text-white/30">Processing Fee</span>
                  <span className="font-bold">None</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-white/30 flex items-center gap-1.5">GST / Sales Tax</span>
                  <span className="font-bold">Included</span>
               </div>
               <div className="flex justify-between text-2xl font-black border-t border-white/10 pt-6 mt-6">
                  <span className="tracking-tighter uppercase italic">Total Due Today</span>
                  <span>{displayPrice}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Side */}
      <div className="flex-1 bg-white text-black p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-lg mx-auto w-full relative z-10">
          <div className="mb-12 flex items-center justify-between">
             <h3 className="text-3xl font-black tracking-tighter uppercase italic">Secure Checkout</h3>
             <SVGS.Lock />
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Contact Information</label>
              <input 
                type="email" 
                required
                defaultValue={user.email} 
                className="w-full p-5 border-2 border-gray-100 rounded-2xl bg-gray-50/50 focus:outline-none focus:border-black transition-all font-medium"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Card Information</label>
              <div className="border-2 border-gray-100 rounded-2xl p-6 bg-gray-50/50 focus-within:border-black transition-all space-y-6">
                <div className="flex items-center justify-between">
                   <input 
                    type="text" 
                    required
                    className="w-full bg-transparent focus:outline-none text-xl tracking-widest font-mono" 
                    placeholder="0000 0000 0000 0000" 
                  />
                  <div className="flex gap-2">
                     <div className="w-8 h-5 bg-gray-200 rounded animate-pulse" />
                     <div className="w-8 h-5 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-8">
                   <div className="flex-1">
                      <p className="text-[10px] text-black/30 mb-1 uppercase tracking-widest">Expiry Date</p>
                      <input type="text" required className="w-full bg-transparent focus:outline-none font-bold" placeholder="MM / YY" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] text-black/30 mb-1 uppercase tracking-widest">CVV Code</p>
                      <input type="text" required className="w-full bg-transparent focus:outline-none font-bold" placeholder="123" />
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Cardholder Full Name</label>
               <input 
                type="text" 
                required
                className="w-full p-5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-black transition-all font-bold uppercase" 
                placeholder="AS WRITTEN ON CARD" 
              />
            </div>

            <div className="space-y-4 pt-4">
               <div className="flex items-start gap-4">
                  <div className="pt-1">
                     <input type="checkbox" required id="tos" className="w-4 h-4 accent-black" />
                  </div>
                  <label htmlFor="tos" className="text-xs text-black/50 leading-relaxed">
                     I agree to the <span className="underline font-bold text-black">Master Service Agreement</span> and authorize Visionary Studio to charge my card automatically each month.
                  </label>
               </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full py-6 rounded-2xl font-black text-2xl tracking-tighter transition-all shadow-2xl overflow-hidden relative ${
                isProcessing ? 'bg-gray-100 text-black/20 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900 active:scale-[0.98]'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-4">
                   <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                   VERIFYING...
                </div>
              ) : (
                `PAY ${displayPrice}`
              )}
            </button>
            
            <div className="flex items-center justify-center gap-8 pt-6 grayscale opacity-20">
               <div className="font-black text-sm">VISA</div>
               <div className="font-black text-sm">MASTERCARD</div>
               <div className="font-black text-sm">STRIPE</div>
               <div className="font-black text-sm">PAYPAL</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
