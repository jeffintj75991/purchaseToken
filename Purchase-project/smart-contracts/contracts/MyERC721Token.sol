// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721Token is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
     require(bytes(name).length > 0, "Name cannot be empty");
    require(bytes(symbol).length > 0, "Symbol cannot be empty");
    }

    function mint(address to, uint256 tokenId) public  {
        _mint(to, tokenId);
    }
}

