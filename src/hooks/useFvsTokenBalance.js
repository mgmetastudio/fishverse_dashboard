import { useState, useEffect } from 'react';
import { useTokenActor } from './useActor';

export function useFvsTokenBalance(agent) {
    const [balance, setBalance] = useState(BigInt(0));    
    const fvsTokenActor =  useTokenActor(agent);

  useEffect(async () => {
    if (fvsTokenActor && agent) {
      let principal = await agent.getPrincipal();
      fvsTokenActor.icrc1_balance_of({owner: principal, subaccount: []}).then((value) => {
            setBalance(BigInt(value));
        }).catch((e) => {
            console.log("Error getting balance", e)
        })
    }
  }, [agent]);

  return balance;
}