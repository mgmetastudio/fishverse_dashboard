import {Token} from "@sushiswap/core-sdk";

export const FVS_ADDRESS = process.env.ICRC1_LEDGER_CANISTER_ID ?? ""
export const NFT_ADDRESS = process.env.EXT_CANISTER_ID ?? ""

export function getFvsToken(): Token {
  return new Token(1, FVS_ADDRESS, 18, 'FVS', 'FishVerse Token')
}

export function getFisherToken(): Token {
  return new Token(1, NFT_ADDRESS, 18, 'FISHERS', 'FishVerse Reward Token')
}