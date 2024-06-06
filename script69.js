


window.addEventListener('load', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('MetaMask not detected!');
    }

    // Sepolia ERC20 Contract Address
    const contractAddress = '0x439f3d1A16698aCD2BD74e01CBe992c9D0CCf1F5';
    // Sepolia ERC20 Contract ABI (Generated from your smart contract)
    const contractABI = [ { "inputs": [ { "internalType": "address", "name": "ownerAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "theUser", "type": "address" }, { "internalType": "string", "name": "username", "type": "string" } ], "name": "addUser", "outputs": [], "stateMutability": "nonpayable", "type": "function", "signature": "0x4b68d431" }, { "inputs": [ { "internalType": "string", "name": "username", "type": "string" } ], "name": "findStringIndex", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function", "constant": true, "signature": "0x8884be69" }, { "inputs": [ { "internalType": "address", "name": "theUser", "type": "address" } ], "name": "findUserIndex", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function", "constant": true, "signature": "0xbb54490c" }, { "inputs": [ { "internalType": "address", "name": "theUser", "type": "address" }, { "internalType": "string", "name": "username", "type": "string" } ], "name": "forceAddUserPublic", "outputs": [], "stateMutability": "nonpayable", "type": "function", "signature": "0xf9dbc2b2" }, { "inputs": [ { "internalType": "uint32", "name": "index", "type": "uint32" } ], "name": "forceRemoveUserPublic", "outputs": [], "stateMutability": "nonpayable", "type": "function", "signature": "0x70dacee5" }, { "inputs": [], "name": "getAllProfiles", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" }, { "internalType": "string[]", "name": "", "type": "string[]" } ], "stateMutability": "view", "type": "function", "constant": true, "signature": "0x0b1fe784" }, { "inputs": [ { "internalType": "uint32", "name": "index", "type": "uint32" } ], "name": "getProfile", "outputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function", "constant": true, "signature": "0x84c1b82d" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true, "signature": "0x8da5cb5b" } ];


    // Initialize the contract
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Function to get the balance of the connected MetaMask account
    async function getBalance() {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const balance = await contract.methods.getAllProfiles().call();
        document.getElementById('balance').innerText = `Your balance: ${balance[1]} SPO`;
    }

    // Function to transfer tokens
    async function transfer() {
        const recipient = document.getElementById('recipient').value;
        const amount = document.getElementById('amount').value;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Call the transfer function of the smart contract
        await contract.methods.transfer(recipient, amount).send({ from: account });

        // Update balance after transfer
        await getBalance();
    }

    // Initial balance check
    await getBalance();
});
