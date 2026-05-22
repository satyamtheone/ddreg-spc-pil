"use client";
import { useEffect, useMemo } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";
import toast from "react-hot-toast";
import { useGetUsersQuery } from "@/lib/redux/slices/userApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { CreatetaskFormSchema } from "@/lib/utilsSchema";
import FormikSelect from "@/components/FormikComponents/FormikSelect";
import FormikTextarea from "@/components/FormikComponents/FormikTextArea";
import {
  getCountryLabel,
  getDocumentOptions,
  mapToFormikOptions,
} from "@/lib/utilMethods";
import {
  useGetDocumentQuery,
  useGetDocumentVersionsQuery,
} from "@/lib/redux/slices/documentApi";
import { useGetCountriesQuery } from "@/lib/redux/slices/templateApi";
import { useCreateTaskMutation } from "@/lib/redux/slices/workflowApis";
import { tasktypeOptions } from "@/lib/utils";
import InputSkeleton from "@/components/common/skletons/inputSkeleton";
import TaskFormSkeleton from "@/components/common/skletons/taskFormSkeleton";

type FormValues = {
  taskTitle: string;
  taskType: string;
  country?: string;
  type?: string;
  selectedDocument: string;
  selectedVersion: string;
  description: string;
  dueDate: string;
  editorID: string;
  reviewerID: string;
  approverID: string;
};

