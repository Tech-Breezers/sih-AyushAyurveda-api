const db = require("../db");
const config = require("../../config");

async function suggestAll(searchTerm) {
    const sql = `
        SELECT id, disease, symp FROM treats
        WHERE LOWER(\`disease\`) LIKE LOWER(?) OR LOWER(\`symptoms\`) LIKE LOWER(?);
    `;

    const rows = await db.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`]);
    return rows;
}

async function suggestMeds() {
    const sql = `
        SELECT medicine FROM meds
        ORDER BY RAND()
        LIMIT 5
    `;

    const rows = await db.query(sql);
    return rows;
}

async function suggestSymptoms() {
    const sql = `
        SELECT symp FROM treats
        ORDER BY RAND()
        LIMIT 5
    `;

    const rows = await db.query(sql);

    returnrows = []

    for (row in rows){
        returnrows.push(rows[row]['symp'][0])
    }

    return returnrows;
}

async function suggestDisease() {
    const sql = `
        SELECT disease FROM treats
        ORDER BY RAND()
        LIMIT 5
    `;

    const rows = await db.query(sql);
    return rows;
}

module.exports = {
    suggestAll,
    suggestMeds,
    suggestSymptoms,
    suggestDisease,
};
