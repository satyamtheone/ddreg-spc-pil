import MiniChip from "@/components/common/miniChip";
import { Task } from "@/lib/redux/apiTypes";
import { formatedDate } from "@/lib/utilMethods";
import { FlagIcon } from "lucide-react";
import React from "react";
import { MdOutlineWatchLater } from "react-icons/md";

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <FlagIcon size={14} />
        </div>
        <div>
          <MiniChip status={task?.taskType} />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div>
          <div>{task?.title}</div>
          <div className="text-sm text-gray-400">{task?.description}</div>
        </div>
        <div className="flex gap-2 items-center">
          <MiniChip status="SPC" />
          <MiniChip status="Germany" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className=" -space-x-2 flex items-center ">
          {task.assignments.map((assignment) => (
            <div key={assignment.id} className="avatar ">
              <div className="w-8 bg-gradient rounded-full flex justify-center text-sm font-semibold items-center">
                <span>
                  {assignment?.user?.fName?.charAt(0)}
                  {assignment?.user?.lName?.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className=" text-gray-400 flex items-center gap-1">
          <MdOutlineWatchLater />
          {formatedDate(task?.dueDate || "")}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
