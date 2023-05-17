import { useNFTActor } from "../hooks/useActor";

export const getOwnedNFTWallet = async (agent, tokenTypeData) => {
    let wallet = [];
    const fishverse_ext =  useNFTActor(agent);
    if (tokenTypeData && Object.keys(tokenTypeData).length > 0 && agent && fishverse_ext) {
        return await fishverse_ext.walletOfOwner().then((result) => {
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

export const getReservedNFTWallet = async (agent, tokenTypeData) => {
    let wallet = [];
    const fishverse_ext = useNFTActor(agent);
    if (tokenTypeData && Object.keys(tokenTypeData).length > 0 && agent && fishverse_ext) {
        return fishverse_ext.reservedWalletOfOwner().then((result) => {
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