import { FVS_ADDRESS } from "../constants/addresses";
import { HUNDRED_PERCENT_BP, FVS_SALT_FEE, FVS_SALT_SWAP_RATE } from "../constants/marketplace";


export function calculateOutputAmount(inputToken, amount, chainId) {
    const rate = FVS_SALT_SWAP_RATE[chainId]
    const fee = FVS_SALT_FEE[chainId]
    let toAmount;

    if (inputToken === FVS_ADDRESS[chainId]){
        toAmount = amount * rate / HUNDRED_PERCENT_BP
    } else {
        toAmount = amount * HUNDRED_PERCENT_BP / rate
    }
    return toAmount * (HUNDRED_PERCENT_BP - fee) / HUNDRED_PERCENT_BP
}

export function calculateInputAmount(inputToken, amount, chainId) {
    const rate = FVS_SALT_SWAP_RATE
    const fee = FVS_SALT_FEE
    let toAmount;

    amount = amount / (HUNDRED_PERCENT_BP - fee) * HUNDRED_PERCENT_BP

    if (inputToken === FVS_ADDRESS[chainId]){
        toAmount = amount * HUNDRED_PERCENT_BP / rate
    } else {
        toAmount = amount * rate / HUNDRED_PERCENT_BP
    }
    
    return toAmount
}