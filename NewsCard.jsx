import React from "react";
import "../styles/NewsCard.css";

const NewsCard = ({ article }) => {
  const {
    title,
    description,
    url,
    urlToImage,
    source,
    publishedAt,
    predictionLabel = "Unknown",
    predictionScore = "N/A",
  } = article;

  return (
    <div className="card" onClick={() => window.open(url, "_blank")}>
      <div className="card-header">
        <img src={urlToImage || "https://via.placeholder.com/400x200"} alt="news" />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <h4>
          Model Prediction:{" "}
          {predictionLabel === "Fake" ? (
            <b style={{ color: "red" }}>❌ FAKE</b>
          ) : predictionLabel === "Real" ? (
            <b style={{ color: "green" }}>✅ REAL</b>
          ) : (
            <b style={{ color: "gray" }}>⌛ Pending</b>
          )}{" "}
          | Score: {predictionScore}
        </h4>
        <h6 className="news-source">
          {source?.name} &nbsp; {new Date(publishedAt).toLocaleDateString()}
        </h6>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
