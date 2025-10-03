import React from 'react'
import WalletConnect from './components/WalletConnect'
import VotingInterface from './components/VotingInterface'
import { useVoting } from './hooks/useVoting'

function App() {
  const {
    account,
    proposals,
    hasVoted,
    votingActive,
    isLoading,
    connectWallet,
    vote
  } = useVoting()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 ethiopian-gradient rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🇪🇹</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">
                  Ethiopian Election 2018
                </h1>
                <div className="h-1 w-32 ethiopian-gradient rounded-full mx-auto"></div>
              </div>
            </div>
            <p className="text-white/80 text-lg font-medium">
              Secure • Transparent • Decentralized Voting
            </p>
            <p className="text-white/60 text-sm mt-2">
              Powered by Ethereum Blockchain 
            </p>
          </div>
        </header>

        {/* Wallet Connection */}
        <WalletConnect account={account} onConnect={connectWallet} />

        {/* Voting Interface */}
        {account && (
          <VotingInterface
            proposals={proposals}
            hasVoted={hasVoted}
            votingActive={votingActive}
            isLoading={isLoading}
            onVote={vote}
          />
        )}

        {/* Footer */}
        <footer className="text-center mt-16">
          <div className="glass-card p-6">
            <p className="text-white/80 font-medium">Built by <a href="http://linkedin.com/in/yegetaneh-firew">Yegetaneh Firew</a> </p>
            <p className="text-white/60 text-sm mt-2">
              Sepolia Testnet • MetaMask Required
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App