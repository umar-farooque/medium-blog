import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import { Circle } from "../components/BlogCard";
import useBlog from "../hooks/useBlog";

export default function Blog() {
  const { id } = useParams();
  const { blog, loading } = useBlog(id!);
  console.log(blog);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Appbar />
      <div className="flex flex-col items-center">
        <div className="max-w-screen-md  w-screen py-12">
          <div className="">
            <h1 className="text-5xl font-bold">{blog?.title}</h1>
            <div className="flex gap-2 my-10 items-center">
              <Avatar name={blog?.author.name || ""} size="large" />
              <div>
                <p>{blog?.author.name || "Anonyms"}</p>
                <div className="flex gap-3 items-center">
                  <p>{`${Math.ceil(
                    blog?.content.length / 100
                  )} minutes read`}</p>
                  <Circle />
                  <p className="text-sm font-light text-gray-400 ">
                    Published on August 24, 2023
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6">{blog?.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
