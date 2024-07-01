import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="w-full min-h-screen px-4 py-8 flex items-center justify-center">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
