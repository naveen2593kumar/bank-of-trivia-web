import {
  Grid,
  IconButton,
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import style from "./ArticlePage.module.css";
import { firestore } from "../../firebase/setup";
import Head from "next/head";
import { useState } from "react";

export async function getServerSideProps(context) {
  const articleId = context?.params?.articleId || context?.query?.articleId;
  let article = null;
  if (articleId) {
    const blog = await firestore.collection("blogs").doc(articleId).get();
    const fetchedData = blog.data();
    article = {
      id: blog.id,
      ...fetchedData,
      createdAt: fetchedData.createdAt._seconds * 1000,
    };
  }
  console.log("article", article);
  return { props: { article } };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ArticlePage = ({ article }) => {
  const [contentLang, setContentLang] = useState(0);

  if (!article) {
    return (
      <div>
        <strong>Sorry !!!</strong>
        <br />
        This is article is removed or invalidated,{" "}
        <Link href="/">please check all Articles</Link>.
      </div>
    );
  }
  const showScriptPanel = !!(article.en || article.hn);
  return (
    <>
      <Head>
        {/* TODO - update SEO details for page */}
        <title>{article.title} - Bank Of Trivia</title>
      </Head>
      <div className={style.ArticlePageHeader}>
        <Link href="/">
          <img
            src="/images/icon.png"
            alt="Bank Of Trivia"
            className={style.Logo}
          />
        </Link>
      </div>
      <div className={style.ArticlePageWrapper}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <IconButton aria-label="Back">
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          </Link>
          <h3>{article.title}</h3>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {article.ytId && (
                <>
                  <iframe
                    className={style.ArticlePageYoutubeFrame}
                    title={article.title}
                    width="400px"
                    height="300px"
                    src={`https://www.youtube.com/embed/${article.ytId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <br />
                </>
              )}
              {showScriptPanel && (
                <img
                  src={article.img}
                  alt={article.title}
                  className={style.ArticlePageImage}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            {!showScriptPanel ? (
              <img
                src={article.img}
                alt={article.title}
                className={style.ArticlePageImage}
              />
            ) : (
              <div
                style={{
                  background: "#1a1a1a",
                  color: "var(--tab-color, rgb(6, 200, 200))",
                  height: "100vh",
                  overflow: "scroll",
                  fontSize: "14px",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "#fff" }}>
                  <Tabs
                    value={contentLang}
                    onChange={(_, value) => {
                      setContentLang(value);
                    }}
                    aria-label="basic tabs example"
                  >
                    {article.en && <Tab label="English" {...a11yProps(0)} />}
                    {article.hn && <Tab label="हिंदी" {...a11yProps(1)} />}
                  </Tabs>
                </Box>
                {article.en && (
                  <TabPanel value={article.hn ? contentLang : 0} index={0}>
                    <div
                      style={{ fontSize: 14 }}
                      dangerouslySetInnerHTML={{ __html: article.en }}
                    ></div>
                  </TabPanel>
                )}
                {article.hn && (
                  <TabPanel value={article.en ? contentLang : 1} index={1}>
                    <div
                      style={{ fontSize: 14 }}
                      dangerouslySetInnerHTML={{ __html: article.hn }}
                    ></div>
                  </TabPanel>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ArticlePage;
