import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Users, Vote, ArrowLeft, AlertCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voted, setVoted] = useState({});
  const [isVerified, setIsVerified] = useState(true);
  const [showVoteConfirm, setShowVoteConfirm] = useState(null);

  const navigate = useNavigate();

  const elections = [
    {
      id: 1,
      title: "Prime Minister Election 2025",
      description: "Vote for the next Prime Minister of Nepal",
      status: "active",
      endsIn: "2 days",
      totalVotes: 2547893,
      candidates: [
        { 
          id: 1, 
          name: "Balen Shah", 
          party: "Independent",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          votes: 1200450, 
          percentage: 47,
          color: "from-blue-600 to-cyan-600"
        },
        { 
          id: 2, 
          name: "Sushila Karki", 
          party: "Nepal Congress",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
          votes: 890123, 
          percentage: 35,
          color: "from-green-600 to-emerald-600"
        },
        { 
          id: 3, 
          name: "Harka Sampang", 
          party: "CPN-UML",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
          votes: 457320, 
          percentage: 18,
          color: "from-red-600 to-rose-600"
        },
      ]
    },
    {
      id: 2,
      title: "Provincial Governor - Bagmati Pradesh",
      description: "Select your provincial representative for Bagmati",
      status: "active",
      endsIn: "5 days",
      totalVotes: 856789,
      candidates: [
        { 
          id: 1, 
          name: "Bidya Devi Bhandari", 
          party: "CPN-UML",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
          votes: 434567, 
          percentage: 51,
          color: "from-red-600 to-orange-600"
        },
        { 
          id: 2, 
          name: "Kul Bahadur Gurung", 
          party: "Nepal Congress",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
          votes: 422222, 
          percentage: 49,
          color: "from-green-600 to-teal-600"
        },
      ]
    },
    {
      id: 3,
      title: "Constitutional Amendment Referendum",
      description: "संविधान संशोधन गर्ने कि नगर्ने?",
      status: "upcoming",
      endsIn: "10 days",
      totalVotes: 0,
      candidates: [
        { 
          id: 1, 
          name: "छ (Yes)", 
          party: "Support Amendment",
          image: null,
          votes: 0, 
          percentage: 0,
          color: "from-green-600 to-emerald-600"
        },
        { 
          id: 2, 
          name: "छैन (No)", 
          party: "Oppose Amendment",
          image: null,
          votes: 0, 
          percentage: 0,
          color: "from-red-600 to-rose-600"
        },
      ]
    },
  ];

  const handleVote = (electionId, candidateId, candidateName) => {
    setShowVoteConfirm({ electionId, candidateId, candidateName });
  };

  const confirmVote = () => {
    if (showVoteConfirm) {
      setVoted({ ...voted, [showVoteConfirm.electionId]: showVoteConfirm.candidateId });
      setShowVoteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Confirmation Modal */}
      {showVoteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full bg-slate-900 border-purple-500/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Vote className="w-6 h-6 text-purple-400" />
                Confirm Your Vote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                You are about to vote for <span className="font-bold text-purple-400">{showVoteConfirm.candidateName}</span>. 
                This action cannot be undone.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200">
                  Your vote is anonymous and secured by blockchain technology. Once submitted, it cannot be changed.
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowVoteConfirm(null)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmVote}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm Vote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ZKVote
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-white">Verified Citizen</span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/vote-explorer')}
            >
              See Live Votes
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Active Elections</p>
                  <p className="text-3xl font-bold text-purple-400">2</p>
                </div>
                <Vote className="w-10 h-10 text-purple-400/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Your Votes Cast</p>
                  <p className="text-3xl font-bold text-green-400">{Object.keys(voted).length}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-400/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Participants</p>
                  <p className="text-3xl font-bold text-white">3.2M</p>
                </div>
                <Users className="w-10 h-10 text-white/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Elections */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Active & Upcoming Elections</h2>
          
          {elections.map((election) => (
            <Card 
              key={election.id}
              className="bg-white/5 backdrop-blur-sm border-purple-500/20 overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-white">{election.title}</CardTitle>
                    <CardDescription className="text-base text-gray-300">{election.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      className={election.status === "active" 
                        ? "bg-green-500/20 text-green-400 border-green-500/50" 
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                      }
                    >
                      {election.status === "active" ? (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Ends in {election.endsIn}
                        </>
                      ) : (
                        `Starts in ${election.endsIn}`
                      )}
                    </Badge>
                    {voted[election.id] && (
                      <Badge className="bg-purple-500/20 border-purple-500 text-purple-400">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Voted
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {election.status === "active" && (
                  <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Total votes: <span className="font-bold text-white">{election.totalVotes.toLocaleString()}</span>
                  </div>
                )}

                {/* Candidates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {election.candidates.map((candidate) => (
                    <Card 
                      key={candidate.id}
                      className={`group relative overflow-hidden transition-all duration-300 ${
                        voted[election.id] === candidate.id
                          ? "border-2 border-purple-500 bg-purple-500/10 scale-105"
                          : "border border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10"
                      }`}
                    >
                      <CardContent className="p-0">
                        {/* Candidate Photo */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                          {candidate.image ? (
                            <img 
                              src={candidate.image} 
                              alt={candidate.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-20 h-20 text-gray-600" />
                            </div>
                          )}
                          
                          {/* Vote Badge Overlay */}
                          {voted[election.id] === candidate.id && (
                            <div className="absolute top-3 right-3">
                              <div className="bg-purple-600 rounded-full p-2">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          )}

                          {/* Party Badge */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <Badge className={`bg-gradient-to-r ${candidate.color} text-white border-0 text-xs`}>
                              {candidate.party}
                            </Badge>
                          </div>
                        </div>

                        {/* Candidate Info */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-bold text-lg text-white mb-1">{candidate.name}</h3>
                            {election.status === "active" && (
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-400">{candidate.votes.toLocaleString()} votes</span>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                  {candidate.percentage}%
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Progress Bar */}
                          {election.status === "active" && (
                            <div className="space-y-2">
                              <Progress 
                                value={candidate.percentage} 
                                className="h-2 bg-white/10"
                              />
                            </div>
                          )}

                          {/* Vote Button */}
                          {election.status === "active" && !voted[election.id] && (
                            <Button 
                              onClick={() => handleVote(election.id, candidate.id, candidate.name)}
                              className={`w-full bg-gradient-to-r ${candidate.color} hover:opacity-90 text-white font-semibold`}
                            >
                              <Vote className="w-4 h-4 mr-2" />
                              Vote for {candidate.name.split(' ')[0]}
                            </Button>
                          )}

                          {voted[election.id] === candidate.id && (
                            <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-3 text-center">
                              <p className="text-sm font-semibold text-purple-300">
                                ✓ You voted for this candidate
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;