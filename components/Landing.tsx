
import React, { useState } from 'react';
import { SVGS, TOOLS } from '../constants';

const Landing: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How many credits do I get for free?", a: "Every new user gets 5 free credits to test our pro tools. No credit card required." },
    { q: "Can I cancel my Pro subscription at any time?", a: "Yes, you can cancel your subscription instantly from your dashboard settings." },
    { q: "What happens if I run out of credits?", a: "You can purchase one-time credit top-ups or upgrade your plan for a higher monthly allowance." },
    { q: "Do you offer bulk processing for businesses?", a: "Yes! Our Enterprise plan includes API access and batch processing tools." }
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest uppercase mb-8 text-white/70">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Gemini 3.0 Pro Image Engine Active
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tight mb-8 leading-[0.85]">
            CREATIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10 italic">POWER.</span>
          </h1>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Professional AI image tools designed for the modern creator. Strip backgrounds, clear watermarks, and upscale with unmatched precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onGetStarted}
              className="group relative px-10 py-5 bg-white text-black text-lg font-black rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 justify-center shadow-2xl shadow-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              START CREATING NOW <SVGS.ChevronRight />
            </button>
            <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-full border border-white/10">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-[#1a1a1a]" />)}
               </div>
               <span className="text-xs font-bold text-white/40">10K+ ARTISTS JOINED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="px-6 py-32 max-w-7xl mx-auto border-y border-white/5">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
             <h2 className="text-5xl font-black mb-8 leading-tight">THE ONLY STUDIO <br/> YOU'LL EVER NEED.</h2>
             <div className="space-y-12">
                {TOOLS.map((tool) => (
                  <div key={tool.id} className="flex gap-6 group">
                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                       {tool.icon}
                     </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed max-w-md">{tool.description}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[40px] overflow-hidden p-8 flex items-center justify-center shadow-2xl">
                <div className="w-full aspect-square border border-white/5 rounded-3xl skeleton" />
                <div className="absolute bottom-12 left-12 right-12 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 animate-pulse" />
                      <div className="flex-grow space-y-2">
                         <div className="h-2 w-1/2 bg-white/20 rounded" />
                         <div className="h-2 w-1/3 bg-white/10 rounded" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                         <SVGS.Check />
                      </div>
                   </div>
                </div>
             </div>
             {/* Floating Elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-32 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-black mb-20 tracking-tighter italic">"THE BEST IN CLASS TOOLS"</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The quality upscaler is genuinely magic. I saved 10 years of low-res photos in one afternoon.", author: "Marcus T., Photographer" },
              { text: "Background removal is finally pixel-perfect. Better than Photoshop's native tool for my workflow.", author: "Elena R., Designer" },
              { text: "B&W theme is gorgeous, and the tools are incredibly fast. A must-have subscription.", author: "Liam K., Agency Lead" }
            ].map((t, i) => (
              <div key={i} className="p-10 bg-black border border-white/10 rounded-[32px] flex flex-col">
                 <div className="flex gap-1 mb-8 text-white/20">
                   {[1,2,3,4,5].map(j => <span key={j}>★</span>)}
                 </div>
                 <p className="text-lg text-white/70 mb-8 flex-grow leading-relaxed">"{t.text}"</p>
                 <p className="text-xs font-black uppercase tracking-widest text-white/30">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-32 max-w-4xl mx-auto">
        <h2 className="text-4xl font-black mb-12 text-center">COMMON QUESTIONS</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-bold">{f.q}</span>
                <span className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>
                   <SVGS.Plus />
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-40 p-6 pt-0 text-white/50 border-t border-white/5' : 'max-h-0'}`}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-32 text-center">
         <div className="max-w-4xl mx-auto p-16 rounded-[48px] bg-white text-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">JOIN THE STUDIO.</h2>
            <p className="text-black/60 text-lg mb-12 max-w-lg mx-auto">Start with 5 free credits today. Upgrade later for unlimited creativity.</p>
            <button 
              onClick={onGetStarted}
              className="px-12 py-6 bg-black text-white text-xl font-black rounded-full hover:scale-105 active:scale-95 transition-all"
            >
              CREATE AN ACCOUNT
            </button>
         </div>
      </section>
    </div>
  );
};

export default Landing;
