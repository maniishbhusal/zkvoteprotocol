import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ExternalLink, Shield, Clock, CheckCircle2, Hash, User, Eye, Copy, Filter } from "lucide-react";

const BlockchainExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterElection, setFilterElection] = useState("all");
  const [copiedTx, setCopiedTx] = useState(null);
  const [liveVotes, setLiveVotes] = useState([]);

  // Simulate real-time vote transactions
  useEffect(() => {
    const initialVotes = generateMockVotes(20);
    setLiveVotes(initialVotes);

    // Add new vote every 5 seconds
    const interval = setInterval(() => {
      const newVote = generateSingleVote();
      setLiveVotes(prev => [newVote, ...prev].slice(0, 50));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const elections = [
    { id: "PM-2025", name: "Prime Minister Election 2025" },
    { id: "PG-BAG", name: "Provincial Governor - Bagmati" },
    { id: "REF-2025", name: "Constitutional Referendum" }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(text);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const filteredVotes = liveVotes.filter(vote => {
    const matchesSearch = 
      vote.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vote.voterAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterElection === "all" || vote.electionId === filterElection;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Blockchain Vote Explorer
                </h1>
                <p className="text-sm text-gray-400">Real-time on-chain voting transactions</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              Live
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Votes</p>
                  <p className="text-3xl font-bold text-white">3,254,892</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-400/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Blocks Created</p>
                  <p className="text-3xl font-bold text-white">45,678</p>
                </div>
                <Hash className="w-10 h-10 text-purple-400/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Unique Voters</p>
                  <p className="text-3xl font-bold text-white">3,254,892</p>
                </div>
                <User className="w-10 h-10 text-blue-400/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Avg Block Time</p>
                  <p className="text-3xl font-bold text-white">2.3s</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-400/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Benefits Banner */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Why Blockchain for Voting?</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-purple-300 mb-1">🔒 Immutable</p>
                    <p className="text-gray-400">Votes cannot be altered or deleted once recorded</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-300 mb-1">👁️ Transparent</p>
                    <p className="text-gray-400">Anyone can verify votes while maintaining anonymity</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-300 mb-1">⚡ Real-time</p>
                    <p className="text-gray-400">Instant vote counting with no delays or manual counting</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by transaction hash or voter address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterElection}
                  onChange={(e) => setFilterElection(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white rounded-md px-4 py-2 outline-none"
                >
                  <option value="all">All Elections</option>
                  {elections.map(election => (
                    <option key={election.id} value={election.id}>{election.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Transactions */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-2xl">Live Vote Transactions</CardTitle>
                <CardDescription className="text-gray-400">
                  All votes are recorded on Solana blockchain with zero-knowledge proofs
                </CardDescription>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                <Eye className="w-3 h-3 mr-1" />
                {filteredVotes.length} visible
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {filteredVotes.map((vote, index) => (
                <div 
                  key={vote.txHash}
                  className="p-4 hover:bg-white/5 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Transaction Hash */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-500">Transaction Hash</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded">
                          {vote.txHash}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(vote.txHash)}
                          className="text-gray-400 hover:text-white h-6 w-6 p-0"
                        >
                          {copiedTx === vote.txHash ? (
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white h-6 w-6 p-0"
                          onClick={() => window.open(`https://solscan.io/tx/${vote.txHash}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Voter Address (Anonymous) */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-500">Anonymous Voter</span>
                      </div>
                      <code className="text-sm font-mono text-blue-300 bg-blue-500/10 px-2 py-1 rounded block">
                        {vote.voterAddress}
                      </code>
                    </div>

                    {/* Election Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-500">Election</span>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                        {elections.find(e => e.id === vote.electionId)?.name || vote.electionId}
                      </Badge>
                    </div>

                    {/* Timestamp */}
                    <div className="flex-shrink-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-gray-500">Time</span>
                      </div>
                      <p className="text-sm text-gray-300">{vote.timestamp}</p>
                    </div>

                    {/* Status */}
                 
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All votes are encrypted using zero-knowledge proofs to ensure voter anonymity while maintaining transparency.</p>
          <p className="mt-2">Powered by Solana Blockchain • Average Block Time: 2.3s</p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Helper functions to generate mock blockchain data
function generateMockVotes(count) {
  const votes = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    votes.push(generateSingleVote(now - (i * 5000)));
  }
  
  return votes;
}

function generateSingleVote(timestamp = Date.now()) {
  const elections = ["PM-2025", "PG-BAG", "REF-2025"];
  
  return {
    txHash: generateHash(),
    voterAddress: generateAddress(),
    electionId: elections[Math.floor(Math.random() * elections.length)],
    timestamp: formatTimestamp(timestamp),
    blockHeight: Math.floor(Math.random() * 100000) + 45000,
  };
}

function generateHash() {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function generateAddress() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

function formatTimestamp(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return new Date(timestamp).toLocaleString();
}

export default BlockchainExplorer;