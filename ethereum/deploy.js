const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "fit crumble camp income patient swim split picture lumber naive suggest ensure",
  "https://rinkeby.infura.io/v3/7e89bf1f980e4f17acb9e26168da8701"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = web3.eth.getAccounts();

  console.log("attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
    })
    .send({ gas: "10000000", from: accounts[0] });

  console.log("Contract successfully deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
