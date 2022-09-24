import Head from "next/head";
import { useEffect } from "react";
import ArticlePanel from "../components/article-panel/ArticlePanel";
import LandingPanel from "../components/landing-panel/LandingPanel";
import { firestore } from "../firebase/setup";

export async function getServerSideProps() {
  const blogsSnapshots = await firestore
    .collection("blogs")
    .orderBy("createdAt", "desc")
    .get();
  const blogsData = blogsSnapshots.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      img: data.img,
      title: data.title,
      createdAt: data.createdAt._seconds * 1000,
    };
  });
  console.log("Data List Fetched", blogsData);
  return { props: { blogsData } };
}

export default function Home({ blogsData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Head>
        {/* TODO - update SEO details for page */}
        <title>Bank Of Trivia</title>
      </Head>
      <LandingPanel />
      <ArticlePanel articleData={blogsData} />
    </div>
  );
}
