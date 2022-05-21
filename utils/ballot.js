import Ballot from "../ethereum/build/Ballot.json";

//details for ballot card
export const getDetails = async (web3, id) => {
  var instance = new web3.eth.Contract(Ballot.abi, id);
  const name = await instance.methods.ballotName().call();
  const description = await instance.methods.description().call();
  const manager = await instance.methods.manager().call();
  return { name, description, manager };
};

//details for particular ballot page
export const getAllDetails = async (instance) => {
  const name = await instance.methods.ballotName().call();
  const description = await instance.methods.description().call();
  const manager = await instance.methods.manager().call();
  const votingStarted = await instance.methods.votingStarted().call();
  const votingFinished = await instance.methods.votingFinished().call();
  const participants = await instance.methods.getParticipants().call();
  return {
    name,
    description,
    manager,
    votingStarted,
    votingFinished,
    participants,
  };
};
