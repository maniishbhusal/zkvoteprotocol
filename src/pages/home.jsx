import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';
require('@solana/wallet-adapter-react-ui/styles.css');

function Home() {
  const [pollKey, setPollKey] = useState('');
  const wallet = useWallet();

  if (!wallet.connected && !wallet.connecting) {
    return (
      <div className="flex flex-col items-center gap-20 justify-center h-full w-full">
        <h1 className="text-4xl text-white font-bold">
          Connect your wallet to participate in Nepal's blockchain voting system!
        </h1>
        <WalletMultiButton />
        <div className="mt-8 text-center max-w-2xl">
          <h2 className="text-2xl text-indigo-300 font-semibold mb-4">ZkVote Nepal</h2>
          <p className="text-lg text-gray-300">
            Nepal's first blockchain-powered voting system. Cast your vote securely, transparently, and instantly with zero-knowledge identity verification.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full">
      <div className="text-center mb-8">
  <h1 className="text-3xl text-white font-bold">Welcome to ZkVote Nepal</h1>
        <p className="text-lg text-gray-300 mt-2">Participate in Nepal's democratic future</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-4xl">
        <div className="flex flex-col gap-4 w-full md:w-[400px]">
          <h2 className="text-xl text-white font-semibold">Join Existing Election</h2>
          <input type="text" className="bg-white text-lg p-4 rounded-xl outline-none border-2 border-indigo-500"
            placeholder='Enter Election Code'
            value={pollKey}
            onChange={e => setPollKey(e.target.value.replace(/ /g, ''))}
          />
          <Link to={`/soll/${pollKey}`}>
            <button disabled={!pollKey} className="bg-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl p-4 w-full font-semibold text-xl">
              Join Election
            </button>
          </Link>
        </div>
        
        <div className="hidden md:block w-[1px] h-[200px] bg-white" />
        <div className="block md:hidden w-[80%] h-[1px] bg-white" />
        
        <div className="flex flex-col gap-4 w-full md:w-[400px]">
          <h2 className="text-xl text-white font-semibold">Create New Election</h2>
          <Link to="/create">
            <button className="bg-indigo-500 text-white rounded-xl p-4 w-full font-semibold text-xl">
              Create Election
            </button>
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center max-w-3xl">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-indigo-400 font-bold text-lg">01</div>
            <div className="text-white">Verify Identity</div>
            <div className="text-gray-400 text-sm">Scan your Nepali citizenship or voter ID card</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-indigo-400 font-bold text-lg">02</div>
            <div className="text-white">Connect Wallet</div>
            <div className="text-gray-400 text-sm">Link your Solana wallet to receive your unique voting token</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-indigo-400 font-bold text-lg">03</div>
            <div className="text-white">Cast Your Vote</div>
            <div className="text-gray-400 text-sm">Browse active elections and polls</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-indigo-400 font-bold text-lg">04</div>
            <div className="text-white">View Results</div>
            <div className="text-gray-400 text-sm">Track real-time results with complete transparency</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
