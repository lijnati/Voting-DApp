export default function WalletConnect({ account, onConnect }) {
  if (account) {
    return (
      <div className="mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-green-500/20 border border-green-400/30 rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-semibold mr-2">Connected:</span>
              <span className="text-green-300 font-mono text-sm bg-black/20 px-3 py-1 rounded-lg">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center mb-8">
      <div className="glass-card p-8">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257-.257A6 6 0 1118 8zm-6-2a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-white/70 mb-6">
            Connect your MetaMask wallet to participate in the Ethiopian Election 2018
          </p>
        </div>
        <button
          onClick={onConnect}
          className="vote-button text-lg px-8 py-4 mx-auto block"
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Connect MetaMask
          </span>
        </button>
      </div>
    </div>
  )
}