import MiniChip from "@/components/common/miniChip";
import { Task } from "@/lib/redux/apiTypes";
import { formatedDate, isBG } from "@/lib/utilMethods";
import { Clock10Icon } from "lucide-react";
import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

type ReviewDialogContentProps = {
  task: Task;
};

const ReviewDialogContent: React.FC<ReviewDialogContentProps> = ({ task }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-15 bg-gradient -mt-14 -mx-4 text-white  px-4">
        <div className="text-2xl capitalize">{task?.title}</div>
        <div className="text-sm capitalize">{task?.description}</div>
      </div>
      <div className="flex gap-4 items-center">
        <MiniChip status={"SPC"} />{" "}
        <MiniChip status={task.documentVersion.document.country} />
        <MiniChip status={task.taskType} />{" "}
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="text-neutral-400 text-sm">Created</div>
          <div className="flex gap-2 items-center text-gray-800">
            <Clock10Icon size={20} /> {formatedDate(task?.createdAt)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-neutral-400 text-sm">Due Date</div>
          <div className="flex gap-2 items-center text-gray-800">
            <Clock10Icon size={20} /> {formatedDate(task?.dueDate)}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 spcBNS p-4 rounded-[10px]">
        {task.assignments.map((user) => (
          <div key={user.id} className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-4">
              <div className="avatar h-8 w-8 rounded-full bg-gradient text-sm flex justify-center items-center">
                {user.user.fName?.charAt(0)}
                {user.user.lName?.charAt(0)}
              </div>
              <div>
                {user.user.fName} {user.user.lName}
              </div>
              <div className="flex gap-2">
                {user.user.businessRoleId.permissions.map((per) => (
                  <MiniChip status={per.type} key={per.id} size="small" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isBG(user, task) && (
                <BsFillPatchCheckFill className="text-green-700" />
              )}
              <div
                className={`h-2.5 w-full  rounded-4xl ${isBG(user, task) ? "bg-gradient" : "bg-gray-200"}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDialogContent;
