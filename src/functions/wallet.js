import { Principal } from "@dfinity/principal";
import { getNFTActor } from "./actor";


export const getOwnedNFTWallet = async (agent, principal, tokenTypeData) => {
    let wallet = [];
    const fishverse_ext =  getNFTActor(agent);
    const principalObj = Principal.fromText(principal);
    if (tokenTypeData && Object.keys(tokenTypeData).length > 0 && agent && fishverse_ext && principalObj) {
        return await fishverse_ext.walletOfOwner(principalObj).then((result) => {
            for (let i = 0; i < result.length; i++) {
                let tokenType = result[i]["tokenType"]
                let nft = tokenTypeData[tokenType];
                if (nft){
                    const newNft = { ...nft };
                    newNft.tokenId = result[i]["tokenId"]
                    newNft.tokenType = tokenType
                    wallet.push(newNft)
                }
            }   
            return wallet;
          });            
    }
    return wallet;
}

export const getReservedNFTWallet = async (agent, principal, tokenTypeData) => {
    let wallet = [];
    const fishverse_ext = getNFTActor(agent);
    const principalObj = Principal.fromText(principal);
    if (tokenTypeData && Object.keys(tokenTypeData).length > 0 && agent && fishverse_ext && principalObj) {
        return fishverse_ext.reservedWalletOfOwner(principalObj).then((result) => {
            let wallet = [];
            for (let i = 0; i < result.length; i++) {
                let tokenType = result[i]["tokenType"]
                let nft = tokenTypeData[tokenType];
                nft["tokenType"] = tokenType
                for (let y = 0; y < result[i]["quantity"]; y++) {
                    wallet.push(nft)
                }
            }
            return wallet;
        });
    }
    return wallet;
}