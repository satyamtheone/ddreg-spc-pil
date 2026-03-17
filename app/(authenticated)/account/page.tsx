"use client"
import PageHeader from "@/components/common/pageHeader"
import UserAvatar from "./userAvatar"
import { RiUserLine } from "react-icons/ri";
import ProfileTabCard from "./profileTabCard";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

const Account: React.FC =() =>{
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="My Account" subTitle="Stay updated with latest regulatory changes" />
      <div className="w-full bg-gradient p-4 py-6 shadow-md rounded-[10px] ">
        <div className=" text-xl font-semibold mb-4">Profile</div>
        <div className="flex items-center justify-between max-md:flex-wrap">
          <div className="w-full flex justify-start items-center gap-8">
            <UserAvatar
              user={{}}
              size={"md:h-29 h-20 md:w-29 w-20"}
              textSize={"md:text-5xl text-3xl"}
            />
            <div className="flex flex-col gap-2 items-start">
              <div className="text-2xl font-semibold">Satyam singh</div>
              <div className="flex gap-4 items-center">
                <div>
                  <RiUserLine size={24} />
                </div>
                <div>Project Manager</div>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  <MdOutlineEmail size={24} />
                </div>
                <div>Satyam.s@ddreg.in</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spcCard rounded-[10px]">
        <div className=" text-xl font-semibold mb-4">Company</div>

        <div className="flex gap-4 w-full items-center">
          <ProfileTabCard
            bg={"bg-sky-700"}
            icon={<FaRegBuilding size={20} />}
            title={"Company Name"}
            subTitle="DDReg Pharma Pvt. Ltd."
          />
          <ProfileTabCard
            bg={"bg-cyan-500"}
            icon={<MdOutlineEmail size={20} />}
            title={"Email"}
            subTitle="satyam.s@ddreg.in"
          />
          <ProfileTabCard
            bg={"bg-teal-500"}
            icon={<FaRegBuilding size={20} />}
            title={"Role"}
            subTitle="Project Manager"
          />
         
        </div>
      </div>
    </div>
  );
}
export default Account