const CreateTaskDrawer = ({
  fromRepo,
  countryCode,
  documentType,
  documentId,
  versionId,
  title,
}: {
  fromRepo?: boolean;
  countryCode?: string;
  documentType?: string;
  documentId?: string;
  versionId?: string;
  title?: string;
}) => {
  const countryQuery = useGetCountriesQuery();
  const countryQueryData = useQueryErrorHandler(countryQuery, "Get Countries");
  const countriesData = countryQueryData?.data || [];
  const countryOptions = getCountryLabel(countriesData);
  const usersQuery = useGetUsersQuery();
  const users = useQueryErrorHandler(usersQuery, "Get Users");
  const { closeDrawer } = useDrawer();
  const usersOption = () => {
    const data = users?.data || [];

    const approver = data.filter((u) =>
      u.businessRole?.permissions?.some((p) => p.type === "APPROVER"),
    );

    const reviewer = data.filter((u) =>
      u.businessRole?.permissions?.some((p) => p.type === "REVIEWER"),
    );

    const editor = data.filter((u) =>
      u.businessRole?.permissions?.some((p) => p.type === "EDITOR"),
    );

    return {
      approverOptions: mapToFormikOptions(approver, "fName", "id"),
      reviewerOptions: mapToFormikOptions(reviewer, "fName", "id"),
      editorOptions: mapToFormikOptions(editor, "fName", "id"),
    };
  };
  const userOptions = usersOption();
  const iscommonLoading = countryQuery.isLoading || usersQuery.isLoading;
  const [
    createTask,
    { isLoading: updateLoading, isError: updateError, error: updateerror },
  ] = useCreateTaskMutation();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const payload = {
      title: values.taskTitle,
      taskType: values.taskType,
      description: values.description,
      dueDate: values.dueDate,
      assignedUsers: {
        editorIds: [values.editorID] as [string],
        reviewerIds: [values.reviewerID] as [string],
        approverIds: [values.approverID] as [string],
      },
    };
    try {
      const res = await createTask({
        versionId: values.selectedVersion || "",
        body: payload,
      }).unwrap();
      toast.success(res?.message || "Task created successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user");
    } finally {
      closeDrawer();
      resetForm();
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error((updateerror as any)?.data?.message || "Update failed");
    }
  }, [updateerror]);

  return (
    <>
      {iscommonLoading ? (
        <TaskFormSkeleton />
      ) : (
        <Formik<FormValues>
          initialValues={{
            taskTitle: title || "",
            taskType: "",
            country: countryCode || "",
            type: documentType || "",
            selectedDocument: documentId || "",
            selectedVersion: "",
            description: "",
            dueDate: "",
            editorID: "",
            reviewerID: "",
            approverID: "",
          }}
          validationSchema={CreatetaskFormSchema()}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid, isSubmitting, values, setFieldValue }) => {
            const documentQuery = useGetDocumentQuery({
              country: values.country,
              search: "",
              type: values.type,
              page: 1,
              pageSize: 1000,
            });

            const documentQueryData = useQueryErrorHandler(
              documentQuery,
              "Get Documents",
            );

            const templateOptions = useMemo(() => {
              return mapToFormikOptions(
                documentQueryData?.data?.data || [],
                "title",
                "id",
              );
            }, [documentQueryData]);

            useEffect(() => {
              if (values.selectedDocument) {
                setFieldValue("selectedDocument", "");
              }
              if (documentId && versionId) {
                setFieldValue("selectedDocument", documentId);
                setFieldValue("selectedVersion", versionId);
              }
              if (values.selectedVersion) {
                setFieldValue("selectedVersion", "");
              }
            }, [values.country, values.type, documentId, versionId]);

            const versionQuery = useGetDocumentVersionsQuery(
              { docId: values.selectedDocument },
              { skip: !values.selectedDocument },
            );

            const documentVersionsData = useQueryErrorHandler(
              versionQuery,
              "Get Versions",
            );

            const documentVersionOptions = useMemo(() => {
              return mapToFormikOptions(
                documentVersionsData?.data?.versions || [],
                "versionNumber",
                "id",
              );
            }, [documentVersionsData]);

            useEffect(() => {
              if (values.selectedVersion) {
                setFieldValue("selectedVersion", "");
              }
            }, [values.selectedDocument]);

            const typeOptions = useMemo(() => {
              return getDocumentOptions(countriesData, values.country || "");
            }, [countriesData, values.country]);
            return (
              <Form className="space-y-6 mt-4 mb-20">
                <div className="p-4 b space-y-2">
                  <FormikInput
                    label="Task Title"
                    name="taskTitle"
                    placeholder="Enter Task Title"
                  />
                  <div className="flex gap-4 items-start">
                    <FormikSelect
                      name="taskType"
                      label="Task Type"
                      options={tasktypeOptions}
                    />
                    <FormikInput
                      type="date"
                      label="Due Date"
                      name="dueDate"
                      placeholder="Enter Task Title"
                    />
                  </div>
                  <div className="flex gap-4 items-start">
                    <FormikSelect
                      name="country"
                      label="Select country"
                      options={countryOptions}
                      disabled={fromRepo}
                    />
                    {values.country && (
                      <FormikSelect
                        name="type"
                        label="Select Type"
                        options={typeOptions}
                        disabled={fromRepo}
                      />
                    )}
                  </div>
                  <div className="flex gap-4 items-start">
                    {values.country && values.type && (
                      <FormikSelect
                        name="selectedDocument"
                        label="Select Document"
                        isLoading={documentQuery.isLoading}
                        options={templateOptions}
                        disabled={fromRepo}
                      />
                    )}

                    {values.selectedDocument && (
                      <FormikSelect
                        name="selectedVersion"
                        label="Select Document Version"
                        isLoading={versionQuery.isLoading}
                        options={documentVersionOptions}
                        disabled={fromRepo}
                      />
                    )}
                  </div>

                  <FormikTextarea
                    name="description"
                    label="Task Desctiption"
                    rows={3}
                    placeholder="Task Desctiption"
                  />

                  <div className="flex gap-2">
                    <FormikSelect
                      name="editorID"
                      label="Editor"
                      options={userOptions.editorOptions}
                    />
                    <FormikSelect
                      name="reviewerID"
                      label="Reviewer"
                      options={userOptions.reviewerOptions}
                    />
                    <FormikSelect
                      name="approverID"
                      label="Approver"
                      options={userOptions.approverOptions}
                    />
                  </div>
                </div>

                <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
                  <div className="w-full p-4">
                    <DynamicButton
                      variant="submit"
                      isSubmitting={
                        updateLoading || !dirty || !isValid || isSubmitting
                      }
                      text={updateLoading ? "Creating Task..." : "Create Task"}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default CreateTaskDrawer;
