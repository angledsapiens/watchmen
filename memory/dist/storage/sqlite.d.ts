declare function getOne<T>(sql: string, params?: any[]): T | undefined;
declare function getMany<T>(sql: string, params?: any[]): T[];
declare function run(sql: string, params?: any[]): void;
export declare const storage: {
    getOne: typeof getOne;
    getMany: typeof getMany;
    run: typeof run;
};
export {};
//# sourceMappingURL=sqlite.d.ts.map