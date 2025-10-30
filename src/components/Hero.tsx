import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Vote, Lock, TrendingUp, Users, Globe, Zap, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [voteCount, setVoteCount] = useState(0);

  // Animated vote counter
  useEffect(() => {
    const target = 18456732;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setVoteCount(target);
        clearInterval(timer);
      } else {
        setVoteCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  // Rotate metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: "Total Votes Cast", value: voteCount.toLocaleString(), icon: Vote, color: "text-blue-400" },
    { label: "Active Voters Today", value: "147,832", icon: Users, color: "text-purple-400" },
    { label: "Avg. Turnout Rate", value: "72.3%", icon: TrendingUp, color: "text-green-400" }
  ];

  const ActiveIcon = metrics[activeMetric].icon;

  const provinces = [
    { name: "Koshi", votes: "2.8M", turnout: 71, x: 75, y: 35 },
    { name: "Madhesh", votes: "3.2M", turnout: 68, x: 70, y: 50 },
    { name: "Bagmati", votes: "3.8M", turnout: 75, x: 55, y: 45 },
    { name: "Gandaki", votes: "1.6M", turnout: 73, x: 45, y: 40 },
    { name: "Lumbini", votes: "2.9M", turnout: 70, x: 40, y: 55 },
    { name: "Karnali", votes: "980K", turnout: 65, x: 35, y: 35 },
    { name: "Sudurpashchim", votes: "1.8M", turnout: 70, x: 25, y: 45 }
  ];

  const navigate = useNavigate();

  const handleVoteClick = () => {
    const verified = localStorage.getItem('userVerified') === 'true';
    if (verified) {
      navigate('/dashboard');
    } else {
      navigate('/verify');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      
      {/* Background Nepal Map (Right Side) */}
      <div className="absolute right-0 top-36 w-1/2 pointer-events-none  ">
        {/* Replace the SVG with an image of the Nepal map */}
        <img 
          src="/images/nepal.png" // **Replace with the actual URL of your hosted image**
          alt="Nepal Map with Voting Data" 
          className="w-full h-full object-contain transform transition-transform duration-700 ease-out animate-zoom-in" // object-contain to ensure the whole map is visible
          style={{ filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.25))' }}
        />
      </div>

      {/* Floating Data Cards on Map - Adjust positions relative to the image */}
      {/* These will now float over the image instead of the SVG paths */}
      <div className="absolute right-[15%] top-[20%] animate-float">
        <div className="bg-slate-900/80 backdrop-blur-md border border-blue-500/30 rounded-lg px-4 py-3 shadow-xl">
          <div className="text-xs text-slate-400">Bagmati Province</div>
          <div className="text-xl font-bold text-blue-400">3.8M votes</div>
          <div className="text-xs text-green-400">↑ 75% turnout</div>
        </div>
      </div>

      <div className="absolute right-[25%] top-[50%] animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-lg px-4 py-3 shadow-xl">
          <div className="text-xs text-slate-400">Madhesh Province</div>
          <div className="text-xl font-bold text-purple-400">3.2M votes</div>
          <div className="text-xs text-green-400">↑ 68% turnout</div>
        </div>
      </div>

      <div className="absolute right-[10%] top-[65%] animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-3 shadow-xl">
          <div className="text-xs text-slate-400">Koshi Province</div>
          <div className="text-xl font-bold text-cyan-400">2.8M votes</div>
          <div className="text-xs text-green-400">↑ 71% turnout</div>
        </div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Main Content */}
      <div className="container relative z-10 px-4 py-20" style={{ paddingRight: '50%' }}>
        <div className="max-w-4xl animate-appear-left">
          
          {/* Top Badge */}
          <div className="mb-8 animate-slide-down">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md border border-blue-400/30 shadow-2xl">
              <Shield className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-sm font-bold text-white">Government of Nepal</span>
              <div className="w-1 h-4 bg-slate-600" />
              <span className="text-sm text-slate-300">Official Blockchain Voting Platform</span>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-white tracking-tight">
              Your Vote.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Your Power.
              </span>
              <br />
              <span className="text-2xl md:text-3xl text-slate-400">Secured Forever.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Nepal's first <span className="text-blue-400 font-semibold">blockchain-powered voting system</span>. 
              Cast your vote securely, transparently, and instantly with zero-knowledge identity verification.
            </p>
          </div>

          {/* Live Metric Display */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ActiveIcon className={`w-10 h-10 ${metrics[activeMetric].color}`} />
                  <div>
                    <div className="text-sm text-slate-400 mb-1">{metrics[activeMetric].label}</div>
                    <div className={`text-5xl font-black ${metrics[activeMetric].color}`}>
                      {metrics[activeMetric].value}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {metrics.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === activeMetric ? 'bg-blue-400 w-8' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              type="button"
              onClick={handleVoteClick}
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white text-xl font-bold px-12 py-8 rounded-2xl shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70"
            >
              <Vote className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform" />
              Cast Your Vote Now
              <Zap className="ml-3 h-6 w-6 group-hover:animate-pulse" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-xl font-bold px-12 py-8 rounded-2xl border-2 border-blue-400/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 hover:scale-105"
            >
              <Lock className="mr-3 h-6 w-6" />
              Verify with zkID
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-slate-200">Solana Blockchain</span>
            </div>
            
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
              <Lock className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-slate-200">Zero-Knowledge Proofs</span>
            </div>
            
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-slate-200">100% Transparent</span>
            </div>
            
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-slate-200">Instant Results</span>
            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500/10 border border-pink-500/30 backdrop-blur-sm">
              <Globe className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-semibold text-slate-200">77 Districts Connected</span>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-12 pt-8 border-t border-slate-700/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span>Live System • 99.9% Uptime</span>
              </div>
              <div>Trusted by 18M+ Nepali Citizens</div>
              <div>Secured by Blockchain Technology</div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* New animations for improved entrance effects */
        @keyframes appear-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes zoom-in {
          from { transform: scale(1.02); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-appear-left {
          animation: appear-left 700ms cubic-bezier(.2,.9,.3,1) both;
        }

        .animate-zoom-in {
          animation: zoom-in 900ms ease-out both;
        }
      `}</style>
    </section>
  );
};

export default Hero;