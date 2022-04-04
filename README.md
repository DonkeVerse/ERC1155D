# ERC1155D

An implementation of ERC1155D, a record setter for minting and transfer gas efficiency.

This contract is in alpha stage and has not been audited yet. This is only to demonstrate how the functionality works. Production use is not recommended!

# Usage

The ERC1155D contract is a gas efficient NFT contract. An _alternative to ERC721_. It is intended to **only** be used for 1/1 NFT's (supply of 1) and **does not support tokens with supply greater than 1**.

To use the ERC1155D contract in your project, copy `contracts/ERC1155D.sol` to your project. Then, you can import it, and write an implementation that extends the contract as `is ERC1155`

NOTE: ERC1155D does not maintain tokenID enumeration. You will need to implement a counter for it in your contract, similar to `supply` in the example below.

### example:

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ERC1155D.sol";

/**
 * @title ERC1155D example implementation
 */
contract Example is ERC1155 {
    uint256 public supply; // tokenID's

    constructor(string memory uri) ERC1155(uri) {}

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(address to, uint256 id) public {
      // amount is always 1    memory bytes, required param for IERC1155
      //                \       /
      //                 \     /
        _mint(to, supply, 1, '');
        supply++;
    }

```

# Tests

This repo inherits the ERC1155 unit tests (hardhat-truffle) from the official OpenZeppelin contract tests. To run the tests:

- install the dependencies with `yarn` or `npm install`
- Run `npx hardhat test tests/ERC1155.test.js`

# Maximally efficient Implementation
This is more for vanity metrics, but it is possible to acheive 50,434 gas with the following code. This eliminates the fallback function due to the function selector being all zeros, so if anyone sends ether directly to your contract, the transaction will revert.

```solidity
pragma solidity 0.8.13;

contract ExampleMint {

    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant PRICE = 0.01 ether;
    uint256 private index = 1;
    address[MAX_SUPPLY] _owners;
    event TransferSingle(address, address, address, uint256, uint256);

    function mint_efficient_1268F998() external payable {
        require(msg.value == PRICE, "wrong price");
        uint256 _index = index;
        require(_index < MAX_SUPPLY, "supply limit");

        emit TransferSingle(msg.sender, address(0), msg.sender, _index, 1);
        assembly {
            sstore(_owners.slot, caller())
        }

        unchecked {
            _index++;
        }
        index = _index;
    }
}
```
