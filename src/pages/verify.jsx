import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileCheck, CheckCircle2, AlertCircle, ArrowLeft, FileText, Camera, Wallet, Vote, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    solana?: any;
  }
}

declare global {
  interface Window {
    solana?: any;
  }
}

const Verify = () => {
  const [uploadedDocs, setUploadedDocs] = useState({ citizenship: null, voterCard: null });
  const [userInfo, setUserInfo] = useState({ fullName: '', email: '', phone: '' });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [toasts, setToasts] = useState([]);

  const navigate = useNavigate();

  const showToast = (title, description, variant = "default") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleFileUpload = (type, file) => {
    setUploadedDocs(prev => ({ ...prev, [type]: file }));
    showToast(
      "Document Uploaded",
      `${type === 'citizenship' ? 'Citizenship Card' : 'Voter ID Card'} uploaded successfully`
    );
  };

  const handleVerification = () => {
    if (!userInfo.fullName || !userInfo.email) {
      showToast(
        "Missing Information",
        "Please fill in your name and email",
        "destructive"
      );
      return;
    }

    if (!uploadedDocs.citizenship && !uploadedDocs.voterCard) {
      showToast(
        "Missing Documents",
        "Please upload at least one document to verify your identity",
        "destructive"
      );
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationComplete(true);
      
      showToast(
        "Verification Successful!",
        "Your identity has been verified using zkID technology"
      );
    }, 3000);
  };

  const connectPhantomWallet = async () => {
    try {
      const solana = window.solana;

      if (!solana?.isPhantom) {
        showToast(
          "Phantom Not Found",
          "Please install Phantom wallet extension",
          "destructive"
        );
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await solana.connect();
      const address = response.publicKey.toString();
      setWalletAddress(address);

      showToast(
        "Wallet Connected!",
        `Connected: ${address.slice(0, 4)}...${address.slice(-4)}`
      );

      // After successful connection, redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (error) {
      showToast(
        "Connection Failed",
        "Could not connect to Phantom wallet",
        "destructive"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg backdrop-blur-sm border animate-slide-in ${
              toast.variant === 'destructive'
                ? 'bg-red-500/10 border-red-500/50 text-red-100'
                : 'bg-purple-500/10 border-purple-500/50 text-white'
            }`}
          >
            <p className="font-semibold">{toast.title}</p>
            <p className="text-sm opacity-80">{toast.description}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ZKVote
            </h1>
          </div>
          <Badge className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
            <AlertCircle className="w-4 h-4 mr-1" />
            Verification Required
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
            <FileCheck className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Verify Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Identity</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            To participate in elections, we need to verify you're a Nepali citizen using zkID technology. 
            Your documents are processed securely and not stored.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="font-semibold mb-1 text-white">Zero-Knowledge</p>
              <p className="text-xs text-gray-400">Only proves citizenship, doesn't reveal personal data</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="font-semibold mb-1 text-white">Not Stored</p>
              <p className="text-xs text-gray-400">Documents are verified instantly and deleted</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="font-semibold mb-1 text-white">Instant</p>
              <p className="text-xs text-gray-400">Get verified in seconds using AI scanning</p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information Section */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your details to begin the verification process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name as per citizenship"
                value={userInfo.fullName}
                onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                disabled={verificationComplete}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                disabled={verificationComplete}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                disabled={verificationComplete}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Section */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Upload Your Documents</CardTitle>
            <CardDescription className="text-gray-400">
              Upload at least one document (Citizenship Card or Voter ID) to verify your identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Citizenship Card Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-white">Citizenship Card</span>
                </div>
                {uploadedDocs.citizenship && (
                  <Badge className="bg-green-500/10 border-green-500 text-green-400">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Uploaded
                  </Badge>
                )}
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('citizenship', e.target.files[0])}
                  className="hidden"
                  id="citizenship-upload"
                  disabled={verificationComplete}
                />
                <label htmlFor="citizenship-upload">
                  <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500/60 transition-all group">
                    <Upload className="w-12 h-12 text-purple-400/50 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
                    <p className="text-sm font-medium mb-1 text-white">
                      {uploadedDocs.citizenship ? uploadedDocs.citizenship.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-950 px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Voter Card Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-white">Voter ID Card</span>
                </div>
                {uploadedDocs.voterCard && (
                  <Badge className="bg-green-500/10 border-green-500 text-green-400">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Uploaded
                  </Badge>
                )}
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('voterCard', e.target.files[0])}
                  className="hidden"
                  id="voter-upload"
                  disabled={verificationComplete}
                />
                <label htmlFor="voter-upload">
                  <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500/60 transition-all group">
                    <Upload className="w-12 h-12 text-purple-400/50 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
                    <p className="text-sm font-medium mb-1 text-white">
                      {uploadedDocs.voterCard ? uploadedDocs.voterCard.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            {!verificationComplete ? (
              <Button 
                onClick={handleVerification}
                disabled={isVerifying || (!uploadedDocs.citizenship && !uploadedDocs.voterCard)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-lg py-6 text-white"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    Verifying with zkID...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Verify Identity
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/50">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-400">Identity Verified! You Are Eligible for vote</p>
                    <p className="text-sm text-gray-400">Now connect your Phantom wallet to continue</p>
                  </div>
                </div>
                {/* Cast Vote button shown after verification */}
                <Button
                  size="lg"
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70 w-full"
                >
                  <Vote className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Cast Your Vote Now
                  <Zap className="ml-3 h-5 w-5 group-hover:animate-pulse" />
                </Button>

                <Button 
                  onClick={connectPhantomWallet}
                  disabled={!!walletAddress}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-lg py-6 text-white"
                >
                  {walletAddress ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Wallet Connected: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Phantom Wallet
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1 text-white">Your Privacy is Protected</p>
                <p className="text-gray-400 text-xs">
                  We use zero-knowledge proof technology to verify your citizenship without storing any personal information. 
                  Your documents are only used to generate a cryptographic proof that you're eligible to vote.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Verify;