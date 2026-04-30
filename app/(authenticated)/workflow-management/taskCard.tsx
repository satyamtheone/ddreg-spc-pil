import MiniChip from "@/components/common/miniChip";
import { Task } from "@/lib/redux/apiTypes";
import { formatedDate } from "@/lib/utilMethods";
import { FlagIcon } from "lucide-react";
import React from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useDialog } from "@/components/hooks/DialogProvider";
import ModalProvider from "@/components/dialog/Dialog";
import MoveInEditorDialog from "./tasks/moveInEditDialog";
import MoveInReviewDialog from "./tasks/moveInReviewDialog";
import MoveInApproveDialog from "./tasks/moveInApproveDialog";
import ApprovalDialog from "./tasks/approvalDialog";
import DynamicButton from "@/components/common/DynamicButton";
import { useNavigation } from "@/components/hooks/useNavigation";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useAuth } from "@/lib/AuthProvider";
import { IoIosWarning } from "react-icons/io";

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { goTo } = useNavigation();
  const { openDialog } = useDialog();
  const { user } = useAuth();

  const userAssignment = task.assignments.find((a) => a.user.id === user?.id);

  const canDoAction =
    !!userAssignment &&
    (((task.status === "CREATED" || task.status === "UNDER_EDITING") &&
      userAssignment.user.businessRoleId.permissions.some(
        (p) => p.type === "EDITOR",
      )) ||
      (task.status === "UNDER_REVIEW" &&
        userAssignment.user.businessRoleId.permissions.some(
          (p) => p.type === "REVIEWER",
        )) ||
      (task.status === "UNDER_APPROVAL" &&
        userAssignment.user.businessRoleId.permissions.some(
          (p) => p.type === "APPROVER",
        )));
  return (
    <div
      className={`bg-white rounded-lg  shadow-lg p-2 flex flex-col gap-2 animate-dialog-slide-down ${(task.status === "UNDER_EDITING" || task.status === "UNDER_REVIEW" || task.status === "UNDER_APPROVAL") && task.rejectionCount > 0 && "border border-red-400"}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <FlagIcon size={14} />
        </div>
        <div className="flex items-center">
          <MiniChip status={task?.taskType} />
          {canDoAction && (
            <div
              className="pl-4 hover:scale-3d hover:scale-110 active:scale-3d active:scale-95 cursor-pointer transition-all"
              onClick={() => {
                if (task.status === "CREATED") {
                  openDialog({
                    children: (
                      <ModalProvider
                        size="md:w-200 w-11/12"
                        title={`Move this task in Edit`}
                        children={<MoveInEditorDialog task={task} />}
                      />
                    ),
                  });
                } else if (task.status === "UNDER_EDITING") {
                  openDialog({
                    children: (
                      <ModalProvider
                        size="md:w-200 w-11/12"
                        title={`Move this task in Review `}
                        children={<MoveInReviewDialog task={task} />}
                      />
                    ),
                  });
                } else if (task.status === "UNDER_REVIEW") {
                  openDialog({
                    children: (
                      <ModalProvider
                        size="md:w-200 w-11/12"
                        title={`Move this task in Approve `}
                        children={<MoveInApproveDialog task={task} />}
                      />
                    ),
                  });
                } else if (task.status === "UNDER_APPROVAL") {
                  openDialog({
                    children: (
                      <ModalProvider
                        size="md:w-200 w-11/12"
                        title={`Approve this Task`}
                        children={<ApprovalDialog task={task} />}
                      />
                    ),
                  });
                }
              }}
            >
              <HiDotsVertical />
            </div>
          )}
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
      {task.rejectionCount > 0 && (
        <div className="text-red-600 text-sm flex gap-2 items-center">
          <IoIosWarning size={20} />
          <p>
            This task is rejected <strong>{task.rejectionCount}</strong> times
          </p>
        </div>
      )}

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
        <div className="flex gap-2">
          <div className=" text-gray-400 flex items-center gap-1">
            <MdOutlineWatchLater />
            {formatedDate(task?.dueDate || "")}
          </div>
          {canDoAction && (
            <div className="w-10">
              <DynamicButton
                icon={
                  <BiSolidMessageSquareEdit
                    className="text-teal-600"
                    size={25}
                  />
                }
                size="slim"
                variant="card"
                onClick={() =>
                  goTo(`/document-editor?documentId=${task}`)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
