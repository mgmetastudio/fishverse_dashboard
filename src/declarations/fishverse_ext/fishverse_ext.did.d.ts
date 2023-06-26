import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = string;
export type AccountIdentifier__1 = string;
export interface AllowanceRequest {
  'token' : TokenIdentifier,
  'owner' : User,
  'spender' : Principal,
}
export interface ApproveRequest {
  'token' : TokenIdentifier,
  'subaccount' : [] | [SubAccount],
  'allowance' : Balance,
  'spender' : Principal,
}
export type Balance = bigint;
export interface BalanceRequest { 'token' : TokenIdentifier, 'user' : User }
export type BalanceResponse = { 'ok' : Balance } |
  { 'err' : CommonError__1 };
export type Balance__1 = bigint;
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type CommonError__1 = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type Extension = string;
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
  'status_code' : number,
}
export type Memo = Uint8Array;
export type Metadata = {
    'fungible' : {
      'decimals' : number,
      'metadata' : [] | [Uint8Array],
      'name' : string,
      'symbol' : string,
    }
  } |
  { 'nonfungible' : { 'metadata' : [] | [Uint8Array] } };
export interface MintRequest {
  'to' : User,
  'metadata' : [] | [Uint8Array],
  'tokenType' : TokenType,
}
export interface ReserveRequest {
  'to' : User,
  'quantity' : number,
  'tokenType' : TokenType,
}
export type Result = { 'ok' : number } |
  { 'err' : CommonError };
export type Result_1 = { 'ok' : TokenTypeData } |
  { 'err' : CommonError };
export type Result_2 = { 'ok' : Balance__1 } |
  { 'err' : CommonError };
export type Result_3 = { 'ok' : Metadata } |
  { 'err' : CommonError };
export type Result_4 = { 'ok' : TokenIndex } |
  { 'err' : CommonError };
export type Result_5 = { 'ok' : AccountIdentifier__1 } |
  { 'err' : CommonError };
export type SubAccount = Uint8Array;
export interface TokenAttributes { 'key' : string, 'value' : string }
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export type TokenIndex = number;
export interface TokenReservation {
  'quantity' : number,
  'tokenType' : TokenType,
}
export type TokenType = number;
export interface TokenTypeData {
  'video' : [] | [string],
  'name' : string,
  'attributes' : [] | [Array<TokenAttributes>],
  'details' : string,
  'category' : string,
  'rarity' : string,
  'image' : string,
}
export interface TokenWalletRecord {
  'tokenId' : TokenIndex,
  'tokenType' : [] | [TokenType],
}
export interface TransferRequest {
  'to' : User,
  'token' : TokenIdentifier,
  'notify' : boolean,
  'from' : User,
  'memo' : Memo,
  'subaccount' : [] | [SubAccount],
  'amount' : Balance,
}
export type TransferResponse = { 'ok' : Balance } |
  {
    'err' : { 'CannotNotify' : AccountIdentifier } |
      { 'InsufficientBalance' : null } |
      { 'InvalidToken' : TokenIdentifier } |
      { 'Rejected' : null } |
      { 'Unauthorized' : AccountIdentifier } |
      { 'Other' : string }
  };
export type User = { 'principal' : Principal } |
  { 'address' : AccountIdentifier };
export type User__1 = { 'principal' : Principal } |
  { 'address' : AccountIdentifier };
export interface fishverse_ext {
  'acceptCycles' : ActorMethod<[], undefined>,
  'allowance' : ActorMethod<[AllowanceRequest], Result_2>,
  'approve' : ActorMethod<[ApproveRequest], undefined>,
  'availableCycles' : ActorMethod<[], bigint>,
  'balance' : ActorMethod<[BalanceRequest], BalanceResponse>,
  'bearer' : ActorMethod<[TokenIdentifier__1], Result_5>,
  'disribute' : ActorMethod<[User__1], undefined>,
  'extensions' : ActorMethod<[], Array<Extension>>,
  'freeGift' : ActorMethod<[AccountIdentifier__1], [] | [TokenIndex]>,
  'getAllowances' : ActorMethod<[], Array<[TokenIndex, Principal]>>,
  'getBuyers' : ActorMethod<[], Array<[AccountIdentifier__1, Uint32Array]>>,
  'getMinted' : ActorMethod<[], TokenIndex>,
  'getMinter' : ActorMethod<[], Principal>,
  'getRegistry' : ActorMethod<[], Array<[TokenIndex, AccountIdentifier__1]>>,
  'getSold' : ActorMethod<[], TokenIndex>,
  'getTokenTypeData' : ActorMethod<[], Array<[TokenType, TokenTypeData]>>,
  'getTokenTypes' : ActorMethod<[], Array<[TokenIndex, TokenType]>>,
  'getTokens' : ActorMethod<[], Array<[TokenIndex, Metadata]>>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'index' : ActorMethod<[TokenIdentifier__1], Result_4>,
  'initBaseTokenTypes' : ActorMethod<[], undefined>,
  'metadata' : ActorMethod<[TokenIdentifier__1], Result_3>,
  'mintNFT' : ActorMethod<[MintRequest], TokenIndex>,
  'mintReservedNFT' : ActorMethod<[TokenType], TokenIndex>,
  'reserveNFT' : ActorMethod<[ReserveRequest], undefined>,
  'reservedWalletOfOwner' : ActorMethod<[Principal], Array<TokenReservation>>,
  'setMinter' : ActorMethod<[Principal], undefined>,
  'setTokenTypeData' : ActorMethod<
    [
      TokenType,
      string,
      string,
      string,
      string,
      string,
      [] | [string],
      [] | [Array<TokenAttributes>],
    ],
    undefined
  >,
  'setTokenTypeImage' : ActorMethod<[TokenType, string], undefined>,
  'supply' : ActorMethod<[TokenIdentifier__1], Result_2>,
  'tokenData' : ActorMethod<[TokenIdentifier__1], Result_1>,
  'tokenIdentifier' : ActorMethod<[number], string>,
  'tokenType' : ActorMethod<[TokenIdentifier__1], Result>,
  'transfer' : ActorMethod<[TransferRequest], TransferResponse>,
  'walletOfOwner' : ActorMethod<[Principal], Array<TokenWalletRecord>>,
}
export interface _SERVICE extends fishverse_ext {}
