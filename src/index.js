// import profilesABI from "./AugustsProfiles_abi.json";
import profilesABI from './AugustsProfiles_abi.json' assert { type: "json" };
import coinABI from './AugustCoin_abi.json' assert { type: "json" };
import faucetABI from './AugustFaucet_abi.json' assert { type: "json" };

const profilesAddress = "0x439f3d1A16698aCD2BD74e01CBe992c9D0CCf1F5";
const coinAddress = "0x2e992BF3732E71A83E44251f9B0dE80553A73632";
const faucetAddress = "0x24AcE8d1f490E05C5A66d6186bAfe051CCb3eEdc";

let web3 = new Web3(window.ethereum);
let profiles_contract = new web3.eth.Contract(profilesABI, profilesAddress);
let coin_contract = new web3.eth.Contract(coinABI, coinAddress);
let faucet_contract = new web3.eth.Contract(faucetABI, faucetAddress);

async function createLeaderboard() {
  const fullprofiles = await profiles_contract.methods.getAllProfiles().call();
  const walletIDs = [...fullprofiles[0]]; 
  const walletNames = [...fullprofiles[1]]; 
  const walletBalances = [];


  for (let i=0; i< walletIDs.length; i++) {
    let addy = walletIDs[i];
    try {
      let singleaddy = await coin_contract.methods.balanceOf(addy).call();
      walletBalances.push(singleaddy.slice(0,singleaddy.length-18));
    } catch (error) {
      console.error(`Error fetching balance for ${addy}:`, error);
    }
    }
  
  const sortedwalletBalances = [];
  const sortedwalletIDs = [];
  const sortedwalletNames = [];




  while (walletBalances.length != 0) {
    let peakindex = 0;
    for (let i=0; i < walletBalances.length; i++) {
      if (Number(walletBalances[i]) > Number(walletBalances[peakindex])) {
        peakindex = i; 
      }
    }

    sortedwalletBalances.push(walletBalances[peakindex]);
    sortedwalletIDs.push(walletIDs[peakindex]);
    sortedwalletNames.push(walletNames[peakindex]);
    walletBalances.splice(peakindex, 1);
    walletIDs.splice(peakindex, 1);
    walletNames.splice(peakindex, 1);

  }
  const leaderboard = document.getElementById("leaderboard");

  for (let i=0; i< sortedwalletBalances.length; i++) {

    leaderboard.innerHTML += `<div class="roww">
    <div class="namee">${sortedwalletNames[i]}</div><div class="scoree">${sortedwalletBalances[i]}</div>
    </div>
    `;

  }

  
}





async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");    
          document.getElementById("connectMessage").innerHTML =
          "Please connect to Metamask";
          document.getElementById("MetamaskBtn").innerHTML = "Metamask";
        } else {
          console.error(err);
        }
      });
    if (accounts[0]) {
      console.log("We have an account");
      document.getElementById("connectMessage").innerHTML =
      "Metamask connected";
      document.getElementById("MetamaskBtn").innerHTML = "Connected";
      staticProfileCheck();
    }
  } else {
    console.error("No web3 provider detected");
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask";
  }
}


document.getElementById("MetamaskBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const tweetSubmitButton = document.getElementById("MetamaskBtn");
  tweetSubmitButton.innerHTML = '<div class="spinner">🦊🦊🦊</div>';
  tweetSubmitButton.disabled = true;
  try {
    if (typeof accounts == 'undefined'){await connectWallet();} else{}
  } catch (error) {
    console.error("Error connecting to Metamask", error);
  } finally {
    tweetSubmitButton.disabled = false;
  }
    
});


document.getElementById("ProfileBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const accounts = await web3.eth.getAccounts();
  if (accounts.length == 0){alert('Must connect Metamask first.'); await connectWallet();} else{
  const ProfileButton = document.getElementById("ProfileBtn");
  ProfileButton.innerHTML = '<div class="spinner">🥺🥺🥺</div>';
  ProfileButton.disabled = true;
  try {
    if (await profiles_contract.methods.findUserIndex(accounts[0]).call() == -1) {
      let username = prompt("Please register a username. Usernames are public and final:", "King August (from madagascar)");
      if (await profiles_contract.methods.findStringIndex(username).call() > -1) {
        let newusername = prompt("Username taken, please try a different name. Usernames are public and final:", "King August (from madagascar)");
        while (await profiles_contract.methods.findStringIndex(newusername).call() > -1) {
          newusername = prompt("Username taken, please try a different name. Usernames are public and final:", "King August (from madagascar)");
        }
        await profiles_contract.methods.addUser(accounts[0], newusername).send({ from: accounts[0] });
        ProfileButton.innerHTML = 'Profile Set';
      } else{
        await profiles_contract.methods.addUser(accounts[0], username).send({ from: accounts[0] });
        ProfileButton.innerHTML = 'Profile Set';
      }
      
    } else{
      alert("Profile already registered!");
      ProfileButton.innerHTML = 'Profile Set';
    }
  } catch (error) {
    console.error("Error creating user profile", error);
  } finally {
    ProfileButton.disabled = false;
    if (ProfileButton.innerHTML == '<div class="spinner">🥺🥺🥺</div>'){
      ProfileButton.innerHTML = 'Add Profile';
    }
  }
}
});



async function staticProfileCheck() {
  const accounts = await web3.eth.getAccounts();
  if (await profiles_contract.methods.findUserIndex(accounts[0]).call() > -1) {
    document.getElementById("ProfileBtn").innerHTML = 'Profile Set';
  }
}



document.getElementById("FaucetBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const accounts = await web3.eth.getAccounts();
  if (accounts.length == 0) {
    alert('Must connect Metamask first.'); await connectWallet();
  } else {
    if (await profiles_contract.methods.findUserIndex(accounts[0]).call() == -1) {
      alert('Must create profile first.')
    } else {
      const faucetButton = document.getElementById("FaucetBtn");
      faucetButton.innerHTML = '<div class="spinner">🚰🚰🚰</div>';
      faucetButton.disabled = true;
      try {
      await faucet_contract.methods.requestTokens().send({ from: accounts[0] }); 
      faucetButton.innerHTML = 'Dripped💧';
      faucetButton.disabled = false;
      document.getElementById("leaderboard").innerHTML = "";
      createLeaderboard();

      } catch (error) {
        faucetButton.innerHTML = 'Faucet';
        faucetButton.disabled = false;
      }
    }
  }
});


var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


createLeaderboard();

connectWallet();



