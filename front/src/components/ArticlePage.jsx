import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const found = await getArticleById(id); // fixed: was missing await
      if (found) {
        setArticle(found);
        setError("");
      } else {
        setArticle(null);
        setError("Article not found.");
      }
    } catch (err) {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div className="article-page">
      <h2>{article.title}</h2>
      <p>{article.content}</p>

      <div className="article-meta">
        <strong>Category:</strong> {article.category}
      </div>

      <div className="article-journalist-info">
        <strong>Journalist:</strong>{" "}
        {article.journalist_name ? (
          article.journalist_id ? (
            <button
              className="button-link"
              onClick={() =>
                navigate(`/journalists/${article.journalist_id}/articles`)
              }
            >
              {article.journalist_name}
            </button>
          ) : (
            <span>{article.journalist_name}</span>
          )
        ) : (
          <span>Unknown</span>
        )}
      </div>

      {article.journalist_email && (
        <div className="article-meta">
          <strong>Email:</strong> {article.journalist_email}
        </div>
      )}

      {article.journalist_bio && (
        <div className="article-meta">
          <strong>Bio:</strong> {article.journalist_bio}
        </div>
      )}

      <button
        className="button-secondary"
        onClick={() => navigate("/articles")}
      >
        ← Back to Articles
      </button>
    </div>
  );
}
