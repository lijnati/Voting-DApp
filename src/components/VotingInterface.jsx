export default function VotingInterface({
    proposals,
    hasVoted,
    votingActive,
    isLoading,
    onVote
}) {
    if (!votingActive) {
        return (
            <div className="modern-card p-8 border-l-4 border-red-500">
                <div className="flex items-center">
                    <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mr-6">
                        <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-900 font-semibold text-xl">Voting is Currently Inactive</p>
                        <p className="text-gray-600 text-base mt-1">Please wait for the voting period to begin</p>
                    </div>
                </div>
            </div>
        )
    }

    if (proposals.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="modern-card p-12 max-w-md mx-auto">
                    <div className="w-24 h-24 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Candidates Available</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Make sure the voting contract is deployed and contains candidates.
                    </p>
                </div>
            </div>
        )
    }

    const totalVotes = proposals.reduce((sum, proposal) => sum + proposal.voteCount, 0)

    // Modern color schemes for visual distinction
    const candidateColors = [
        { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
        { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
        { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', light: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
        { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
        { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', light: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
        { bg: 'bg-indigo-500', hover: 'hover:bg-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' }
    ]

    return (
        <div className="space-y-10 fade-in">
            <div className="modern-card p-8 slide-up">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Election Candidates</h2>
                    <p className="text-gray-600 text-lg">Cast your vote for your preferred candidate</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                        <div className="text-5xl font-bold gradient-text mb-2">{totalVotes}</div>
                        <div className="text-gray-600 font-medium">Total Votes Cast</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold gradient-text mb-2">{proposals.length}</div>
                        <div className="text-gray-600 font-medium">Candidates</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold gradient-text mb-2">
                            {totalVotes > 0 ? Math.max(...proposals.map(p => (p.voteCount / totalVotes) * 100)).toFixed(1) : 0}%
                        </div>
                        <div className="text-gray-600 font-medium">Leading Percentage</div>
                    </div>
                </div>

                {hasVoted && (
                    <div className="text-center">
                        <div className="status-badge success-badge text-base px-6 py-3">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Your vote has been successfully recorded
                        </div>
                    </div>
                )}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 slide-up">
                {proposals.map((proposal, index) => {
                    const percentage = totalVotes > 0 ? (proposal.voteCount / totalVotes) * 100 : 0
                    const colors = candidateColors[index % candidateColors.length]
                    const isLeading = totalVotes > 0 && proposal.voteCount === Math.max(...proposals.map(p => p.voteCount))

                    return (
                        <div key={index} className={`modern-card p-8 hover:-translate-y-1 transition-all duration-300 ${isLeading ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
                            {isLeading && totalVotes > 0 && (
                                <div className="flex items-center justify-center mb-4">
                                    <div className="status-badge bg-yellow-100 text-yellow-800 border-yellow-200">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Leading
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {proposal.name}
                                    </h3>
                                    <div className="flex items-baseline space-x-4">
                                        <div className="text-4xl font-bold text-gray-900">
                                            {proposal.voteCount}
                                        </div>
                                        <div className="text-xl font-semibold text-gray-600">
                                            {percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-16 h-16 ${colors.light} ${colors.border} border-2 rounded-2xl flex items-center justify-center`}>
                                    <span className={`${colors.text} font-bold text-xl`}>
                                        {index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Modern progress bar */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">Vote Progress</span>
                                    <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className={`${colors.bg} h-4 rounded-full transition-all duration-1000 ease-out relative`}
                                        style={{ width: `${percentage}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => onVote(index)}
                                disabled={hasVoted || isLoading}
                                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${hasVoted || isLoading
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : `${colors.bg} ${colors.hover} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Vote...
                                    </span>
                                ) : hasVoted ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Vote Recorded
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Vote for {proposal.name}
                                    </span>
                                )}
                            </button>
                        </div>
                    )
                })}
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="modern-card p-10 max-w-md mx-4">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Processing Your Vote</h3>
                            <p className="text-gray-600 leading-relaxed">Please wait while your vote is securely recorded on the blockchain. This may take a few moments.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}