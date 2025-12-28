export type BlockRef = {
    chain_id: number;
    block_number: number;
    block_hash?: string;
};
export type SourceMeta = {
    system: string;
    version: string;
};
export type Provenance = {
    origin: "onchain" | "offchain";
    feed?: string;
};
//# sourceMappingURL=common.d.ts.map