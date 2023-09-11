import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settings;
import { getArticles } from "services/article";

// blog pagination

const BlogPagination = ({ posts, currentPage, pagination, totalPages }) => {
  return (
    <Base title={"Artikel Terbaru"}>
      <section className="section">
        <div className="container">
          {markdownify(
            "Artikel Terbaru",
            "h1",
            "h1 text-center font-normal text-[56px]"
          )}
          <Posts posts={posts} />
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = async () => {
  //biarkan code dibawah
  const getAllSlug = getSinglePage(`content/${blog_folder}`);
  // const allSlug = getAllSlug.map((item) => item.slug);
  // const { pagination } = config.settings;
  // const total = Math.ceil(allSlug.length / pagination);
  let paths = [];
  //

  const { rowsPerPage } = config.settings;
  const articles = await getArticles(rowsPerPage, 1).catch((err) =>
    console.log(
      "Error : ",
      err.response && err.response.data ? err.response.data.message : err
    )
  );
  let totalPages = 1;
  if (articles) {
    totalPages = articles.totalPages;
  }

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  // const { pagination } = config.settings;
  // const posts = getSinglePage(`content/${blog_folder}`).sort(
  //   (post1, post2) =>
  //     new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
  // );

  const { rowsPerPage } = config.settings;
  const posts2 = await getArticles(rowsPerPage, currentPage).catch((err) =>
    console.log(
      "Error : ",
      err.response && err.response.data ? err.response.data.message : err
    )
  );

  let data = [];
  let totalData = 0;
  let totalPages = 0;
  if (posts2) {
    data = posts2.data;
    totalData = posts2.totalData;
    totalPages = posts2.totalPages;
  }

  // biarkan code dibawah
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
  const mdxContent = await parseMDX(postIndex.content);
  //

  return {
    props: {
      pagination: rowsPerPage,
      posts: data,
      currentPage: currentPage,
      postIndex: postIndex,
      mdxContent: mdxContent,
      totalPages: totalPages,
    },
  };
};
