import React from 'react'

export default function VotingInterface({
    proposals,
    hasVoted,
    votingActive,
    isLoading,
    onVote
}) {
    if (!votingActive) {
        return (
            <div className="glass-card p-6 border-l-4 border-red-500">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white font-semibold text-lg">Voting is Currently Inactive</p>
                        <p className="text-white/70 text-sm">Please wait for the voting period to begin</p>
                    </div>
                </div>
            </div>
        )
    }

    if (proposals.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="glass-card p-8">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Candidates Available</h3>
                    <p className="text-white/70">
                        Make sure the voting contract is deployed and contains candidates.
                    </p>
                </div>
            </div>
        )
    }

    const totalVotes = proposals.reduce((sum, proposal) => sum + proposal.voteCount, 0)

    // Party colors for visual distinction
    const partyColors = [
        'from-green-500 to-emerald-600',
        'from-blue-500 to-indigo-600',
        'from-purple-500 to-violet-600',
        'from-orange-500 to-red-600',
        'from-yellow-500 to-orange-500',
        'from-pink-500 to-rose-600'
    ]

    return (
        <div className="space-y-8">
            <div className="glass-card p-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Political Parties</h2>
                <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white">{totalVotes}</div>
                        <div className="text-white/70 text-sm">Total Votes</div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white">{proposals.length}</div>
                        <div className="text-white/70 text-sm">Candidates</div>
                    </div>
                </div>
                {hasVoted && (
                    <div className="mt-4 inline-flex items-center bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-300 font-semibold">You have already voted</span>
                    </div>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {proposals.map((proposal, index) => {
                    const percentage = totalVotes > 0 ? (proposal.voteCount / totalVotes) * 100 : 0
                    const colorClass = partyColors[index % partyColors.length]

                    return (
                        <div key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {proposal.name}
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl font-bold text-white">
                                            {proposal.voteCount}
                                        </div>
                                        <div className="text-white/70">
                                            {percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-full flex items-center justify-center`}>
                                    <span className="text-white font-bold text-lg">
                                        {index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced progress bar */}
                            <div className="mb-6">
                                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`bg-gradient-to-r ${colorClass} h-3 rounded-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={() => onVote(index)}
                                disabled={hasVoted || isLoading}
                                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${hasVoted || isLoading
                                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                                    : `bg-gradient-to-r ${colorClass} text-white hover:shadow-lg transform hover:scale-105`
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Voting...
                                    </span>
                                ) : hasVoted ? (
                                    'Already Voted'
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="glass-card p-8 max-w-sm mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Processing Your Vote</h3>
                            <p className="text-white/70">Please wait while your vote is recorded on the blockchain...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}