const sqlite = require("better-sqlite3")
const path = require("path")
const db = new sqlite(path.resolve('./db/gamecity'), {fileMustExist: true})

const query = (sql) => {
    return db.prepare(sql).all()
}

const run = (sql, params) => {
    return db.prepare(sql).run(params)
}

module.exports = {
    query,
    run
}