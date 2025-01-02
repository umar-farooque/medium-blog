import { client } from "./httpClient";

export async function getBlogs() {
  return await client.get("/api/v1/blog");
}

export async function getBlog(id: string) {
  return await client.get(`/api/v1/blog/${id}`);
}

export async function createBlog(data) {
  return await client.post("/api/v1/blog", data);
}
