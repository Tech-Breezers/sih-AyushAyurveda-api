const db = require("../db");
const config = require("../../config");


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
        SELECT symptoms FROM treats
        ORDER BY RAND()
        LIMIT 5
    `;

    const rows = await db.query(sql);
    return rows;
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
    suggestMeds,
    suggestSymptoms,
    suggestDisease,
};
