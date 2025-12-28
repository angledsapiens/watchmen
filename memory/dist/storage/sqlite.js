"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("watchmen-memory.db");
/* ----------------------------- */
/* Internal helpers              */
/* ----------------------------- */
function getOne(sql, params = []) {
    return db.prepare(sql).get(...params);
}
function getMany(sql, params = []) {
    return db.prepare(sql).all(...params);
}
function run(sql, params = []) {
    db.prepare(sql).run(...params);
}
function exec(sql) {
    db.exec(sql);
}
/* ----------------------------- */
/* Public storage API            */
/* ----------------------------- */
exports.storage = {
    getOne,
    getMany,
    run,
    exec,
};
//# sourceMappingURL=sqlite.js.map