import { SignupType } from "@umarkhan1999/medium-blog-types";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../api/auth";
import Button from "./Button";
import LabelledInput from "./LabelledInput";

export default function SignupForm() {
  const [input, setInput] = useState<SignupType>({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit the form to your server here
    try {
      const response = await createAccount({ ...input });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full md:w-[50%] flex-1">
      <div className="w-full md:w-6/12">
        <div className="px-12">
          <h1 className="text-4xl font-extrabold">Create Account</h1>
          <p className="text-slate-500 mt-2 text-base">
            Already have Account?
            <Link to="/signin" className="pl-2 underline">
              Signin
            </Link>
          </p>
        </div>

        <form className="my-4 flex flex-col gap-6" onSubmit={handleSubmit}>
          <LabelledInput
            name="name"
            onChange={handleChange}
            label="Name"
            htmlFor="name"
            placeholder="Please Enter your name"
            type="text"
            value={input.name || ""}
          />
          <LabelledInput
            name="email"
            onChange={handleChange}
            label="Username"
            htmlFor="username"
            placeholder="Please Enter your username/email"
            type="email"
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
          <Button type="submit">Signup</Button>
        </form>
      </div>
    </div>
  );
}
