
import React from 'react';
import { User, ToolType } from '../types';
import { TOOLS, SVGS } from '../constants';

interface DashboardProps {
  user: User;
  onSelectTool: (tool: ToolType) => void;
  onUpgrade: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectTool, onUpgrade }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <span className="px-2 py-0.5 bg-white/10 text-[10px] font-black tracking-widest uppercase rounded border border-white/10">
               {user.plan} ACCOUNT
             </span>
             {user.plan === 'PRO' && <span className="text-yellow-400">★</span>}
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Welcome, {user.name.split(' ')[0]}.</h1>
          <p className="text-white/40 mt-2">What will you create today?</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#111] border border-white/5 p-6 rounded-[24px] flex items-center gap-8 shadow-2xl">
            <div className="text-center">
              <p className="text-[10px] font-bold text-white/30 mb-1 uppercase tracking-widest">Available Credits</p>
              <p className="text-3xl font-black flex items-center gap-2">
                 <SVGS.Credit /> {user.credits}
              </p>
            </div>
            <div className="w-[1px] h-10 bg-white/5" />
            <button 
              onClick={onUpgrade}
              className="px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-gray-100 transition-all active:scale-95"
            >
              {user.plan === 'FREE' ? 'UPGRADE TO PRO' : 'TOP UP'}
            </button>
          </div>
        </div>
      </header>

      {/* Tool Grid */}
      <h2 className="text-xs font-black tracking-[0.2em] text-white/20 mb-6 uppercase">AI TOOLSET</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {TOOLS.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => onSelectTool(tool.id)}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 cursor-pointer hover:border-white/20 transition-all flex flex-col h-full hover:-translate-y-1"
          >
            <div className="mb-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all shadow-xl group-hover:shadow-white/5">
              {tool.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
            <p className="text-sm text-white/30 mb-8 flex-grow leading-relaxed">{tool.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <span className="text-xs font-black text-white/20 flex items-center gap-1.5 uppercase tracking-widest">
                <SVGS.Credit /> {tool.creditsRequired} CREDITS
              </span>
              <div className="p-2 rounded-full bg-white/5 text-white/0 group-hover:text-white transition-all">
                <SVGS.ChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Usage Stats */}
         <div className="lg:col-span-2 p-10 border border-white/5 rounded-[40px] bg-gradient-to-br from-white/[0.02] to-transparent">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
               RECENT USAGE
               <span className="text-xs font-normal text-white/20 ml-auto">Last 30 Days</span>
            </h2>
            <div className="space-y-6">
              {[
                { tool: "Background Stripper", date: "Today, 2:45 PM", status: "Completed", icon: <SVGS.Background /> },
                { tool: "Quality Upscaler", date: "Yesterday, 11:12 AM", status: "Completed", icon: <SVGS.Upscale /> },
                { tool: "Color Enhancer", date: "2 days ago", status: "Failed (Refunding...)", icon: <SVGS.Enhance /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5 transition-all group">
                   <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                      {item.icon}
                   </div>
                   <div className="flex-grow">
                      <p className="font-bold">{item.tool}</p>
                      <p className="text-xs text-white/30">{item.date}</p>
                   </div>
                   <div className="text-right">
                      <p className={`text-xs font-bold uppercase tracking-widest ${item.status.includes('Failed') ? 'text-red-500' : 'text-white/40'}`}>
                        {item.status}
                      </p>
                   </div>
                </div>
              ))}
            </div>
         </div>

         {/* Promo Box */}
         <div className="p-10 border border-white/5 rounded-[40px] bg-white text-black flex flex-col">
            <h3 className="text-2xl font-black mb-4">REFER A FRIEND</h3>
            <p className="text-sm font-medium text-black/60 mb-8 leading-relaxed">Give 10 credits, get 20 credits. Growing the community pays off for everyone.</p>
            <div className="mt-auto space-y-4">
               <div className="p-4 bg-black/5 rounded-xl border border-black/5 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold">VSNY-H29K</span>
                  <button className="text-xs font-black underline">COPY</button>
               </div>
               <button className="w-full py-4 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all">SHARE LINK</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
