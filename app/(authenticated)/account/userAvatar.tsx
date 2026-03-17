type User = {
  firstName?: string;
  lastName?: string;
  company?: {
    logo?: {
      Location?: string;
    };
  };
};

type Props = {
  user?: User;
  size?: string;
  padding?: string;
  shadow?: string;
  textSize?: string;
};

const UserAvatar = ({
  user,
  size,
  padding,
  shadow,
  textSize,
}: Props) => {
  const firstLetter = user?.firstName?.charAt(0) || "";
  const lastLetter = user?.lastName?.charAt(0) || "";
  const logo = user?.company?.logo?.Location;

  return (
    <div
      className={`border-slate-300 border rounded-full bg-white 
      ${shadow || "shadow-md"} 
      ${size || "h-full w-full"} 
      ${padding || "p-1"}`}
    >
      {logo ? (
        <img
          src={logo}
          alt="user-avatar"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient flex justify-center items-center text-white rounded-full ${textSize}`}
        >
          {/* {firstLetter}
          {lastLetter} */}
          SS
        </div>
      )}
    </div>
  );
};

export default UserAvatar;