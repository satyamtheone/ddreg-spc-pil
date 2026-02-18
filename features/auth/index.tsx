import Image from "next/image";
import { AuthForm } from "./components/authForm";

export const AuthPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[url('/auth/Icon-01.svg')] bg-cover bg-center flex items-center justify-center lg:justify-between p-2 lg:p-20">
      <div className="w-full flex">
        {/* Left side - Login Form */}
        <div className="lg:w-1/2 flex items-center ">
          <AuthForm />
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <Image
            src="/auth/Icon-02.svg"
            alt="Authentication illustration"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export { AuthForm } from "./components/authForm";
