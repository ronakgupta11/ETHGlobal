// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//  0x8c2AbD93aD52E9e9641FD6Eed324Ba2AAc99f3a2

contract Platform{
        address owner;
        uint id;

        constructor(){
            owner = msg.sender;
            id = 0;

        }

        event CourseCreated(uint courseId,uint price,string name, string description ,string videoUrl, string imageUrl);
        event CoursePurchase(address buyer, uint courseId);
        
        struct Course{
        address owner;
        uint id;
        uint price;
        string name;
        string description;
        string VideoUrl;
        string imageUrl;
        
    }
    Course[] public courses;


    mapping(address => uint) public ownerToRevenue;
    mapping (address  => uint[]) public learnerToCourseId;


    function  buy(uint _id) public payable{
        require(msg.value >= courses[_id].price,"sent value is less than price" );
        ownerToRevenue[courses[_id].owner] += msg.value;
        learnerToCourseId[msg.sender].push(_id);
        emit CoursePurchase(msg.sender,_id);


    }
    function listCourse(uint _price,string memory _name, string memory _description ,string memory _videoUrl, string memory _imageUrl) public{
        uint courseId = id;
        courses.push(Course(msg.sender,courseId,_price,_name,_description,_videoUrl,_imageUrl));
        id++;

        //emit event productCreated
        emit CourseCreated(courseId,_price,_name,_description,_videoUrl,_imageUrl);
    }

    function viewMyCourses() public view returns(uint[] memory){
        return learnerToCourseId[msg.sender];
    }

    function viewMyBalance() public view returns(uint){
        return ownerToRevenue[msg.sender];

    }
    function viewMapLearner(address learner) public view returns( uint[] memory) {
        require(msg.sender == owner,"you are not owner");
        return learnerToCourseId[learner];



    }

    



}