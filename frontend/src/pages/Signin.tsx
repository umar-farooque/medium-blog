import Quote from "../components/Quote";
import SigninForm from "../components/SignInForm";

export default function Signin() {
  return (
    <div className="flex h-screen">
      <SigninForm />
      <div className="invisible md:visible md:flex flex-1  w-[50%]">
        <Quote />
      </div>
    </div>
  );
}
