import { SignupType } from "@umarkhan1999/medium-blog-types";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [input, setInput] = useState<SignupType>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex justify-center items-center w-full md:w-[50%] flex-1">
      <div>
        <h1 className="text-4xl font-extrabold">Create Account</h1>
        <p className="text-slate-500 mt-2 text-base">
          Already have Account?
          <Link to="/signin" className="pl-2 underline">
            Signin
          </Link>
        </p>
        <div>
          <LabelledInput
            name="email"
            onChange={handleChange}
            label="Username"
            htmlFor="username"
            placeholder="Please Enter your username"
            type="text"
            value={input.email}
          />
          <LabelledInput
            name="password"
            onChange={handleChange}
            label="Password"
            htmlFor="password"
            placeholder="Please Enter your password"
            type="password"
            value={input.password}
          />
        </div>
      </div>
    </div>
  );
}

interface ILabelledInput {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  htmlFor?: string;
}

function LabelledInput({
  name,
  type,
  value,
  onChange,
  placeholder,
  htmlFor = "",
  label,
}: ILabelledInput): React.ReactElement {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={htmlFor}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
