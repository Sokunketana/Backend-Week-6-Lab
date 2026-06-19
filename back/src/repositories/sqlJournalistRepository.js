import { pool } from "../utils/database.js";

// Get all journalists
export async function getJournalists() {
  const [rows] = await pool.query("SELECT * FROM journalists");
  return rows;
}

// Get one journalist by ID
export async function getJournalistById(id) {
  const [rows] = await pool.query("SELECT * FROM journalists WHERE id = ?", [
    id,
  ]);
  return rows[0] || null;
}
