import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Button } from "@mui/material";

import styles from "./ArticleItem.module.css";
import ClipIcon from "../common/ClipIcon";
import Link from "next/link";

export default function ArticleItem({ article }) {
  const [flip, setFlip] = useState(false);

  return (
    <Link href={`/articles/${article.id}`}>
      <div
        className={styles.ArticleItem}
        onMouseOver={() => {
          setFlip(true);
        }}
        onMouseOut={() => {
          setFlip(false);
        }}
      >
        <ClipIcon className={styles.ArticleClip} />
        <img
          src={article.img}
          alt={article.title}
          className={styles.ArticleThumbnail}
        />

        <ReactCardFlip
          isFlipped={flip}
          flipSpeedBackToFront={2.45}
          flipSpeedFrontToBack={2.45}
        >
          <div
            style={{
              backgroundColor: "white",
              height: 80,
              overflow: "hidden",
            }}
          >
            <p className={styles.ArticleTitle}>{article.title}</p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button className="btn" variant="contained">
              Read More ...
            </Button>
          </div>
        </ReactCardFlip>
      </div>
    </Link>
  );
}
