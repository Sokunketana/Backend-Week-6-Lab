import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalist, getJournalistById } from "../services/api";

export default function JournalistArticlesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [journalist, setJournalist] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [journalistData, articlesData] = await Promise.all([
        getJournalistById(id),
        getArticlesByJournalist(id),
      ]);
      setJournalist(journalistData);
      setArticles(articlesData);
    } catch (err) {
      console.error("Error fetching journalist or articles:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      {journalist && (
        <div className="journalist-header">
          <h2>Articles by {journalist.name}</h2>
          {journalist.email && <p>📧 {journalist.email}</p>}
          {journalist.bio && <p>{journalist.bio}</p>}
        </div>
      )}

      {articles.length === 0 ? (
        <p>No articles found for this journalist.</p>
      ) : (
        <div className="article-list">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-title">{article.title}</div>
              <div className="article-author">{article.category}</div>
              <div className="article-actions">
                <button
                  className="button-secondary"
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="button-secondary"
        style={{ marginTop: "1rem" }}
        onClick={() => navigate("/articles")}
      >
        ← Back to Articles
      </button>
    </div>
  );
}
