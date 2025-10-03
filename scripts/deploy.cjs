const hre = require("hardhat");

async function main() {
  console.log("Deploying Ethiopian Election 2018 Voting contract to Sepolia...");

  // Ethiopian Election 2018 candidates
  const proposals = [
    "Prosperity Party",
    "Ezema Party", 
    "Freedom and Equality Party",
    "All Ethiopian National Movement",
    "Balderas Party",
    "Ethiopian Democratic Party"
  ];

  // Get the contract factory
  const Voting = await hre.ethers.getContractFactory("Voting");
  
  // 
  console.log("Deploying with candidates:", proposals);
  const voting = await Voting.deploy(proposals);

  // Wait for deployment to complete
  await voting.waitForDeployment();

  const contractAddress = await voting.getAddress();
  console.log(" Voting contract deployed to:", contractAddress);

  // Verify the deployment
  console.log("\n Contract Details:");
  console.log("- Network: Sepolia");
  console.log("- Contract Address:", contractAddress);
  console.log("- Owner:", await voting.owner());
  console.log("- Voting Active:", await voting.votingActive());
  console.log("- Proposal Count:", await voting.getProposalCount());

  // Display all candidates
  console.log("\n nEthiopian Election 2018 Candidates:");
  const proposalCount = await voting.getProposalCount();
  for (let i = 0; i < proposalCount; i++) {
    const [name, voteCount] = await voting.getProposal(i);
    console.log(`${i + 1}. ${name} (${voteCount} votes)`);
  }

//   console.log("\n Next Steps:");
//   console.log("1. Update CONTRACT_ADDRESS in src/hooks/useVoting.js");
//   console.log("2. Replace the address with:", contractAddress);
//   console.log("3. Run 'npm run dev' to test the DApp");

  // here we save the deployment info
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: contractAddress,
    deploymentTime: new Date().toISOString(),
    election: "Ethiopian Election 2018",
    candidates: proposals,
    owner: await voting.owner()
  };

  const fs = require('fs');
  fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("\n Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });