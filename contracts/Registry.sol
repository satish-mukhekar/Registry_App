// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Registry is ERC20 {
    address public immutable owner;

    struct User {
        string name;
        uint256 age;
        string city;
        bool status;
        bool exists;
    }

    mapping(address => User) public users;

    event UserRegistered(
        address indexed user,
        string name,
        uint256 age,
        string city,
        bool status
    );
    event UserStatusUpdated(address indexed user, bool status);

    error NotOwner();
    error InvalidAge();
    error SenderNotAllowed();
    error ReceiverNotAllowed();

    constructor(uint256 initialSupply) ERC20("testtoken", "TT") {
        owner = msg.sender;
        _mint(owner, initialSupply * 10 ** decimals());
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function userRegister(
        string calldata name,
        uint256 age,
        string calldata city,
        bool status
    ) external returns (bool) {
        if (age < 20) revert InvalidAge();

        users[msg.sender] = User({
            name: name,
            age: age,
            city: city,
            status: status,
            exists: true
        });

        emit UserRegistered(msg.sender, name, age, city, status);
        return true;
    }

    function changeUserStatus(address userAddr, bool status)
        external
        onlyOwner
    {
        users[userAddr].status = status;
        emit UserStatusUpdated(userAddr, status);
    }

    /**
     * @dev Transfer restrictions:
     * - Mint & burn allowed
     * - Owner can send without registration
     * - Non-owner sender must be registered & active
     * - Receiver must be registered & active
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override {
        // Allow mint & burn
        if (from == address(0) || to == address(0)) {
            super._update(from, to, amount);
            return;
        }

        // Sender check (except owner)
        if (from != owner) {
            if (!users[from].exists || !users[from].status) {
                revert SenderNotAllowed();
            }
        }

        // Receiver check
        if (!users[to].exists || !users[to].status) {
            revert ReceiverNotAllowed();
        }

        super._update(from, to, amount);
    }
}