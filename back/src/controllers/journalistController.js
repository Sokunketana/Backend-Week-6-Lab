import * as journalistRepository from "../repositories/sqlJournalistRepository.js";

// GET /api/journalists
export async function getAllJournalists(req, res) {
  try {
    const journalists = await journalistRepository.getJournalists();
    res.json(journalists);
  } catch (error) {
    console.error("Error fetching journalists:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/journalists/:id
export async function getJournalistById(req, res) {
  try {
    const journalist = await journalistRepository.getJournalistById(
      req.params.id,
    );
    if (!journalist) {
      return res.status(404).json({ message: "Journalist not found" });
    }
    res.json(journalist);
  } catch (error) {
    console.error("Error fetching journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}
