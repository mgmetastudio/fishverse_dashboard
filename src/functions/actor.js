
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as fishverseExtFactory} from '../declarations/fishverse_ext/fishverse_ext.did.js';
import { idlFactory as ircLedgerFactory} from '../declarations/icrc1_ledger/icrc1_ledger.did.js';


export const getCanisterActor = (canister, idlFactory, agent) => {
    let canisterId = canister ?? "";
    return Actor.createActor(idlFactory, {agent, canisterId});
}

export function getTokenActor(agent) {
    return getCanisterActor(process.env.ICRC1_LEDGER_CANISTER_ID, ircLedgerFactory, agent)
}

export function getNFTActor(agent) {
    return getCanisterActor(process.env.EXT_CANISTER_ID, fishverseExtFactory, agent)
}