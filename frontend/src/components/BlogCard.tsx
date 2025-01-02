import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export interface IBlogCardProps {
  authorName: string;
  publishedDate: string;
  title: string;
  id: string;
  content: string;
}
export default function BlogCard({
  authorName,
  publishedDate,
  id,
  title,
  content,
}: IBlogCardProps) {
  return (
    <Link to={`blog/${id}`}>
      <section className="border-b border-b-slate-300 py-6 px-4 w-screen max-w-screen-md">
        <div className="flex gap-2 items-center my-3">
          <Avatar name={authorName} />
          <p className="text-sm text-black">{authorName}</p>
          <Circle />
          <p className="text-sm font-thin text-gray-400">{publishedDate}</p>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="font-light">{content.slice(0, 100) + " ......"}</p>
        <div className="my-2">
          <p className="text-xs font-thin">{`${Math.ceil(
            content.length / 100
          )} minute(s)`}</p>
        </div>
      </section>
    </Link>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-200" />;
}
