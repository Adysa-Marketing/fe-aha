import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API;
const apiVersion = "api/v1";

export async function getArticles(rowsPerPage, currentPage) {
  const response = await axios.post(
    `${apiUrl}/${apiVersion}/master/article/list`,
    {
      rowsPerPage,
      currentPage,
    }
  );

  return response.data;
}

export async function getArticle(slug) {
  const response = await axios.post(
    `${apiUrl}/${apiVersion}/master/article/detail`,
    {
      slug,
    }
  );
  return response.data;
}
