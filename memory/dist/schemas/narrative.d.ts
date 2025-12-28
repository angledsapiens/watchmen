import { SourceMeta } from "./common.js";
export type NarrativeRecord = {
    id: string;
    title: string;
    period: {
        start_ts: number;
        end_ts: number;
    };
    summary: string;
    factors: string[];
    observations: string[];
    learnings: string[];
    confidence: number;
    source: SourceMeta;
    created_ts: number;
    hash?: string;
};
//# sourceMappingURL=narrative.d.ts.map