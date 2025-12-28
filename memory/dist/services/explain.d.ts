type EpisodicRow = {
    id: string;
    ts: number;
    block_ref: string | null;
    kind: string;
    subject: string;
    payload: string;
    units: string | null;
    source: string;
    provenance: string;
    confidence: number;
    refs: string;
    hash: string | null;
};
export declare function explainEpisodic(id: string): {
    root: EpisodicRow;
    refs: EpisodicRow[];
} | null;
export {};
//# sourceMappingURL=explain.d.ts.map