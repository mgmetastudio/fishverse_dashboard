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