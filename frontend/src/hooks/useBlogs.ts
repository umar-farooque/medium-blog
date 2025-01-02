import React from "react";
import { getBlogs } from "../api/blogs";
import { IBlog } from "./useBlog";

export default function useBlogs() {
  const [blogs, setBlogs] = React.useState<IBlog[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const response = await getBlogs();
        setBlogs(response.data.blogs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { blogs, loading };
}
