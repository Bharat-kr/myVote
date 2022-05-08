// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

/*** 
    Ballot Factory is basically the part where multiple ballots can be created
***/
contract BallotFactory {
    Ballot[] public deployedBallots;

    function createBallot(string memory name , string memory image) public {
        Ballot newBallot = new Ballot(name, msg.sender , image);
        deployedBallots.push(newBallot);
    }

    function getDeployedBallots() public view returns (Ballot[] memory) {
        return deployedBallots;
    }
}

/*** 
    Ballot is basically a new election between 2 or more candidates
***/
contract Ballot{
    //Ballot Properties
    string ballotName;
    string description;

    //bool to check voting started and finished
    bool votingStarted = false; //checks if voting has started
    bool votingFinished = false; //checks if voting has finished

    //Person schema
    struct Person {
        string name;
        address id;
        string image;
        uint256 votes;
    }
    //Vote schema
    struct Vote {
        address voterId;
        string name;
        address votedTo;
    }

    //manager
    Person public manager;

    //total no of participants in election
    uint256 numParticipants;
    Person[] public participants;

    //total no of voters
    uint256 totalNoOfVoters;

    //Votes map 
    Vote[] VotesMap;

    //constructor function to make a manager 
    constructor(string memory name ,address creator, string memory image){
        manager.name = name;
        manager.id = creator;
        manager.image = image;
        manager.votes = 0;
    }

    modifier onlyManager(){
        require(msg.sender == manager.id);
        _;
    }

    modifier canVote(){
        require(votingStarted && !votingFinished);
        _;
    }

    //Adding a participant in a ballot
    function addParticipant(string memory name ,address id , string memory image) public payable onlyManager{
        require(msg.value > 0.90 ether);
        Person memory r ;
        r.name = name;
        r.id = id;
        r.image = image;
        r.votes=0;
        participants.push(r);
        numParticipants++;
    }

    //function to get all the participants in particular election
    //this will also be used for getting totalVotes of a participant
    function getParticipants()public view returns(Person[] memory){
        return participants;
    }

    //function to vote a participant
    function vote(string memory name ,address participant) public payable canVote{
        require(msg.value > 0.50 ether);

        Vote memory val ;
        val.name = name;
        val.voterId = msg.sender;
        val.votedTo = participant;
        VotesMap.push(val);
        //inc the no. of votes of a participant
        for(uint i=0; i<participants.length ;i++){
            if(participants[i].id == participant){
                participants[i].votes++;
                break;
            }
        }
    }

    //to start voting in a ballot
    function startVoting() public onlyManager{
        votingStarted = true;
    }

    //to end voting in a ballot
    function finishVoting() public onlyManager{
        votingFinished = true;
    }
}