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
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="modern-card p-12 mb-8 fade-in">
            <div className="flex flex-col md:flex-row items-center justify-center mb-8">
              <div className="w-20 h-20 ethiopian-gradient rounded-2xl flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-lg">
                <span className="text-3xl">🇪🇹</span>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                  Ethiopian Election 2018
                </h1>
                <div className="h-1.5 w-40 ethiopian-gradient rounded-full mx-auto md:mx-0"></div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 text-xl font-semibold">
                Secure • Transparent • Decentralized Voting
              </p>
              <p className="text-gray-600 text-base">
                Powered by Ethereum Blockchain Technology
              </p>
            </div>
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
        <footer className="text-center mt-20">
          <div className="accent-card p-8">
            <p className="text-gray-700 font-semibold text-lg mb-2">
              Built by <a href="http://linkedin.com/in/yegetaneh-firew" className="text-blue-600 hover:text-blue-700 transition-colors">Yegetaneh Firew</a>
            </p>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sepolia Testnet
              </span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                MetaMask Required
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App