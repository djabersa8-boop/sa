
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsView from './components/ResultsView';
import { AthleteData, EvaluationResult } from './types';
import { evaluatePerformance } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: AthleteData) => {
    setLoading(true);
    setError(null);
    try {
      const evaluation = await evaluatePerformance(data);
      setResult(evaluation);
    } catch (err) {
      setError('Evaluation failed. Please check your network and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            OPTIMIZE YOUR <br />
            <span className="text-green-500">PERFORMANCE</span> WITH AI
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Input your biometrics and training history. Our neural engine will synthesize 
            your performance tier and provide data-driven training trajectories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-4 h-fit sticky top-24">
            <InputForm onAnalyze={handleAnalyze} isLoading={loading} />
            
            <div className="mt-8 glass-card p-6 rounded-2xl border-dashed border-slate-700">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">System Status</h4>
               <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  AI Analysis Engine Online
               </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-500 font-medium mb-8">
                {error}
              </div>
            )}

            {!result && !loading && (
              <div className="h-[500px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500 text-center px-8">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M12 16h.01"/><path d="M12 12h.01"/><path d="M12 8h.01"/><path d="M12 4h.01"/><path d="M16 20h.01"/><path d="M16 16h.01"/><path d="M16 12h.01"/><path d="M16 8h.01"/><path d="M16 4h.01"/><path d="M20 20h.01"/><path d="M20 16h.01"/><path d="M20 12h.01"/><path d="M20 8h.01"/><path d="M20 4h.01"/><path d="M4 20h.01"/><path d="M4 16h.01"/><path d="M4 12h.01"/><path d="M4 8h.01"/><path d="M4 4h.01"/><path d="M8 20h.01"/><path d="M8 16h.01"/><path d="M8 12h.01"/><path d="M8 8h.01"/><path d="M8 4h.01"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">Ready for Evaluation</h3>
                <p>Complete the profile form on the left to start your AI-powered sports performance analysis.</p>
              </div>
            )}

            {loading && (
              <div className="h-[500px] flex flex-col items-center justify-center space-y-6">
                 <div className="relative">
                    <div className="w-24 h-24 border-4 border-green-500/20 rounded-full"></div>
                    <div className="absolute inset-0 w-24 h-24 border-t-4 border-green-500 rounded-full animate-spin"></div>
                 </div>
                 <div className="text-center">
                    <h3 className="text-2xl font-bold animate-pulse">Processing Biometrics</h3>
                    <p className="text-slate-500">Generating performance benchmarks and health insights...</p>
                 </div>
              </div>
            )}

            {result && !loading && (
              <ResultsView result={result} />
            )}
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950 mt-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center font-bold text-[10px] text-white">
              A
            </div>
            <span className="text-sm font-bold text-slate-500">© 2024 ATHLETIX AI LABORATORY</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-green-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-500 transition-colors">Methodology</a>
            <a href="#" className="hover:text-green-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
