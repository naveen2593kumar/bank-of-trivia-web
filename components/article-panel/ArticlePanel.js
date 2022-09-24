import ArticleItem from "./ArticleItem";
import styles from "./ArticlePanel.module.css";

export default function ArticlePanel({ articleData }) {
  return (
    <div className={styles.articlePanel}>
      <div className={styles.articlesWrapper}>
        {articleData.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
