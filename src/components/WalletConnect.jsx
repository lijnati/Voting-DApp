export default function WalletConnect({ account, onConnect }) {
  if (account) {
    return (
      <div className="mb-12">
        <div className="modern-card p-8">
          <div className="flex items-center justify-center">
            <div className="status-badge success-badge text-lg px-8 py-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="font-semibold mr-3">Wallet Connected:</span>
              <span className="font-mono text-sm bg-gray-100 px-4 py-2 rounded-lg border">
                {account.slice(0, 8)}...{account.slice(-6)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center mb-12">
      <div className="modern-card p-12 max-w-2xl mx-auto fade-in">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257-.257A6 6 0 1118 8zm-6-2a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
            Connect your MetaMask wallet to securely participate in the Ethiopian Election 2018
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure & Encrypted
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Blockchain Verified
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Anonymous Voting
            </div>
          </div>
        </div>

        <button
          onClick={onConnect}
          className="primary-button text-xl px-12 py-5 mx-auto block"
        >
          <span className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Connect MetaMask Wallet
          </span>
        </button>
        
        <p className="text-gray-500 text-sm mt-6">
          Don't have MetaMask? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">Download it here</a>
        </p>
      </div>
    </div>
  )
}