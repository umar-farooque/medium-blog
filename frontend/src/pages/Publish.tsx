import { ChangeEventHandler, useState } from "react";
import { createBlog } from "../api/blogs";
import Appbar from "../components/Appbar";
import Button from "../components/Button";
import LabelledInput from "../components/LabelledInput";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: ChangeEventHandler<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // TODO: Save post to the database
    console.log(title, description);

    await createBlog({ title, content: description });
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      <Appbar />
      <div className="flex justify-center py-32">
        <div className="max-w-screen-lg w-full flex flex-col gap-5">
          <LabelledInput
            type="text"
            name="title"
            placeholder="Enter Title for your post"
            value={title}
            onChange={handleTitleChange}
            label="Title"
          />
          <TextEditor onChange={handleDescriptionChange} value={description} />
          <Button className="w-max bg-blue-700" onClick={handleSubmit}>
            {" "}
            Publish Post
          </Button>
        </div>
      </div>
    </div>
  );
}

function TextEditor({
  onChange,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}) {
  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Content
      </label>
      <textarea
        id="message"
        rows={4}
        onChange={onChange}
        value={value}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write content for your post."
      ></textarea>
    </div>
  );
}
