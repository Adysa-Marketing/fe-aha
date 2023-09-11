import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settings;
import { getArticle, getArticles } from "services/article";

// post single layout
const Article = ({ post, authors, mdxContent, htmlContent, slug }) => {
  const { frontmatter, content } = post;

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      // mdxContent={mdxContent}
      htmlContent={htmlContent}
      authors={authors}
      slug={slug}
    />
  );
};

// get post single slug
export const getStaticPaths = async () => {
  // const allSlug = getSinglePage(`content/${blog_folder}`);
  // const paths = allSlug.map((item) => ({
  //   params: {
  //     single: item.slug,
  //   },
  // }));

  let paths = [];
  const allSlug = await getArticles("All", 1).catch((err) =>
    console.log(
      "Error : ",
      err.response && err.response.data ? err.response.data.message : err
    )
  );
  if (allSlug) {
    paths = allSlug.data.map((item) => ({
      params: {
        single: item.slug,
      },
    }));
  }
  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePage(`content/${blog_folder}`);
  // const post = posts.filter((p) => p.slug == single);
  // const md = await parseMDX(post[0].content);


  let data = await getArticle(single).catch((err) =>
    console.log(
      "Error :",
      err.response && err.response.data ? err.response.data.message : err
    )
  );
  data = data ? data.data : null;
  let post2 = {
    frontmatter: {
      title: "",
      description: "",
      image: "",
    },
    slug: single,
    content: "",
  };

  if (data) {
    post2 = {
      frontmatter: {
        title: data.title,
        description: data.excerpt,
        image: data.image,
      },
      slug: single,
      content: data.description,
    };
  }

  return {
    props: {
      post: post2,
      // mdxContent: mdxContent,
      htmlContent: post2.content,
      slug: single,
    },
  };
};

export default Article;
