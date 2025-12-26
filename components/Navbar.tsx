
import React from 'react';
import { AppView, User } from '../types';
import { SVGS } from '../constants';

interface NavbarProps {
  view: AppView;
  user: User | null;
  onBack: () => void;
  onLogin: () => void;
  onUpgrade: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ view, user, onBack, onLogin, onUpgrade }) => {
  return (
    <nav className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {view !== AppView.LANDING && (
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-all group">
              <SVGS.ArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
            <SVGS.Logo />
            <span className="text-xl font-black tracking-tighter group-hover:text-white/80 transition-colors">VISIONARY</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                <SVGS.Credit />
                <span className="text-xs font-black tracking-widest">{user.credits} CREDITS</span>
                <button 
                   onClick={onUpgrade}
                   className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
                >
                  <SVGS.Plus />
                </button>
              </div>
              
              <div className="relative group">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-gradient-to-br from-[#222] to-black overflow-hidden flex items-center justify-center cursor-pointer group-hover:border-white/30 transition-all">
                  <span className="text-xs font-black text-white/50">{user.name.charAt(0)}</span>
                </div>
                <div className="absolute top-full right-0 mt-4 w-48 p-2 bg-[#111] border border-white/10 rounded-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-2xl">
                   <div className="p-3 text-xs font-bold text-white/40 border-b border-white/5 mb-1">
                      {user.email}
                   </div>
                   <button onClick={onUpgrade} className="w-full p-3 text-left text-xs font-black hover:bg-white/5 rounded-xl transition-colors">
                      BILLING SETTINGS
                   </button>
                   <button className="w-full p-3 text-left text-xs font-black text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                      SIGN OUT
                   </button>
                </div>
              </div>
            </>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-black text-xs tracking-widest rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
              <SVGS.Google />
              SIGN IN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
