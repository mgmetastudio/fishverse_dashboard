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
    const tokenTypeDataDate = parseInt(localStorage.getItem("tokenTypeDataDate") ?? "0");
    const currentDate = Math.floor(Date.now() / 1000);
    const week = 60 * 60 * 24 * 7;
    if (currentDate - week < tokenTypeDataDate) {
      const tokenTypeDataCache = localStorage.getItem("tokenTypeData") ?? "{}";
      return JSON.parse(tokenTypeDataCache);
    }

    const agent = get(agentState);
    const fishverse_ext = getNFTActor(agent);
    if (fishverse_ext && agent) {
      return await fishverse_ext.getTokenTypeData().then((result) => {
        const tokenTypeDataDict = result.reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {})
        localStorage.setItem("tokenTypeDataDate", currentDate)
        localStorage.setItem("tokenTypeData", JSON.stringify(tokenTypeDataDict));
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

export const principalState = atom({
  key: 'principalState',
  default: "",
});