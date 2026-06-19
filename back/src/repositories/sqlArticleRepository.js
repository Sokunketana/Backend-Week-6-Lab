import { pool } from "../utils/database.js";
//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
  // Return articles with journalist info if available
  // Use the articles.journalist column as the journalist name when a separate
  // journalists table may not exist in the provided DB dump.
  const [rows] = await pool.query(`
            SELECT articles.*, articles.journalist AS journalist_name,
                         NULL AS journalist_email,
                         NULL AS journalist_bio
            FROM articles
        `);
  return rows;
}

// Get one article by ID
export async function getArticleById(id) {
  // Return single article with journalist info
  const [rows] = await pool.query(
    `
            SELECT articles.*, articles.journalist AS journalist_name,
                         NULL AS journalist_email,
                         NULL AS journalist_bio
            FROM articles
            WHERE articles.id = ?
        `,
    [id],
  );
  return rows[0] || null;
}

// Create a new article
export async function createArticle(article) {
  const {
    title,
    content,
    journalist = null,
    category = null,
    journalist_id = null,
  } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist, category, journalist_id) VALUES (?, ?, ?, ?, ?)",
    [title, content, journalist, category, journalist_id],
  );
  return {
    id: result.insertId,
    title,
    content,
    journalist,
    category,
    journalist_id,
  };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  const {
    title,
    content,
    journalist = null,
    category = null,
    journalist_id = null,
  } = updatedData;
  await pool.query(
    "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ?, journalist_id = ? WHERE id = ?",
    [title, content, journalist, category, journalist_id, id],
  );
  return { id, title, content, journalist, category, journalist_id };
}

// Delete an article by ID
export async function deleteArticle(id) {
  // TODO
  const [rows] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return rows.affectedRows > 0;
}

export async function getArticlesByJournalistId(journalistId) {
  // If the DB has no separate journalists table, this endpoint may not work as expected.
  // For now, filter by the articles.journalist column which holds the journalist name.
  const [rows] = await pool.query(
    `SELECT articles.*, articles.journalist AS journalist_name, NULL AS journalist_email, NULL AS journalist_bio
         FROM articles
         WHERE articles.journalist = ?`,
    [journalistId],
  );
  return rows;
}
