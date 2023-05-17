import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./SwapTokens.module.sass";
import { formatEther, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { calculateInputAmount, calculateOutputAmount } from "../../functions/swap";
import PopUp from "../../components/Popup";
import Verify from "./Confirmation/index";
import Title from "../../components/Title";

const fisher = <img height="20" src="/images/fisher-coin.png" />
const fvs = <img height="20" src="/images/fisher-coin.png" />

const SwapTokens = () => {
    const chainId = 0;
    const fvsBalance = BigNumber.from(0);
    const fishersBalance = BigNumber.from(0);
    const [visibleConfirm, setVisibleConfirm,] = useState(false);
    const [inputAmount, setInputAmount] = useState("0");
    const [outputAmount, setOutputAmount] = useState("0");
    const [swapDisabled, setSwapDisabled] = useState(false);
    const [swapConfirmed, setSwapConfirmed] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [arrow, setArrow] = useState(false);
    const [mhuntPrice, setMhuntPrice] = useState(null);
    let initialTokens = [
        { name: "FVS", balance: fvsBalance, icon: fvs },
        { name: "FISHERS", balance: fishersBalance, icon: fisher }
    ]
    const [tokens, setTokens] = useState(initialTokens)

    useEffect(() => {
        setTokens(initialTokens);
    }, [fvsBalance, fishersBalance]);

    useEffect(() => {
        if (parseFloat(outputAmount) < 500) {
            setErrorMessage("Swaping is currently unavailable")
        }
    }, [outputAmount]);

    const switchTokens = () => {
        setArrow(!arrow);
        setInputAmount("0");
        setOutputAmount("0");
    }

    async function swap() {};

    const changeInputAmount = (value) => {
        try {
            const amountBN = parseUnits(value, 18)
            setInputAmount(value)
            setErrorMessage("")
            setOutputAmount(arrow ? calculateInputAmount(huntersContract.address, value, chainId).toString() : calculateOutputAmount(mhuntContract.address, value, chainId).toString())
            if (amountBN.gt(fvsBalance)) {
                setErrorMessage("Not enough balance")
            }
            if (amountBN.eq(BigNumber.from(0))) {
                setErrorMessage("Staking currently unavailable")
            }
        } catch (error) {
            if (value == "") {
                setErrorMessage("Staking currently unavailable")
                setInputAmount(value)
            }
        }
    };

    const changeOutputAmount = (value) => {
        try {
            const amountBN = parseUnits(value, 18)
            setOutputAmount(value)
            setErrorMessage("")
            setInputAmount(arrow ? calculateOutputAmount(huntersContract.address, value, chainId).toString() : calculateInputAmount(mhuntContract.address, value, chainId).toString())
            if (amountBN.gt(fishersBalance)) {
                setErrorMessage("Not enough balance")
            }
            if (amountBN.eq(BigNumber.from(0))) {
                setErrorMessage("Staking currently unavailable")
            }
        } catch (error) {
            if (value == "") {
                setErrorMessage("Staking currently unavailable")
                setOutputAmount(value)
            }
        }
    };

    return (
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <Title>Swap tokens</Title>
                <div className={styles.swapContainer}>
                    <p>Swap</p>
                    <div className={styles.swapContainerInner}>
                        {!arrow ?
                            <div className={styles.swapContainerTop}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" placeholder="0" onChange={(e) => changeInputAmount(e.target.value)} value={inputAmount} />
                                    <div className={styles.mhunts}>{tokens[0].icon} {tokens[0].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}>$ {inputAmount > 0 ? mhuntPrice.toFixed(2) * inputAmount : '0'}</span>
                                    <span className={styles.BalancePrice}>Balance: {(formatEther(tokens[0].balance.toString()) * 1).toFixed(1)}  </span>
                                </div>
                            </div>
                            :
                            <div className={styles.swapContainerBottom}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" min="500" placeholder="500" onChange={(e) => changeOutputAmount(e.target.value)} value={outputAmount} />
                                    <div className={styles.mhunts}>{tokens[1].icon} {tokens[1].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}></span>
                                    <span className={styles.BalancePrice}>Balance: {(formatEther(tokens[1].balance.toString()) * 1).toFixed(1)} </span>
                                </div>
                            </div>
                        }

                        <div className={styles.swapArrow} >
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { switchTokens() }}>
                                <rect x="0.5" y="0.5" width="37" height="37" rx="7.5" fill="#0D5590" stroke="#0D5590" />
                                <path d="M18.2929 26.7071C18.6834 27.0976 19.3166 27.0976 19.7071 26.7071L26.0711 20.3431C26.4616 19.9526 26.4616 19.3195 26.0711 18.9289C25.6805 18.5384 25.0474 18.5384 24.6569 18.9289L19 24.5858L13.3431 18.9289C12.9526 18.5384 12.3195 18.5384 11.9289 18.9289C11.5384 19.3195 11.5384 19.9526 11.9289 20.3431L18.2929 26.7071ZM18 11L18 26L20 26L20 11L18 11Z" fill="white" />
                            </svg>
                        </div>
                        {!arrow ?
                            <div className={styles.swapContainerBottom}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" min="500" placeholder="500" onChange={(e) => changeOutputAmount(e.target.value)} value={outputAmount} />
                                    <div className={styles.mhunts}>{tokens[1].icon} {tokens[1].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}></span>
                                    <span className={styles.BalancePrice}>Balance: {(formatEther(tokens[1].balance.toString()) * 1).toFixed(1)} </span>
                                </div>
                            </div>
                            :
                            <div className={styles.swapContainerTop}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" placeholder="0" onChange={(e) => changeInputAmount(e.target.value)} value={inputAmount} />
                                    <div className={styles.mhunts}>{tokens[0].icon} {tokens[0].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}>$ {inputAmount > 0 ? mhuntPrice.toFixed(2) * inputAmount : '0'}</span>
                                    <span className={styles.BalancePrice}>Balance: {(formatEther(tokens[0].balance.toString()) * 1).toFixed(1)}  </span>
                                </div>
                            </div>
                        }
                        <div className={cn(styles.swapContainerFoot)}>
                            <div className={styles.swapOutterContainerInfo}>
                                <div className={styles.InfoContainerInnerRow}>
                                    <span className={styles.infoBlockTextColor}>Minimum received</span>
                                    <span>{outputAmount > 0 ? Math.floor(!arrow ? outputAmount : inputAmount) : 0} {!arrow ? 'FISHERS' : 'FVS'}</span>
                                </div>
                                <div className={styles.InfoContainerInnerRow}>
                                    <span className={styles.infoBlockTextColor}>Min. FISHERS to swap</span>
                                    <span>500</span>
                                </div>
                                <div className={styles.InfoContainerInnerRow}>
                                    <span className={styles.infoBlockTextColor}>Service fee</span>
                                    <span>4%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className={cn('button', styles.swapButton)} disabled={true}>Comming soon</button>
                </div>
            </div>
            {/* Popup to put on sale */}
            <PopUp visible={visibleConfirm} onClose={() => setVisibleConfirm(false)}>
                <div className={cn(styles.popContainer)}>
                    <h4>Confirm swap</h4>
                    <div className={cn(styles.popContainerBody)}>
                        {!arrow ?
                            <div className={styles.swapContainerTop}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" min="500" placeholder="0" onChange={(e) => changeInputAmount(e.target.value)} value={inputAmount} />
                                    <div className={styles.mhunts}>{tokens[0].icon} {tokens[0].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}></span>
                                </div>
                            </div> :
                            <div className={styles.swapContainerBottom}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" min="500" placeholder="0" onChange={(e) => changeOutputAmount(e.target.value)} value={outputAmount} />
                                    <div className={styles.mhunts}>{tokens[1].icon} {tokens[1].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}></span>
                                </div>
                            </div>
                        }
                        <div className={styles.swapArrow} >
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { switchTokens() }} style={arrow ? { transform: "rotate(180deg)" } : null}>
                                <rect x="0.5" y="0.5" width="37" height="37" rx="7.5" fill="#323232" stroke="#323232" />
                                <path d="M18.2929 26.7071C18.6834 27.0976 19.3166 27.0976 19.7071 26.7071L26.0711 20.3431C26.4616 19.9526 26.4616 19.3195 26.0711 18.9289C25.6805 18.5384 25.0474 18.5384 24.6569 18.9289L19 24.5858L13.3431 18.9289C12.9526 18.5384 12.3195 18.5384 11.9289 18.9289C11.5384 19.3195 11.5384 19.9526 11.9289 20.3431L18.2929 26.7071ZM18 11L18 26L20 26L20 11L18 11Z" fill="white" />
                            </svg>
                        </div>
                        {!arrow ?
                            <div className={styles.swapContainerBottom}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" min="500" placeholder="0" onChange={(e) => changeOutputAmount(e.target.value)} value={outputAmount} />
                                    <div className={styles.mhunts}>{tokens[1].icon} {tokens[1].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}></span>
                                </div>
                            </div> :
                            <div className={styles.swapContainerTop}>
                                <div className={styles.swapContainerTopInner}>
                                    <input className={styles.tokensAmount} type="number" min="500" placeholder="0" onChange={(e) => changeInputAmount(e.target.value)} value={inputAmount} />
                                    <div className={styles.mhunts}>{tokens[0].icon} {tokens[0].name}</div>
                                </div>
                                <div className={styles.swapContainerBottomInner}>
                                    <span className={styles.BalancePrice}></span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={cn(styles.popContainerFoot)}>
                        <div className={styles.swapContainerInfo}>
                            <div className={styles.InfoContainerInnerRow}>
                                <span>Price</span>
                                <span>{outputAmount > 0 ? arrow ? outputAmount : inputAmount : 0} {arrow ? 'FISHERS' : 'FVS'}</span>
                            </div>
                            <div className={styles.InfoContainerInnerRow}>
                                <span>Minimum received</span>
                                <span>{outputAmount > 0 ? Math.floor(!arrow ? outputAmount : inputAmount) : 0} {!arrow ? 'FISHERS' : 'FVS'}</span>
                            </div>
                            <div className={styles.InfoContainerInnerRow}>
                                <span>Fee</span>
                                <span>{outputAmount > 0 ? Math.ceil(!arrow ? outputAmount * 0.0416 : inputAmount * 0.0416) : 0} {!arrow ? 'FISHERS' : 'FVS'}</span>
                            </div>
                        </div>
                        <button className={cn('button', styles.swapButtonActive)} onClick={() => { swap() }}>Swap</button>
                    </div>
                </div>
            </PopUp>
            <Verify swapConfirmed={swapConfirmed} setVisibleConfirm={swapDisabled} swapping={`Swapping ${outputAmount > 0 ? arrow ? outputAmount : inputAmount : 0} ${arrow ? 'FISHERS' : 'FVS'} for ${outputAmount > 0 ? Math.floor(!arrow ? outputAmount : inputAmount) : 0} ${!arrow ? 'FISHERS' : 'FVS'}`} />
        </div>);
};

export default SwapTokens;
