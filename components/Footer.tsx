
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl font-black tracking-tighter mb-2">VISIONARY AI</p>
          <p className="text-white/30 text-sm">© 2025 Visionary Labs Inc. All rights reserved.</p>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-white/40">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex -space-x-2">
             {[1,2,3].map(i => (
               <div key={i} className="w-6 h-6 rounded-full border border-black bg-white/10" />
             ))}
           </div>
           <span className="text-xs text-white/30 font-bold">12K+ ACTIVE PRO USERS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
