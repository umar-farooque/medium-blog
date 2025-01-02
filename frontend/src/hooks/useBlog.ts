import React from "react";
import { getBlog } from "../api/blogs";

export interface IBlog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export default function useBlog(id: string) {
  const [blog, setBlog] = React.useState<IBlog>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const response = await getBlog(id);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { blog, loading };
}
