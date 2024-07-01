import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="w-full min-h-screen px-4 py-8 flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default SignInPage;
