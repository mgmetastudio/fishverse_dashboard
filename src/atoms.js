import { atom, selector } from "recoil";
import { getOwnedNFTWallet, getReservedNFTWallet } from "./functions/wallet";
import { getNFTActor } from "./functions/actor";


export const fetchWallet = selector({
  key: 'fetchWallet',
  get: async ({ get }) => {
    const agent = get(agentState);
    const tokenTypeData = get(fetchTokenTypeData);

    if (agent !== null && tokenTypeData) {
      const ownedNFTs = await getOwnedNFTWallet(agent, tokenTypeData)
      const reservedNFTs = await getReservedNFTWallet(agent, tokenTypeData)
      return ownedNFTs.concat(reservedNFTs);
    }
    return [];
  }
});

export const fetchTokenTypeData = selector({
  key: 'fetchTokenTypeData',
  get: async ({ get }) => {
    const agent = get(agentState);
    const fishverse_ext = getNFTActor(agent);

    if (fishverse_ext && agent) {
      return await fishverse_ext.getTokenTypeData().then((result) => {
        const tokenTypeDataDict = result.reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {})
        return tokenTypeDataDict;
      });
    }
    return {};
  },
});

export const tokenTypeDataState = atom({
  key: 'tokenTypeData',
  default: fetchTokenTypeData,
});

export const walletState = atom({
  key: 'walletState',
  default: fetchWallet,
});

export const identityState = atom({
  key: 'identityState',
  default: null,
});

export const agentState = atom({
  key: 'agentState',
  default: null,
});
