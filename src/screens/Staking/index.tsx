import {useState} from 'react';
import styles from "./Staking.module.sass";
import StakedSuccessfuly from "./StakedSuccessfuly";
import cn from "classnames";
import { Link } from "react-router-dom";
import Title from "../../components/Title"


const StakingMain = () => {
    const [amount, setAmount] = useState<string>('');
    const [stakePeriodMonths, setStakePeriodMonths] = useState<number>(6);
    const [stakeTnx, setStakeTnx] = useState("");
    const [visible, setVisible] = useState(false);
    const textStaking = 
    <div>
        <h5>Why to stake?</h5>
        <p>Staking available on all chains where fvs is deployed (BNB, Polygon, OKC).</p>
        <p>Stake for longer period and enjoy huge rewards, up to 81% APY.</p>
        <p>No minimum or maximum amount fvs amount to stake.</p>
        <p>Stake from 6000 fvs for 6 months or more, to receive NFT badge. Badge rarity depends on staked amount. <a href="#" rel="noreferrer" target="_blank">Learn more</a></p>
        <p>Each staked 1000 fvs for 3 month or more = 1 FishVerse WL lottery ticked. <button>Learn more - coming soon</button></p>
        <p>Each staked 500 fvs for 3 month or more = 1 FishVerse Prime Mystery box lottery ticked. <button>Learn more - coming soon</button></p>
        <p>Each staked 3000 fvs for 3 month or more = 1 FishVerse NFT Beta season pass. <button>Learn more - coming soon</button></p>
        <p>NFT Beta season pass is being distributed within 24 hours after you staked. Fisher's Badges and Lottery tickets are still on process for distribution. You can check your NFTs <Link to="/wallet" >here</Link>. Please note to check connected network. Some NFTs are on BNB network. </p>
    </div>

    const [APY, longBonusPercent] = [0, 0];

    const RewardAlphaInvitation = stakePeriodMonths >= 3 ? ((Math.floor(Number(amount) / 3000)) + (Math.floor(Number(amount) / 3000)) * Math.floor(APY / 100)) : 0;
    const RewardMysteryBox = stakePeriodMonths >= 3 ? ((Math.floor(Number(amount) / 500)) + (Math.floor(Number(amount) / 300)) * Math.floor(APY / 100)) : 0;
   
    const changeAmount = (value: any) => {
        setAmount(value)
    };

    const changeStakeMonths = (value: any) => {
        setStakePeriodMonths(value)
    };

    return (
        <>
            <div className={cn("section", styles.section)}>
                <div className={cn("container", styles.container)}>
                    <div className={cn(styles.innerContainer)}>
                        <Title>Staking</Title>
                        <div className={cn(styles.innerLeft)}>
                            <h5>Duration</h5>
                            <div className={cn(styles.radio)}>
                                <label className={stakePeriodMonths === 6 ? cn(styles.activeButton) : cn(styles.inactiveButton)} onClick={() => {
                                    setStakePeriodMonths(6)
                                }}>
                                    <input type="radio" name="test" id="option1" autoComplete="off"/>
                                    <span className="checkmark"></span>
                                    <p>6 Months</p>
                                </label>
                                <label className={stakePeriodMonths === 24 ? cn(styles.activeButton) : cn(styles.inactiveButton)} onClick={() => {
                                    setStakePeriodMonths(24)
                                }}>
                                    <input type="radio" name="test" id="option1" autoComplete="off"/>
                                    <span className="checkmark"></span>
                                    <p>24 Months</p>
                                </label>
                                <label className={stakePeriodMonths === 60 ? cn(styles.activeButton) : cn(styles.inactiveButton)} onClick={() => {
                                    setStakePeriodMonths(60)
                                }}>
                                    <input type="radio" name="test" id="option1" autoComplete="off"/>
                                    <span className="checkmark"></span>
                                    <p>60 Months</p>
                                </label>
                                <label className={stakePeriodMonths === 120 ? cn(styles.activeButton) : cn(styles.inactiveButton)} onClick={() => {
                                    setStakePeriodMonths(120)
                                }}>
                                    <input type="radio" name="test" id="option1" autoComplete="off"/>
                                    <span className="checkmark"></span>
                                    <p>120 Months</p>
                                </label>
                            </div>
                            <div className={cn(styles.inputContainer)}>
                                <input placeholder='Enter stake lock period'
                                    onChange={e => changeStakeMonths(e.target.value)}
                                    value={stakePeriodMonths}/>
                                <span className={cn(styles.inputAbsolute)}>Months</span>
                            </div>
                            <div className={cn(styles.longTerm)}>Long term bonus:<span>{longBonusPercent.toFixed(2)}%</span></div>
                            <h5>Amount</h5>
                            <div className={cn(styles.inputContainer)}>
                                <input placeholder='Enter stake amount'
                                    onChange={e => changeAmount(e.target.value)}
                                    value={amount}
                                />
                                <div className={cn(styles.inputAbsolute)}><span>FVS</span><span
                                    className={cn(styles.greenColor)}>MAX</span>
                                </div>
                            </div>
                            <div className={cn(styles.infoBoxContainer)}>
                                {textStaking}
                            </div>
                        </div>
                    </div>
                    <div className={cn(styles.summaryContainer)}>
                        <Title>Staking summary</Title>
                        <div className={cn(styles.innerRight)}>
                            <div className={cn(styles.innerTopContainer)}>
                                <h4 className={cn(styles.h4)}>Estimated Venture Yield</h4>
                                <div className={cn(styles.dataContainer)}>
                                    <div>
                                        <h5>Estimated fvs rewards<span className={cn(styles.questionMark)}>?</span></h5>
                                        <div>0 fvs</div>
                                    </div>
                                    <div>
                                        <h5>Total rewards %<span className={cn(styles.questionMark)}>?</span></h5>
                                        <div>0 %</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cn(styles.innerBottomContainer)}>
                                <h4 className={cn(styles.h4)}>Estimated Long term Yield</h4>
                                <div className={cn(styles.dataContainer)}>
                                    <div>
                                        <h5>Estimated reward<span className={cn(styles.questionMark)}>?</span></h5>
                                        <div>0</div>
                                    </div>
                                    <div>
                                        <h5>Total rewards %<span className={cn(styles.questionMark)}>?</span></h5>
                                        <div>0 %</div>
                                    </div>
                                </div>
                                <h4 className={cn(styles.h4)}>Total Yield</h4>
                                <div className={cn(styles.dataContainer)}>
                                    <div>
                                        <h5>Total reward<span className={cn(styles.questionMark)}>?</span></h5>
                                        <div>0 fvs</div>
                                    </div>
                                    <div>
                                        <h5>Estimated APR<span className={cn(styles.questionMark)}>?</span></h5>
                                        <div>0 %</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.innerBottomContainer}>
                            <h4 className={cn(styles.h4)}>Additional rewards</h4>
                                <div className={cn(styles.dataContainer)}>
                                    <div>
                                        <h5>NFT Beta season pass</h5>
                                        <div>{RewardAlphaInvitation}</div>
                                    </div>
                                    <div>
                                        <h5>NFT essential mystery box tickets</h5>
                                        <div>{RewardMysteryBox}</div>
                                    </div>
                                </div>
                            </div>

                            <button className={cn('button', styles.buttonConfirm)}>Comming soon</button>
                        </div>
                    </div>
                    <div className={cn(styles.infoBoxContainerMobile)}>
                        {textStaking}
                    </div>
                </div>
                <div className={cn(styles.statisticsSection)}>
                    <Title>Staking statistics</Title>
                    <div className={cn(styles.statisticsContainer)}>
                        <div className={cn(styles.colum)}>
                            <p>Total staked amount</p>
                            <div className={cn(styles.price)}>
                                <h5 className={cn(styles.whitefont)}>0 fvs</h5>
                            </div>
                        </div>
                        <div className={cn(styles.colum)}>
                            <p>Avg. staking period</p>
                            <div className={cn(styles.price)}>
                                <h5 className={cn(styles.whitefont)}>0 days</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StakedSuccessfuly visible={visible} setVisible={setVisible} tnx={stakeTnx} />
        </>
    );
};

export default StakingMain;

