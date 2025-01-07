// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    // Enum for gender
    enum Gender {
        Male,
        Female,
        Other
    }

    // User struct
    struct User {
        string name;
        uint8 age;
        Gender gender;
        string description;
        string url;
    }

    // Mapping to store active users by their address
    mapping(address => User) private activeUsers;

    // Array to store the list of user addresses
    address[] private userAddresses;

    // Event to notify when a user is added or updated
    event UserAddedOrUpdated(
        address indexed userAddress,
        string name,
        uint8 age,
        Gender gender
    );

    // Function to add or update a user
    function addOrUpdateUser(
        string memory _name,
        uint8 _age,
        Gender _gender,
        string memory _description,
        string memory _url
    ) public {
        require(_age > 17, "Age must be greater than 17");

        // Add or update the user
        activeUsers[msg.sender] = User(
            _name,
            _age,
            _gender,
            _description,
            _url
        );

        // Emit the event
        emit UserAddedOrUpdated(msg.sender, _name, _age, _gender);
    }

    // Function to get current user details
    function getMyDetails()
        public
        view
        currentUserExists
        returns (
            string memory name,
            uint8 age,
            Gender gender,
            string memory description,
            string memory url
        )
    {
        User memory user = activeUsers[msg.sender];
        return (user.name, user.age, user.gender, user.description, user.url);
    }

    // Function to delete a user
    function deleteUser() public currentUserExists {
        // Delete the user
        delete activeUsers[msg.sender];
    }

    // Function to get users by gender
    function getUsersByGender(
        Gender _gender
    ) public view returns (User[] memory) {
        uint256 totalUsers = userAddresses.length;
        uint256 count = 0;

        // Count how many users match the given gender
        for (uint256 i = 0; i < totalUsers; i++) {
            if (activeUsers[userAddresses[i]].gender == _gender) {
                count++;
            }
        }

        // Create a new array for the filtered users
        User[] memory filteredUsers = new User[](count);
        uint256 index = 0;

        // Add users of the specified gender to the array
        for (uint256 i = 0; i < totalUsers; i++) {
            if (activeUsers[userAddresses[i]].gender == _gender) {
                filteredUsers[index] = activeUsers[userAddresses[i]];
                index++;
            }
        }

        return filteredUsers;
    }


    

    modifier currentUserExists() {
        require(
            bytes(activeUsers[msg.sender].name).length > 0,
            "User does not exist"
        );
        _;
    }
}
