import React, { useState } from 'react';
import { Activity, User, LogOut, Upload, X } from 'lucide-react';

// ==========================================
// 1. CONFIGURATION SECTION
// ==========================================

const DROPDOWN_OPTIONS = {
  class: ["Class Alpha", "Class Beta", "Class Gamma", "Class Delta"],
  name: ["INS Vikrant", "INS Vikramaditya", "INS Arihant", "INS Kalvari"],
  year: ["2023", "2024", "2025", "2026"],
  mtu: ["MTU-100", "MTU-200", "MTU-500", "MTU-X"]
};

const MODULE_CONFIG = {
  1: { 
    inputs: ['class', 'name', 'year'], 
    results: { graph: '/assets/graph1.png', table: '/assets/table1.png' }
  },
  2: { 
    inputs: ['class', 'name', 'year', 'mtu'], 
    results: { graph: '/assets/graph2.png', table: '/assets/table2.png' }
  },
  3: { 
    inputs: ['class', 'name'], 
    results: { graph: '/assets/graph3.png', table: '/assets/table3.png' }
  },
  4: { 
    inputs: ['class', 'year'], 
    results: { graph: '/assets/graph4.png', table: '/assets/table4.png' }
  },
  5: { 
    inputs: ['mtu', 'year'], 
    results: { graph: '/assets/graph5.png', table: '/assets/table5.png' }
  },
  6: { 
    inputs: ['class', 'name', 'mtu'], 
    results: { graph: '/assets/graph6.png', table: '/assets/table6.png' }
  }
};

// ==========================================
// END CONFIGURATION
// ==========================================

const DeepSeaApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);

  const modules = [
    { id: 1, name: 'Tonal Analysis', image: '/assets/stocks-icon-115309575370e0avfgu4e.png' },
    { id: 2, name: 'Underwater Signature', image: '/assets/stocks-icon-115309575370e0avfgu4e.png' },
    { id: 3, name: 'Silent Regimes', image: '/assets/stocks-icon-115309575370e0avfgu4e.png' },
    { id: 4, name: 'Trend Analysis', image: '/assets/stocks-icon-115309575370e0avfgu4e.png' },
    { id: 5, name: 'MTU Analysis', image: '/assets/stocks-icon-115309575370e0avfgu4e.png' },
    { id: 6, name: 'RNL', image: '/assets/stocks-icon-115309575370e0avfgu4e.png' }
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setUsername('');
    setPassword('');
    setShowUserDropdown(false);
    setTabs([]);
    setActiveTabId(null);
  };

  const handleModuleClick = (module) => {
    const newTabId = Date.now();
    const newTab = {
      id: newTabId,
      moduleId: module.id,
      name: module.name,
      formData: { class: '', name: '', year: '', mtu: '' },
      hasRun: false
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
    setCurrentView('analysis');
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    
    if (newTabs.length === 0) {
      setCurrentView('dashboard');
      setActiveTabId(null);
    } else if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      setCurrentView('dashboard');
    }
  };

  const updateTabData = (tabId, updates) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId ? { ...tab, ...updates } : tab
    ));
  };

  const handleRun = () => {
    updateTabData(activeTabId, { hasRun: true });
  };

  const renderDropdowns = (tab) => {
    const config = MODULE_CONFIG[tab.moduleId];
    if (!config) return null;

    return config.inputs.map((fieldKey) => (
      <div key={fieldKey} className="flex-1 min-w-[140px]">
        {/* Label for the dropdown */}
        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
          {fieldKey}
        </label>
        <select
          value={tab.formData[fieldKey]}
          onChange={(e) => {
            const newFormData = { ...tab.formData, [fieldKey]: e.target.value };
            updateTabData(tab.id, { formData: newFormData, hasRun: false });
          }}
          // Dark input styling: Lighter version of background, white text, subtle border
          className="w-full px-4 py-2 bg-[#173847] border border-[#2a4e60] rounded text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 appearance-none"
        >
          <option value="" className="text-gray-400">Select {fieldKey}</option>
          {DROPDOWN_OPTIONS[fieldKey].map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    ));
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  // Background Component - Updated: Just 40% opacity on all pages (Video is Visible)
  const RealisticBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* bg-[#082029]/40 = Uses your specific dark blue, but only at 40% opacity.
         This tints the video blue without hiding it. 
      */}
      <div className="absolute inset-0 z-10 backdrop-blur-[1px] bg-[#082029]/40" />
      
      <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
        <source src="/assets/underwater.mp4" type="video/mp4" />
        <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" />
      </video>
    </div>
  );

  const AppLogo = ({ className = "" }) => (
    <button onClick={handleLogoClick} className={`flex items-center justify-center transition-transform hover:scale-105 ${className}`}>
      <img src="/assets/logo.png" alt="Logo" className="h-16 w-auto object-contain drop-shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=LOGO"; }} />
    </button>
  );

  // --- VIEWS ---

  // 1. LOGIN VIEW
  if (currentView === 'login') {
    return (
      <div className="min-h-screen w-full relative overflow-hidden font-sans">
        <RealisticBackground />
        <div className="absolute top-8 left-8 z-20"><AppLogo /></div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <h1 className="text-4xl font-bold text-white mb-12 drop-shadow-lg tracking-tight">Application U</h1>
            <div className="space-y-5">
              <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-5 py-4 bg-white border-0 rounded-lg text-gray-800 shadow-lg focus:outline-none text-lg" />
              <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 bg-white border-0 rounded-lg text-gray-800 shadow-lg focus:outline-none text-lg" />
              <button onClick={handleLogin} className="w-full px-5 py-4 bg-[#082029] hover:bg-[#123441] text-white font-bold rounded-lg shadow-xl text-lg mt-4 transition-all border border-white/20">SIGN IN</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen w-full relative overflow-hidden font-sans">
        <RealisticBackground />
        
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Nav: Semi-transparent version of #082029 */}
          <nav className="bg-[#0F2B38]/80 backdrop-blur-md border-b border-[#1e4a5b]/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="h-12 w-auto flex items-center"><AppLogo className="h-12" /></div>
                <h1 className="text-xl font-bold text-white">Application U</h1>
              </div>
              <div className="relative">
                <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="w-10 h-10 bg-[#173847]/80 rounded border border-[#2a4e60] flex items-center justify-center hover:bg-[#1f4a5e] transition-colors">
                  <User className="text-gray-300" size={20} />
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0F2B38] rounded-lg shadow-xl border border-[#2a4e60] overflow-hidden z-50">
                    <button onClick={handleLogout} className="w-full px-4 py-3 text-left hover:bg-[#173847] flex items-center gap-2 text-gray-300 font-medium">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
          
          <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {modules.map((module) => (
                  <button key={module.id} onClick={() => handleModuleClick(module)} className="bg-[#0F2B38]/90 backdrop-blur-sm rounded-xl p-8 border border-[#2a4e60] shadow-lg hover:shadow-cyan-900/50 hover:border-cyan-700 hover:scale-105 hover:bg-[#173847] transition-all group flex flex-col items-center gap-4">
                    <img src={module.image} alt={module.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/png?text=MOD"; }} />
                    <h3 className="text-white font-bold text-lg tracking-wide group-hover:text-cyan-400 transition-colors">{module.name}</h3>
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="px-8 py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded shadow-lg shadow-cyan-900/50 flex items-center gap-2 transition-all">
                  <Upload size={20} /> UPLOAD FILES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. ANALYSIS VIEW
  if (currentView === 'analysis') {
    return (
      <div className="min-h-screen w-full flex flex-col font-sans relative">
         {/* Fix: Put background here so it covers the whole view */}
        <RealisticBackground />

        {/* Relative z-10 ensures content sits ON TOP of the video */}
        <div className="relative z-10 flex flex-col min-h-screen">
            <nav className="bg-[#0F2B38]/80 backdrop-blur-md border-b border-[#1e4a5b]/50 shadow-lg flex-shrink-0 z-20 relative">
              <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-auto flex items-center"><AppLogo className="h-12" /></div>
                  <h1 className="text-xl font-bold text-white">Application U</h1>
                </div>
                <div className="relative">
                  <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="w-10 h-10 bg-[#173847]/80 rounded border border-[#2a4e60] flex items-center justify-center hover:bg-[#1f4a5e] transition-colors">
                    <User className="text-gray-300" size={20} />
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0F2B38] rounded-lg shadow-xl border border-[#2a4e60] overflow-hidden z-50">
                      <button onClick={handleLogout} className="w-full px-4 py-3 text-left hover:bg-[#173847] flex items-center gap-2 text-gray-300 font-medium">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </nav>
            
            {/* Tab Bar: Semi-transparent */}
            <div className="bg-[#0b1b22]/90 border-b border-[#1e4a5b]/50 flex gap-1 px-4 py-1 flex-shrink-0 overflow-x-auto">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTabId(tab.id)} className={`px-4 py-2 rounded-t flex items-center gap-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTabId === tab.id ? 'bg-[#0F2B38] text-white border-t-2 border-cyan-500' : 'bg-[#08161c]/60 text-gray-400 hover:text-gray-200 hover:bg-[#0c1f26]/80'}`}>
                  {tab.name}
                  <X size={14} onClick={(e) => handleCloseTab(tab.id, e)} className="hover:bg-red-500/20 hover:text-red-400 rounded-full p-0.5 transition-colors" />
                </button>
              ))}
            </div>
            
            {activeTab && (
              <div className="flex-1 p-6 flex gap-6 overflow-auto">
                {/* Left Sidebar (Tables) - Solid/High Opacity Panel */}
                <div className="w-80 min-w-[320px] bg-[#0F2B38]/95 backdrop-blur-sm rounded-lg border border-[#1e4a5b] shadow-xl flex flex-col h-full">
                  <h2 className="text-white font-bold text-lg mb-4 border-b border-[#1e4a5b] pb-2 p-5">Values and Tables</h2>
                  <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                    {activeTab.hasRun ? (
                      <img 
                        src={MODULE_CONFIG[activeTab.moduleId]?.results.table} 
                        alt="Table Output" 
                        className="w-full h-auto object-contain border border-[#2a4e60] rounded opacity-90 hover:opacity-100 transition-opacity"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x500/173847/white?text=Table+Image+Missing"; }}
                      />
                    ) : (
                      <div className="text-gray-500 text-sm italic text-center px-4">
                        <Activity size={32} className="mb-2 opacity-30 mx-auto"/>
                        Select options and click RUN to view data
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-6 min-w-[600px]">
                  {/* Controls Box - Solid/High Opacity Panel */}
                  <div className="bg-[#0F2B38]/95 backdrop-blur-sm rounded-lg border border-[#1e4a5b] shadow-xl p-5">
                    <div className="flex flex-wrap gap-4 items-end">
                      {renderDropdowns(activeTab)}
                      
                      <button onClick={handleRun} className="px-8 py-2 bg-green-700 hover:bg-green-600 text-white font-bold rounded shadow-lg shadow-green-900/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap justify-center h-10 mb-[1px]">
                        RUN
                      </button>
                    </div>
                  </div>
                  
                  {/* Graph Box - Solid/High Opacity Panel */}
                  <div className="flex-1 bg-[#0F2B38]/95 backdrop-blur-sm rounded-lg border border-[#1e4a5b] shadow-xl p-5 flex flex-col min-h-[500px]">
                    <h2 className="text-white font-bold text-lg mb-4 border-b border-[#1e4a5b] pb-2">Graph Output</h2>
                    <div className="flex-1 min-h-0 bg-[#082029]/50 rounded border border-[#1e4a5b]/50 flex items-center justify-center overflow-hidden">
                      {activeTab.hasRun ? (
                        <img 
                          src={MODULE_CONFIG[activeTab.moduleId]?.results.graph} 
                          alt="Graph Output" 
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/173847/white?text=Graph+Image+Missing"; }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-600">
                          <p>Graph area empty</p>
                          <p className="text-sm">Select input parameters above</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="px-8 py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded shadow-lg shadow-cyan-900/50 flex items-center gap-2 transition-all">
                      <Upload size={20} /> Upload Files
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default DeepSeaApp;
