// src/types/voting.ts
export interface Candidate {
  id: string
  name: string
  voteCount: string
}

export interface VotingContractState {
  contract: any | null
  provider: any | null
  account: string
  candidates: Candidate[]
  hasVoted: boolean
  votingStopped: boolean
  isOwner: boolean
}