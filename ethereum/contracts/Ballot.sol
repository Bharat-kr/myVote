// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

/*** 
    Ballot Factory is basically the part where multiple ballots can be created
***/
contract BallotFactory {
    Ballot[] public deployedBallots;

    function createBallot(string memory creator , string memory image , string memory nameOfBallot , string memory description) public {
        Ballot newBallot = new Ballot(creator, msg.sender , image , nameOfBallot , description);
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
    string public ballotName;
    string public description;

    //bool to check voting started and finished
    bool public votingStarted = false; //checks if voting has started
    bool public votingFinished = false; //checks if voting has finished

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
        string aadharId;
        string name;
        address votedTo;
    }

    //manager
    Person public manager;

    //total no of participants in election
    uint256 numParticipants;
    Person[] public participants;

    //total no of voters
    uint256 public totalNoOfVoters;

    //Votes map 
    Vote[] VotesMap;

    //aadhar ids who have voted
    mapping(string => bool) public votedPeoples;

    //constructor function to make a manager 
    constructor(string memory creator ,address creatorId, string memory image , string memory nameOfBallot ,string memory desc){
        manager.name = creator;
        manager.id = creatorId;
        manager.image = image;
        manager.votes = 0;
        ballotName = nameOfBallot;
        description = desc;
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
    function vote(string memory name ,address participant , string memory aadhar) public payable canVote{
        require(!votedPeoples[aadhar]  , "You have already Voted!");
        require(msg.value >= 0.50 ether , "Send at least 0.50 ether!");

        Vote memory val ;
        val.name = name;
        val.voterId = msg.sender;
        val.aadharId = aadhar;
        val.votedTo = participant;
        VotesMap.push(val);
        //inc the no. of votes of a participant
        for(uint i=0; i<participants.length ;i++){
            if(participants[i].id == participant){
                participants[i].votes++;
                break;
            }
        }
        votedPeoples[aadhar] = true;
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