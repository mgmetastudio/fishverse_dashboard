import { useState } from "react";
import cn from "classnames";
import styles from "./Card.module.sass";
import Modal from "../Modal";
import { useNFTActor } from "../../hooks/useActor";
import { useRecoilState } from "recoil";
import { agentState, identityState, walletState } from "../../atoms";


const Item = ({ className, item, row, walletIndex }) => {
    const [identity] = useRecoilState(identityState);
    const [agent] = useRecoilState(agentState);
    const [wallet, setWallet] = useRecoilState(walletState)
    const [isClaiming, setIsClaiming] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const nftContract = useNFTActor(agent);

    const notOwnedItem = <button className="button" onClick={() => { claimItem(item.tokenType) }} disabled={isClaiming}>{isClaiming ? "Claiming item..." : "Claim item"}</button>;
    const ownedItem = <div className={styles.purchased}>Claimed</div>;

    const claimItem = async (tokenType) => {
        if (nftContract && agent) {
            setIsClaiming(true)
            nftContract.mintReservedNFT(tokenType)
                .then(async (tokenId) => {
                    let updatedWallet = wallet.map((value, index) => {
                        if (index === walletIndex){
                            value = {...value, tokenId: tokenId}
                        }
                        return value
                    })
                    setWallet(updatedWallet)
                    setIsClaiming(false)
                })
                .catch((e) => {
                    console.log("error on claiming item", tokenType, e)
                    setIsClaiming(false)
                })
        }
    };

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div className={styles.listInner}>
            <div className={cn(className, styles.card,)}
                onClick={() => setVisible(true)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <div className={styles.preview}>
                    <img srcSet={`${item.image} 2x`} src={item.image} alt="NFT" />
                    {item.categoryText && (
                        <div className={cn("category", { "category-green": item.category === "owned" }, styles.category)}>
                            {item.categoryText}
                        </div>
                    )}
                </div>
                <div className={isHovering ? styles.bodyTransform : styles.body}>
                    <div className={styles.line}>
                        <div className={styles.title}>{item.name} #{item.tokenId}</div>
                    </div>
                </div>

                <div className={isHovering ? styles.ExtraClassHover : styles.CardHoverButton}>
                    <div className={styles.CardHoverButtonLine}>
                        <div className={styles.CardHoverButtonText}>Show more details</div>
                    </div>
                </div>

            </div>
            <Modal visible={visible} onClose={() => setVisible(false)}>
                <div className={styles.modal}>
                    <div className={styles.modalLeft}>
                        <img className={styles.videoContainer} width={"100%"} loop={true} height={"initial"} src={item.image}/>
                    </div>
                    <div className={styles.modalRight}>
                        <div>
                            <div className={cn("rank", { "legendary": item.rarity === "Legendary" }, styles.rank)}>
                                {item.rarity}
                            </div>
                            <div className={styles.title}>{item.name}</div>
                            <div className={styles.description}>{item.description}</div>
                            <div className={styles.ownerContainer}>
                                <p>Owner</p>
                                <p>{identity?.getPrincipal().toText()}</p>
                            </div>
                            <div className={styles.instruction}>
                                <p>Your NFT details:</p>
                                <p>1. NFT container address - {process.env.EXT_CANISTER_ID}</p>
                                <p>2. NFT ID - {item.tokenId ?? "Claim to receive token ID"} </p>
                            </div>
                        </div>
                        <div>
                            {item.tokenId ? ownedItem : notOwnedItem}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Item;