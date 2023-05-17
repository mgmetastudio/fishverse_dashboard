import cn from "classnames";
import styles from "./StakedSuccessfuly.module.sass";
import Popup from "../../../components/Popup"


const StakedSuccessfuly = (props) => {
    return (
        <Popup visible={props.visible}>
            <div className={cn('container', styles.stakedInner)}>
                <svg width="90" height="89" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="45" cy="44.5" r="44.5" fill="#323232"/>
                    <path d="M21 44L25.5 48.5L37 60L69 28" stroke="#B7F014" strokeWidth="5"/>
                </svg>
                <h3>Staked successfully</h3>
                <p>We just received your request for staking. It might take some time to show it on Your stakes section. <br />Welcome on board, hunter!</p>
                <a target="_blank" href={`${props.tnx}`}>View on explorer</a>
                <a href="/my-stakes" className={cn("button", styles.done)}>Done</a>
            </div>
        </Popup>
    );
};

export default StakedSuccessfuly;