import { HttpAgent } from "@dfinity/agent";


export const getHttpAgent = async (agentOptions) => {
    const host = process.env.DFX_NETWORK === "ic" ? 'https://icp-api.io' : undefined;
    const agent = new HttpAgent({ ...agentOptions, host });
    if (process.env.DFX_NETWORK !== "ic") {
        await agent.fetchRootKey().catch(err => {
            console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
            console.error(err);
        });
    }
    return agent
}

export const getInternetIdentityUrl = () => {
    if (process.env.DFX_NETWORK === "local") {
        return `http://localhost:4943/?canisterId=${process.env.II_CANISTER_ID}`;
    } else if (process.env.DFX_NETWORK === "ic") {
        return `https://identity.ic0.app/`;
    } else {
        return `https://${process.env.II_CANISTER_ID}.dfinity.network`;
    }
}