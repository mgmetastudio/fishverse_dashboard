export interface NFT {
    id: number;
    name: string;
    description: string;
    rarity: string;
    category: string;
    image: string;
    animation: string;
    content_ipfs: string;
    contract?: string;
    tokenId?: number;
    isReserved?: boolean;
    isBox?: boolean;
    isOpened?: boolean;
    isVirtual?: boolean;
}