import styles from "./Status.module.sass";
import cn from "classnames";
import { Link } from "react-router-dom";
import Button from "../Button"
import Title from "../Title"


const StakingStats = () => {
    return (
            <div className={cn("section", styles.section)}>
                <div className={cn(styles.statisticsSection)}>
                    <Title>Staking statistics</Title>
                    <div className={cn(styles.statisticsContainer)}>
                        <div className={cn(styles.colum)}>
                            <p>Total staked amount</p>
                            <div className={cn(styles.price)}>
                                <h5 className={cn(styles.whitefont)}>0 FVS</h5>
                            </div>
                        </div>
                        <div className={cn(styles.colum)}>
                            <p>Avg. staking period</p>
                            <div className={cn(styles.price)}>
                                <h5 className={cn(styles.whitefont)}>0 days</h5>
                            </div>
                        </div>
                    </div>
                    <div className={cn(styles.statisticsBottom)}>
                        <div className={cn(styles.colum)}>
                            <p>Users last month profit</p>
                            <div className={cn(styles.price)}>
                                <h5 className={cn(styles.greenfont)}>0 FVS</h5>
                            </div>
                        </div>
                    </div>

                </div>
                <Link to="/stake-fvs">
                    <Button>Staking currently unavailable</Button>
                </Link>
            </div> 
    );
};

export default StakingStats;
