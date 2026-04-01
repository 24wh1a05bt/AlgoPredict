import React, { useState, useEffect } from 'react';

// Mock Data for the Orderbook - In a real app, this comes from Algorand Boxes
const MOCK_ORDERBOOK = {
  asks: [{ price: 0.68, size: 1240 }, { price: 0.67, size: 850 }, { price: 0.66, size: 2100 }],
  bids: [{ price: 0.64, size: 900 }, { price: 0.63, size: 1500 }, { price: 0.62, size: 450 }]
};

const App = () => {
  const [yesProb, setYesProb] = useState(65);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* NAVIGATION BAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-[#30363d] bg-[#161b22]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">A</div>
          <span className="text-xl font-bold tracking-tight text-white">AlgoPredict <span className="text-blue-500 text-sm font-mono">DEX</span></span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4 text-sm font-medium text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">Markets</span>
            <span className="hover:text-white cursor-pointer transition-colors">Activity</span>
            <span className="hover:text-white cursor-pointer transition-colors">Learn</span>
          </div>
          <button 
            onClick={() => setIsConnected(!isConnected)}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-lg ${
              isConnected ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {isConnected ? 'Address: 0x...82a' : 'Connect Pera Wallet'}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: MARKET DETAILS & TRADING */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Market Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-black px-2 py-1 rounded border border-emerald-500/20 tracking-widest">
                Active
              </span>
              <span className="text-gray-500 text-xs font-mono">Oracle Feed: Multi-Source Consensus</span>
              <span className="text-gray-500 text-xs font-mono ml-auto">Expires: Dec 31, 2026</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-8 leading-tight">
              Will Algorand’s Total Value Locked (TVL) surpass $500M before 2027?
            </h2>

            {/* Probability Visualizer */}
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Chance of Yes</span>
                  <span className="text-4xl font-black text-emerald-500">{yesProb}%</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Chance of No</span>
                  <span className="text-4xl font-black text-rose-500">{100 - yesProb}%</span>
                </div>
              </div>
              
              <div className="relative h-5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
                <div 
                  className="absolute h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out" 
                  style={{ width: `${yesProb}%` }}
                ></div>
                <div 
                  className="absolute h-full bg-gradient-to-l from-rose-600 to-rose-400 transition-all duration-1000 ease-out right-0" 
                  style={{ width: `${100 - yesProb}%` }}
                ></div>
              </div>
            </div>

            {/* Trading Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="group relative bg-emerald-500/5 hover:bg-emerald-500 border border-emerald-500/30 py-5 rounded-2xl transition-all overflow-hidden">
                <span className="relative z-10 font-black text-emerald-500 group-hover:text-white text-lg">BET YES</span>
                <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
              <button className="group relative bg-rose-500/5 hover:bg-rose-500 border border-rose-500/30 py-5 rounded-2xl transition-all overflow-hidden">
                <span className="relative z-10 font-black text-rose-500 group-hover:text-white text-lg">BET NO</span>
              </button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 h-64 flex flex-col items-center justify-center text-gray-600">
            <div className="w-12 h-12 mb-4 border-b-2 border-l-2 border-gray-700 relative">
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/10 animate-pulse"></div>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest">Price History Chart Loading...</p>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDERBOOK & ACTIVITY */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-tighter text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Live Orderbook
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">BOX_STORAGE: ACTIVE</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-500 font-black mb-2 uppercase">
                <span>Price</span>
                <span>Size (ALGO)</span>
              </div>
              
              {/* ASKS (Sells) */}
              {MOCK_ORDERBOOK.asks.map((order, i) => (
                <div key={i} className="flex justify-between py-1 font-mono text-sm group cursor-pointer hover:bg-rose-500/5 px-2 rounded">
                  <span className="text-rose-400 font-bold">{order.price.toFixed(2)}</span>
                  <span className="text-gray-400 group-hover:text-white transition-colors">{order.size}</span>
                </div>
              ))}

              {/* SPREAD */}
              <div className="py-4 my-2 border-y border-[#30363d] flex justify-between items-center px-2 bg-[#0d1117]/50">
                <span className="text-xl font-black text-white">0.65</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mid Price</span>
              </div>

              {/* BIDS (Buys) */}
              {MOCK_ORDERBOOK.bids.map((order, i) => (
                <div key={i} className="flex justify-between py-1 font-mono text-sm group cursor-pointer hover:bg-emerald-500/5 px-2 rounded">
                  <span className="text-emerald-400 font-bold">{order.price.toFixed(2)}</span>
                  <span className="text-gray-400 group-hover:text-white transition-colors">{order.size}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#30363d]">
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                * All trades are settled via Algorand Smart Contracts. Ensure your Pera Wallet has sufficient ALGO for box storage fees.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
