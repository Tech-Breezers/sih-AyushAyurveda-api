const db = require("../db");
const config = require("../../config");

async function getAllMeds() {
    const rows = await db.query(`SELECT * FROM meds`);
    return rows;
}

async function getMedById(id) {
    const rows = await db.query(`SELECT * FROM meds where id = "${id}"`);
    return rows;
}

module.exports = {
    getAllMeds,
    getMedById,
};
