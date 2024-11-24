// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBondingCurvePrecompile {
    function getPrice(uint256 currentSupply) external view returns (uint256 price);
    function getCost(uint256 currentSupply, uint256 tokensToBuy) external view returns (uint256 cost);
}
