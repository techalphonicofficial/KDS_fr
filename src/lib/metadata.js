import { getData } from "@/lib/data";
import { API_URL } from "@/config/api";


export async function getPageSEO(slug) {

  const url = `${API_URL}/page/${slug}`;

//   console.log("SEO API URL:", url);
  const response = await getData(url);
//   console.log("SEO RESPONSE:", response);

  return response.data;

}