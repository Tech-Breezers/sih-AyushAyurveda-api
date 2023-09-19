const db = require("../db");
const config = require("../../config");

async function getAllTreatments() {
    const rows = await db.query(`SELECT * FROM treats`);
    return rows;
}

async function getTreatmentById(id) {
    const rows = await db.query(`SELECT * FROM treats where id = "${id}"`);
    return rows;
}

module.exports = {
    getAllTreatments,
    getTreatmentById,
};
