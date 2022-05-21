import Ballot from "../ethereum/build/Ballot.json";

export const getDetails = async (web3, id) => {
  var instance = new web3.eth.Contract(Ballot.abi, id);
  const name = await instance.methods.ballotName().call();
  const description = await instance.methods.description().call();
  const manager = await instance.methods.manager().call();
  return { name, description, manager };
};
