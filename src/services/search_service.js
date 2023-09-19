const db = require("../db");
const config = require("../../config");


async function searchMeds(searchTerm) {
    const sql = `
        SELECT * FROM meds
        WHERE LOWER(\`medicine\`) LIKE LOWER(?);
    `;

    const rows = await db.query(sql, [`%${searchTerm}%`]);
    return rows;
}

async function searchTreats(searchTerm) {
    const sql = `
        SELECT * FROM treats
        WHERE LOWER(\`disease\`) LIKE LOWER(?) OR LOWER(\`symptoms\`) LIKE LOWER(?);
    `;

    const rows = await db.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`]);
    return rows;
}

module.exports = {
    searchMeds,
    searchTreats,
};
