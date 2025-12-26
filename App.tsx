
import React, { useState, useEffect } from 'react';
import { AppView, User, ToolType } from './types';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ToolPage from './components/ToolPage';
import PaymentPage from './components/PaymentPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const handleLogin = () => {
    // Simulated Google Login
    const mockUser: User = {
      name: 'Artist Faraz',
      email: 'artistfaraz.997@gmail.com',
      plan: 'FREE',
      credits: 5
    };
    setUser(mockUser);
    setView(AppView.DASHBOARD);
  };

  const navigateToTool = (tool: ToolType) => {
    setSelectedTool(tool);
    setView(AppView.TOOL_VIEW);
  };

  const handleBack = () => {
    if (view === AppView.TOOL_VIEW) {
      setView(AppView.DASHBOARD);
    } else if (view === AppView.PAYMENT) {
      setView(AppView.DASHBOARD);
    } else {
      setView(AppView.LANDING);
    }
  };

  const upgradeToPro = () => {
    setView(AppView.PAYMENT);
  };

  const completePayment = () => {
    if (user) {
      setUser({ ...user, plan: 'PRO', credits: 1000 });
      setView(AppView.DASHBOARD);
      alert("Successfully upgraded to PRO!");
    }
  };

  const useCredits = (amount: number) => {
    if (user && user.credits >= amount) {
      setUser({ ...user, credits: user.credits - amount });
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar 
        view={view} 
        user={user} 
        onBack={handleBack} 
        onLogin={handleLogin}
        onUpgrade={() => setShowPricing(true)}
      />
      
      <main className="flex-grow">
        {view === AppView.LANDING && (
          <Landing onGetStarted={handleLogin} />
        )}
        
        {view === AppView.DASHBOARD && user && (
          <Dashboard 
            user={user} 
            onSelectTool={navigateToTool} 
            onUpgrade={() => setShowPricing(true)}
          />
        )}
        
        {view === AppView.TOOL_VIEW && user && selectedTool && (
          <ToolPage 
            user={user} 
            toolType={selectedTool} 
            onUseCredits={useCredits}
            onInsufficientCredits={() => setShowPricing(true)}
          />
        )}

        {view === AppView.PAYMENT && user && (
          <PaymentPage 
            user={user} 
            onComplete={completePayment} 
            onCancel={handleBack} 
          />
        )}
      </main>

      {showPricing && (
        <PricingModal 
          onClose={() => setShowPricing(false)} 
          onSelectPro={() => {
            setShowPricing(false);
            upgradeToPro();
          }}
        />
      )}

      <Footer />
    </div>
  );
};

// Internal Sub-component for clean organization
const PricingModal: React.FC<{ onClose: () => void; onSelectPro: () => void }> = ({ onClose, onSelectPro }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Choose your plan</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-white/10 rounded-xl bg-white/5 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <div className="text-3xl font-bold mb-4">$0 <span className="text-sm font-normal text-white/50">/month</span></div>
            <ul className="space-y-3 mb-8 text-white/70">
              <li className="flex items-center gap-2">✓ 5 monthly credits</li>
              <li className="flex items-center gap-2">✓ Standard speed</li>
              <li className="flex items-center gap-2">✓ Community support</li>
            </ul>
            <button disabled className="mt-auto py-3 px-6 bg-white/10 rounded-lg text-white/50 cursor-not-allowed">Current Plan</button>
          </div>

          <div className="p-6 border border-white/20 rounded-xl bg-white text-black flex flex-col scale-105 shadow-2xl">
            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full w-fit mb-4 uppercase">Popular</div>
            <h3 className="text-xl font-semibold mb-2">Pro Studio</h3>
            <div className="text-3xl font-bold mb-4">$29 <span className="text-sm font-normal text-black/50">/month</span></div>
            <ul className="space-y-3 mb-8 text-black/70">
              <li className="flex items-center gap-2">✓ 1000 monthly credits</li>
              <li className="flex items-center gap-2">✓ Ultra-fast processing</li>
              <li className="flex items-center gap-2">✓ Priority 4K rendering</li>
              <li className="flex items-center gap-2">✓ Commercial license</li>
            </ul>
            <button onClick={onSelectPro} className="mt-auto py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Upgrade to Pro</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
