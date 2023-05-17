
import { Actor, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

import { idlFactory as fishverseExtFactory} from '../declarations/fishverse_ext/fishverse_ext.did.js';
import { idlFactory as ircLedgerFactory} from '../declarations/icrc1_ledger/icrc1_ledger.did.js';


export const useCanisterActor = (canister, idlFactory, agent) => {
    let canisterId = canister ?? "";
    if (agent === undefined){
        agent = new HttpAgent();
    }
    return Actor.createActor(idlFactory, {agent, canisterId});
}

export function useTokenActor(agent) {
    return useCanisterActor(process.env.ICRC1_LEDGER_CANISTER_ID, ircLedgerFactory, agent)
}

export function useNFTActor(agent) {
    return useCanisterActor(process.env.EXT_CANISTER_ID, fishverseExtFactory, agent)
}


