import ModalProvider from "@/components/dialog/Dialog";
import { User } from "@/lib/redux/apiTypes";
import UpdateProfilePicForm from "./updateProfilePicForm";
import { useAuth } from "@/lib/AuthProvider";
import { useDialog } from "@/components/hooks/DialogProvider";
import { FaCameraRetro } from "react-icons/fa";
import image from "../../../public/userProfileIcon.png";
import Image from "next/image";

type Props = {
  user?: User;
  size?: string;
  padding?: string;
  shadow?: string;
  textSize?: string;
};

const UserAvatar = ({ size, padding, shadow, textSize }: Props) => {
  const { user, imageUrl } = useAuth();
  const { openDialog } = useDialog();
  const firstLetter = user?.fName?.charAt(0) || "";
  const lastLetter = user?.lName?.charAt(0) || "";
  const logo = imageUrl || image;

  return (
    <div
      className={`relative border-slate-300 border rounded-full bg-white 
      ${shadow || "shadow-md"} 
      ${size || "h-full w-full"} 
      ${padding || "p-1"}`}
    >
      {logo ? (
        <Image
          width={100}
          height={100}
          loading="eager"
          src={logo}
          alt="user-avatar"
          className="w-full h-full object-contain rounded-full"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient flex justify-center items-center text-white rounded-full ${textSize}`}
        >
          {firstLetter}
          {lastLetter}
        </div>
      )}
      <div
        className="absolute -bottom-4 left-0 right-0"
        onClick={() => {
          openDialog({
            children: (
              <ModalProvider
                size="md:w-200 w-11/12 "
                title={`Upload/Update Profile`}
                children={<UpdateProfilePicForm />}
              />
            ),
          });
        }}
      >
        <div className="w-full flex justify-center ">
          <div className="bg-gray-100 p-2 rounded-full spcBNS cursor-pointer custom-dynamicButton-hover-classes">
            <FaCameraRetro className="text-teal-900" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
