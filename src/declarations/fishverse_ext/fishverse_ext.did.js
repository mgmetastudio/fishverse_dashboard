export const idlFactory = ({ IDL }) => {
  const TokenIdentifier = IDL.Text;
  const AccountIdentifier = IDL.Text;
  const User = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier,
  });
  const AllowanceRequest = IDL.Record({
    'token' : TokenIdentifier,
    'owner' : User,
    'spender' : IDL.Principal,
  });
  const Balance__1 = IDL.Nat;
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : Balance__1, 'err' : CommonError });
  const SubAccount = IDL.Vec(IDL.Nat8);
  const Balance = IDL.Nat;
  const ApproveRequest = IDL.Record({
    'token' : TokenIdentifier,
    'subaccount' : IDL.Opt(SubAccount),
    'allowance' : Balance,
    'spender' : IDL.Principal,
  });
  const BalanceRequest = IDL.Record({
    'token' : TokenIdentifier,
    'user' : User,
  });
  const CommonError__1 = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const BalanceResponse = IDL.Variant({
    'ok' : Balance,
    'err' : CommonError__1,
  });
  const TokenIdentifier__1 = IDL.Text;
  const AccountIdentifier__1 = IDL.Text;
  const Result_5 = IDL.Variant({
    'ok' : AccountIdentifier__1,
    'err' : CommonError,
  });
  const User__1 = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier,
  });
  const Extension = IDL.Text;
  const TokenIndex = IDL.Nat32;
  const TokenType = IDL.Nat16;
  const TokenAttributes = IDL.Record({ 'key' : IDL.Text, 'value' : IDL.Text });
  const TokenTypeData = IDL.Record({
    'video' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'attributes' : IDL.Opt(IDL.Vec(TokenAttributes)),
    'details' : IDL.Text,
    'category' : IDL.Text,
    'rarity' : IDL.Text,
    'image' : IDL.Text,
  });
  const Metadata = IDL.Variant({
    'fungible' : IDL.Record({
      'decimals' : IDL.Nat8,
      'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'name' : IDL.Text,
      'symbol' : IDL.Text,
    }),
    'nonfungible' : IDL.Record({ 'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)) }),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'status_code' : IDL.Nat16,
  });
  const Result_4 = IDL.Variant({ 'ok' : TokenIndex, 'err' : CommonError });
  const Result_3 = IDL.Variant({ 'ok' : Metadata, 'err' : CommonError });
  const MintRequest = IDL.Record({
    'to' : User,
    'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'tokenType' : TokenType,
  });
  const ReserveRequest = IDL.Record({
    'to' : User,
    'quantity' : IDL.Nat32,
    'tokenType' : TokenType,
  });
  const TokenReservation = IDL.Record({
    'quantity' : IDL.Nat32,
    'tokenType' : TokenType,
  });
  const Result_1 = IDL.Variant({ 'ok' : TokenTypeData, 'err' : CommonError });
  const Result = IDL.Variant({ 'ok' : IDL.Nat16, 'err' : CommonError });
  const Memo = IDL.Vec(IDL.Nat8);
  const TransferRequest = IDL.Record({
    'to' : User,
    'token' : TokenIdentifier,
    'notify' : IDL.Bool,
    'from' : User,
    'memo' : Memo,
    'subaccount' : IDL.Opt(SubAccount),
    'amount' : Balance,
  });
  const TransferResponse = IDL.Variant({
    'ok' : Balance,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier,
      'Other' : IDL.Text,
    }),
  });
  const TokenWalletRecord = IDL.Record({
    'tokenId' : TokenIndex,
    'tokenType' : IDL.Opt(TokenType),
  });
  const fishverse_ext = IDL.Service({
    'acceptCycles' : IDL.Func([], [], []),
    'allowance' : IDL.Func([AllowanceRequest], [Result_2], ['query']),
    'approve' : IDL.Func([ApproveRequest], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'balance' : IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
    'bearer' : IDL.Func([TokenIdentifier__1], [Result_5], ['query']),
    'disribute' : IDL.Func([User__1], [], []),
    'extensions' : IDL.Func([], [IDL.Vec(Extension)], ['query']),
    'freeGift' : IDL.Func([AccountIdentifier__1], [IDL.Opt(TokenIndex)], []),
    'getAllowances' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Principal))],
        ['query'],
      ),
    'getBuyers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(AccountIdentifier__1, IDL.Vec(TokenIndex)))],
        ['query'],
      ),
    'getMinted' : IDL.Func([], [TokenIndex], ['query']),
    'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
    'getRegistry' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
        ['query'],
      ),
    'getSold' : IDL.Func([], [TokenIndex], ['query']),
    'getTokenTypeData' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenType, TokenTypeData))],
        ['query'],
      ),
    'getTokenTypes' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, TokenType))],
        ['query'],
      ),
    'getTokens' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'index' : IDL.Func([TokenIdentifier__1], [Result_4], ['query']),
    'initBaseTokenTypes' : IDL.Func([], [], []),
    'metadata' : IDL.Func([TokenIdentifier__1], [Result_3], ['query']),
    'mintNFT' : IDL.Func([MintRequest], [TokenIndex], []),
    'mintReservedNFT' : IDL.Func([TokenType], [TokenIndex], []),
    'reserveNFT' : IDL.Func([ReserveRequest], [], []),
    'reservedWalletOfOwner' : IDL.Func([], [IDL.Vec(TokenReservation)], []),
    'setMinter' : IDL.Func([IDL.Principal], [], []),
    'setTokenTypeData' : IDL.Func(
        [
          TokenType,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Vec(TokenAttributes)),
        ],
        [],
        [],
      ),
    'setTokenTypeImage' : IDL.Func([TokenType, IDL.Text], [], []),
    'supply' : IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
    'tokenData' : IDL.Func([TokenIdentifier__1], [Result_1], ['query']),
    'tokenIdentifier' : IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'tokenType' : IDL.Func([TokenIdentifier__1], [Result], ['query']),
    'transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
    'walletOfOwner' : IDL.Func([], [IDL.Vec(TokenWalletRecord)], []),
  });
  return fishverse_ext;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
