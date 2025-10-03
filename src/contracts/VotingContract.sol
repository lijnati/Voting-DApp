// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Proposal {
        string name;
        uint256 voteCount;
    }
    
    mapping(address => bool) public hasVoted;
    Proposal[] public proposals;
    address public owner;
    bool public votingActive;
    
    event Voted(address indexed voter, uint256 proposalIndex);
    event ProposalAdded(string name, uint256 index);
    
    constructor(string[] memory proposalNames) {
        owner = msg.sender;
        votingActive = true;
        
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
            emit ProposalAdded(proposalNames[i], i);
        }
    }
    
    function vote(uint256 proposalIndex) public {
        require(votingActive, "Voting is not active");
        require(!hasVoted[msg.sender], "Already voted");
        require(proposalIndex < proposals.length, "Invalid proposal");
        
        hasVoted[msg.sender] = true;
        proposals[proposalIndex].voteCount++;
        
        emit Voted(msg.sender, proposalIndex);
    }
    
    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }
    
    function getProposal(uint256 index) public view returns (string memory name, uint256 voteCount) {
        require(index < proposals.length, "Invalid proposal index");
        Proposal memory proposal = proposals[index];
        return (proposal.name, proposal.voteCount);
    }
    
    function toggleVoting() public {
        require(msg.sender == owner, "Only owner can toggle voting");
        votingActive = !votingActive;
    }
}