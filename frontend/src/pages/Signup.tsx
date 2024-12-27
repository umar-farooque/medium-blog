import Quote from "../components/Quote";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="flex h-screen">
      <SignupForm />
      <div className="invisible md:visible md:flex flex-1  w-[50%]">
        <Quote />
      </div>
    </div>
  );
}
