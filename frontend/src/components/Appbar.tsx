import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function Appbar() {
  return (
    <div className="border-b flex justify-between items-center px-10 py-5 shadow-md">
      <div>MEdium</div>
      <div className="flex gap-4">
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <Link to={"/publish"}> New</Link>
        </button>
        <Avatar size="large" name="Umar" />
      </div>
    </div>
  );
}
