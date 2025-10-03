import { useState, useEffect } from 'react'
import { createPublicClient, createWalletClient, custom, http, parseAbi } from 'viem'
import { sepolia } from 'viem/chains'


const VOTING_ABI = parseAbi([
    'function vote(uint256 proposalIndex) external',
    'function getProposalCount() view returns (uint256)',
    'function getProposal(uint256 index) view returns (string memory name, uint256 voteCount)',
    'function hasVoted(address) view returns (bool)',
    'function votingActive() view returns (bool)',
    'event Voted(address indexed voter, uint256 proposalIndex)'
])

const CONTRACT_ADDRESS = '0x54526A0556E4F50b4032eceEE85c60fa4F6AAd8d'

export function useVoting() {
    const [account, setAccount] = useState(null)
    const [proposals, setProposals] = useState([])
    const [hasVoted, setHasVoted] = useState(false)
    const [votingActive, setVotingActive] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    
    const publicClient = createPublicClient({
        chain: sepolia, 
        transport: http()
    })

    const walletClient = account ? createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
    }) : null

    // here we connect wallet
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask!')
            return
        }

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            setAccount(accounts[0])
        } catch (error) {
            console.error('Failed to connect wallet:', error)
        }
    }


    const loadProposals = async () => {
        try {
            const count = await publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: VOTING_ABI,
                functionName: 'getProposalCount'
            })

            if (count === 0n) {
                setProposals([])
                return
            }

            const proposalPromises = []
            for (let i = 0; i < count; i++) {
                proposalPromises.push(
                    publicClient.readContract({
                        address: CONTRACT_ADDRESS,
                        abi: VOTING_ABI,
                        functionName: 'getProposal',
                        args: [i]
                    })
                )
            }
            const proposalResults = await Promise.all(proposalPromises)
            setProposals(proposalResults.map(([name, voteCount]) => ({ name, voteCount: Number(voteCount) })))

        } catch (error) {
            console.error('Failed to load proposals from contract:', error)
            setProposals([])
        }
    }

    // Check if user has voted
    const checkVotingStatus = async () => {
        if (!account) return

        try {
            const voted = await publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: VOTING_ABI,
                functionName: 'hasVoted',
                args: [account]
            })
            setHasVoted(voted)

            const active = await publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: VOTING_ABI,
                functionName: 'votingActive'
            })
            setVotingActive(active)

        } catch (error) {
            console.error('Failed to check voting status from contract:', error)
            setHasVoted(false)
            setVotingActive(false)
        }
    }

    // here's vote for a proposal
    const vote = async (proposalIndex) => {
        if (!walletClient || !account) {
            alert('Please connect your wallet first!')
            return
        }

        if (hasVoted) {
            alert('You have already voted!')
            return
        }

        if (!votingActive) {
            alert('Voting is not currently active!')
            return
        }

        setIsLoading(true)

        try {
            const hash = await walletClient.writeContract({
                address: CONTRACT_ADDRESS,
                abi: VOTING_ABI,
                functionName: 'vote',
                args: [proposalIndex],
                account
            })

            await publicClient.waitForTransactionReceipt({ hash })

           
            await loadProposals()
            await checkVotingStatus()

            alert('Vote cast successfully!')

        } catch (error) {
            console.error('Failed to cast vote:', error)
            alert(`Failed to cast vote: ${error.message || 'Unknown error'}`)
        } finally {
            setIsLoading(false)
        }
    }

   
    useEffect(() => {
        loadProposals()
        checkVotingStatus()
    }, [account])

    return {
        account,
        proposals,
        hasVoted,
        votingActive,
        isLoading,
        connectWallet,
        vote,
        loadProposals
    }
}
