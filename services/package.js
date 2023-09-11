import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API;
const apiVersion = "api/v1";

export async function getPackages() {
  const response = await axios.post(
    `${apiUrl}/${apiVersion}/master/package/list`,
    {
      rowsPerPage: "All",
      currentPage: 1,
    }
  );

  return response.data;
}
