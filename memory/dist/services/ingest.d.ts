export type EpisodicInsert = {
    id: string;
    ts: number;
    block_ref: object | null;
    kind: string;
    subject: object;
    payload: object;
    units?: object;
    source: object;
    provenance: object;
    confidence: number;
    refs: string[];
    hash?: string;
};
export declare function ingestEpisodic(obs: EpisodicInsert): void;
//# sourceMappingURL=ingest.d.ts.map