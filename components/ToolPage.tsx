
import React, { useState, useRef } from 'react';
import { User, ToolType } from '../types';
import { TOOLS, SVGS } from '../constants';
import { processImageWithAI } from '../services/gemini';

interface ToolPageProps {
  user: User;
  toolType: ToolType;
  onUseCredits: (amount: number) => boolean;
  onInsufficientCredits: () => void;
}

const ToolPage: React.FC<ToolPageProps> = ({ user, toolType, onUseCredits, onInsufficientCredits }) => {
  const tool = TOOLS.find(t => t.id === toolType)!;
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image) return;
    
    if (user.credits < tool.creditsRequired) {
      onInsufficientCredits();
      return;
    }

    setIsProcessing(true);
    try {
      const editedImage = await processImageWithAI(image, toolType);
      setResult(editedImage);
      onUseCredits(tool.creditsRequired);
    } catch (err) {
      alert("Processing failed. Please try a smaller or clearer image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = `visionary_ai_${toolType.toLowerCase()}.png`;
      link.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12 flex items-start gap-6">
        <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-white/10">
          {tool.icon}
        </div>
        <div>
          <h1 className="text-4xl font-black mb-2">{tool.title}</h1>
          <p className="text-white/50">{tool.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <h2 className="text-xs font-black tracking-widest text-white/30 uppercase">Original Asset</h2>
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center group hover:border-white/30 hover:bg-white/[0.02] cursor-pointer transition-all"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <SVGS.ChevronRight className="-rotate-90" />
              </div>
              <p className="text-white/60 font-bold">Drag and drop or click to upload</p>
              <p className="text-white/20 text-sm mt-2">PNG, JPG up to 10MB</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          ) : (
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
              <img src={image} className="w-full h-full object-contain" alt="Original" />
              <button 
                onClick={() => { setImage(null); setResult(null); }}
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur rounded-full hover:bg-red-500/80 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          )}

          <button
            disabled={!image || isProcessing}
            onClick={handleProcess}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
              !image || isProcessing 
                ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-gray-100 shadow-xl shadow-white/5'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                 PROCESSING...
              </div>
            ) : (
              <>PROCESS FOR {tool.creditsRequired} CREDITS</>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <h2 className="text-xs font-black tracking-widest text-white/30 uppercase">AI Generated Result</h2>
          <div className="aspect-square border border-white/10 rounded-3xl bg-[#0a0a0a] flex items-center justify-center overflow-hidden relative">
            {isProcessing ? (
              <div className="w-full h-full p-8 space-y-4">
                <div className="skeleton w-full h-2/3 rounded-2xl"></div>
                <div className="skeleton w-3/4 h-6 rounded"></div>
                <div className="skeleton w-1/2 h-4 rounded"></div>
              </div>
            ) : result ? (
              <>
                <img src={result} className="w-full h-full object-contain" alt="Result" />
                <button 
                  onClick={downloadResult}
                  className="absolute bottom-6 right-6 p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90"
                >
                  <SVGS.Download />
                </button>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                   <SVGS.Logo />
                </div>
                <p className="text-white/20 font-bold">Your processed result will appear here</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 border border-white/5 bg-white/[0.02] rounded-xl">
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Format</p>
               <p className="text-sm font-bold">PNG (Lossless)</p>
             </div>
             <div className="p-4 border border-white/5 bg-white/[0.02] rounded-xl">
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Scale</p>
               <p className="text-sm font-bold">Auto-Optimized</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
