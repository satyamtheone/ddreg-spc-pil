"use client"
import PageHeader from "@/components/common/pageHeader"
import UserAvatar from "./userAvatar"
import { RiUserLine } from "react-icons/ri";
import ProfileTabCard from "./profileTabCard";
import { MdOutlineEmail } from "react-icons/md";
import { useGetMeQuery } from "@/lib/redux/slices/userApi";
import ProfileSkeleton from "@/components/common/skletons/profileSkeleton";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { FaEarthAsia } from "react-icons/fa6";
import { FaLanguage } from "react-icons/fa";
import { RiTimeZoneLine } from "react-icons/ri";

const Account: React.FC = () => {
  const query = useGetMeQuery();
  const data = useQueryErrorHandler(query, "Get User");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Account"
        subTitle="Stay updated with latest regulatory changes"
      />
      {query.isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div className="w-full bg-gradient p-4 py-6 shadow-md rounded-[10px] ">
            <div className=" text-xl font-semibold mb-4">Profile</div>
            <div className="flex items-center justify-between max-md:flex-wrap animate-dialog-slide-down">
              <div className="w-full flex justify-start items-center gap-8">
                <UserAvatar
                  user={data?.data}
                  size={"md:h-29 h-20 md:w-29 w-20"}
                  textSize={"md:text-5xl text-3xl"}
                />
                <div className="flex flex-col gap-2 items-start">
                  <div className="text-2xl font-semibold">
                    {data?.data?.fName} {data?.data?.lName}
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <RiUserLine size={24} />
                    </div>
                    <div>{data?.data?.role || "-"}</div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <MdOutlineEmail size={24} />
                    </div>
                    <div>{data?.data?.email || "-"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="spcCard rounded-[10px] animate-dialog-slide-down">
            <div className=" text-xl font-semibold mb-4">Company</div>

            <div className="flex gap-4 w-full items-center flex-wrap">
              <ProfileTabCard
                bg={"bg-cyan-500"}
                icon={<MdOutlineEmail size={20} />}
                title={"Email"}
                subTitle={data?.data?.email || "-"}
              />
              <ProfileTabCard
                bg={"bg-teal-500"}
                icon={<LiaUserAstronautSolid size={20} />}
                title={"Role"}
                subTitle={data?.data?.role || "-"}
              />
              <ProfileTabCard
                bg={"bg-green-600"}
                icon={<FaEarthAsia size={20} />}
                title={"Country"}
                subTitle={data?.data?.country || "-"}
              />
              <ProfileTabCard
                bg={"bg-sky-600"}
                icon={<FaLanguage size={20} />}
                title={"Language"}
                subTitle={data?.data?.language || "-"}
              />
              <ProfileTabCard
                bg={"bg-teal-700"}
                icon={<RiTimeZoneLine size={20} />}
                title={"Time Zone"}
                subTitle={data?.data?.timeZone || "-"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Account