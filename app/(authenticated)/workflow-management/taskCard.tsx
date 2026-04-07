import MiniChip from "@/components/common/miniChip";
import { FlagIcon } from "lucide-react";
import React from "react";
import { MdOutlineWatchLater } from "react-icons/md";

type TaskCardProps = {};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <FlagIcon size={14} />
        </div>
        <div>
          <MiniChip status="Major" />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div>
          <div>Generate Metformin XR SPC</div>
          <div className="text-sm text-gray-400">
            Create Germany SPC document
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <MiniChip status="SPC" />
          <MiniChip status="Germany" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="avatar-group -space-x-5 ">
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
        </div>
        <div className=" text-gray-400 flex items-center gap-1">
          <MdOutlineWatchLater />
          23-01-2026
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
