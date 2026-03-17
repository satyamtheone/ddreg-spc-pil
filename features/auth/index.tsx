"Use client"
import Image from "next/image";
import image from '../../public/auth/loginimage.png'
import SignIn from "./signIn";

export const AuthPage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[url('/auth/Icon-01.svg')] bg-cover bg-center flex items-center justify-center lg:justify-between p-2 lg:p-20">
      <div className="w-full h-full flex">
        {/* Left side - Login Form */}
        <div className="lg:w-1/3 flex items-center ">
          <div  className="w-full spcBNS rounded-4xl">
          <SignIn/>
          </div>
        </div>
        

        {/* Right side - Image */}
        <div className="lg:w-2/3 h-full relative hidden lg:block">
        <div className="w-full h-full">
          <Image
              priority
              src={image}
              className="animate-dialog-slide-in h-full object-contain"
              loading="eager"
              alt="login image"
            />
            </div>
        </div>
      </div>
    </div>
  );
};


