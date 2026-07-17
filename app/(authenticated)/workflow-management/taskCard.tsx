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
import { HiOutlineTrash } from "react-icons/hi";
import { FaFlag } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

import { useGetSingleDocumentVersionsQuery } from "@/lib/redux/slices/documentApi";
import { WorkFlowSearchParams } from "./page";
import DeleteTaskDialog from "./deleteTaskDialog";

type TaskCardProps = {
  task: Task;
  params: WorkFlowSearchParams;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, params }) => {
  const { goTo } = useNavigation();
  const { openDialog } = useDialog();
  const { user, isAdmin } = useAuth();
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
  const { data: document } = useGetSingleDocumentVersionsQuery(
    {
      docId: task.documentVersionId,
    },
    {
      skip: !canDoAction,
    },
  );

  const canViewTimesheet = isAdmin && task.createdById === user?.id;
  return (
    <div
      className={`bg-white rounded-lg  shadow-lg p-2 flex flex-col gap-2 animate-dialog-slide-down ${(task.status === "UNDER_EDITING" || task.status === "UNDER_REVIEW" || task.status === "UNDER_APPROVAL") && task.rejectionCount > 0 && "border border-red-400"} ${task.documentVersionId === params.documentVersionId && "border-4 border-sky-400 shadow-sky-200 delay-200"}`}
    >
      <div className="flex justify-between items-center">
        <div>
          {task.rejectionCount > 0 ? (
            <div
              className="text-red-600 flex items-center gap-2 tooltip tooltip-right tooltip-info"
              data-tip={`This task is rejected ${task.rejectionCount} times`}
            >
              <FaFlag size={14} className="text-red-600" />
              <strong> {task.rejectionCount}</strong>
            </div>
          ) : (
            <FlagIcon size={14} />
          )}
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
        <div className="w-full">
          <div>{task?.title}</div>
          <div
            className={`text-sm text-gray-400  ${task?.description.length > 30 && "tooltip tooltip-info cursor-pointer"}`}
          >
            {task?.description.length > 30 && (
              <div className="tooltip-content text-white">
                {task?.description}
              </div>
            )}

            <div className="text-wrap w-80 line-clamp-2 ">
              {task?.description}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <MiniChip
            status={task?.documentVersion?.reference?.schemaMeta?.type}
          />
          <MiniChip status={task?.documentVersion?.document?.country} />
        </div>
      </div>
      {/* {task.rejectionCount > 0 && (
        <div className="text-red-600 text-xs flex gap-2 items-center">
          <IoIosWarning size={15} />
          <p>
            This task is rejected <strong>{task.rejectionCount}</strong> times
          </p>
        </div>
      )} */}
      <div className="flex justify-between items-center mt-4">
        <div className=" -space-x-2 flex items-center ">
          {task.assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="avatar "
              onClick={() =>
                canViewTimesheet || assignment?.user.id === user?.id
                  ? goTo(
                      `workflow-management/timesheet?userId=${assignment?.user?.id}`,
                    )
                  : null
              }
            >
              <div
                className={`w-7 ${(canViewTimesheet || assignment?.user.id === user?.id) && "hover:scale-3d hover:scale-130 transition-all hover:border-2  hover:border-teal-600 cursor-pointer scale-120 "}  bg-gradient  rounded-full flex justify-center text-sm font-semibold items-center`}
              >
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
          {canDoAction && task.status !== "CREATED" && (
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
                  goTo(
                    `/document-editor/fullpageEditor?documentBufferUrl=${task?.documentVersion?.documentVersionFile?.key || document?.data.reference.referenceFile.key}&type=${task?.documentVersion?.reference?.schemaMeta?.type}&region=${task?.documentVersion?.reference?.type?.country?.code}&versionId=${task.documentVersion.id}&role=${user?.businessRole?.permissions?.[0]?.type || ""}`,
                  )
                }
              />
            </div>
          )}
          {((user?.id === task.createdById && task.status === "CREATED") ||
            (canDoAction && task.status === "UNDER_EDITING")) && (
            <div className=" flex items-center gap-2">
              {task.status === "CREATED" && (
                <DynamicButton
                  icon={<FaEye className="text-teal-600" size={25} />}
                  size="slim"
                  className="px-2"
                  variant="card"
                  onClick={() =>
                    goTo(
                      `/document-editor/fullpageEditor?documentBufferUrl=${task?.documentVersion?.documentVersionFile?.key || document?.data.reference.referenceFile.key}&type=${task?.documentVersion?.reference?.schemaMeta?.type}&region=${task?.documentVersion?.reference?.type?.country?.code}&versionId=${task.documentVersion.id}&role=VIEWER`,
                    )
                  }
                />
              )}

              <DynamicButton
                icon={<HiOutlineTrash size={25} />}
                size="slim"
                variant="danger"
                className="px-2"
                onClick={() => {
                  openDialog({
                    children: (
                      <ModalProvider
                        size="md:w-200 w-11/12 "
                        title={`Delete Task`}
                        children={<DeleteTaskDialog Id={task.id} Name="Task" />}
                      />
                    ),
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
