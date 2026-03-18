"use client";
import DynamicButton from "@/components/common/DynamicButton";
import { useDialog } from "@/components/hooks/DialogProvider";
import { apiSlice } from "@/lib/redux/slices/apislice";
import { useLogoutMutation } from "@/lib/redux/slices/authApi";
import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type Props = {
  onCancel?: () => void;
};

const LogoutDialog = ({ onCancel }: Props) => {
  const { closeDialog } = useDialog();
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const refreshToken = getCookie("refreshToken");
      await logout({ refreshToken: refreshToken || "" }).unwrap();
      dispatch(apiSlice.util.resetApiState());
      document.cookie = "accessToken=; Max-Age=0; path=/";
      document.cookie = "refreshToken=; Max-Age=0; path=/";
      localStorage.removeItem("userInfo");

      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Logout API error:", error);

      toast.error(
        error?.data?.message || "Something went wrong while logging out",
      );
    }
  };

  return (
    <div className="w-full flex flex-col text-center justify-between gap-20 h-full">
      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to logout?
      </h2>

      <div className="flex items-center justify-baseline gap-8 w-full">
        <DynamicButton
          text="Cancel"
          onClick={onCancel || closeDialog}
          variant="outline"
        />

        <DynamicButton
          text={isLoading ? "Logging out..." : "Logout"}
          onClick={handleLogout}
          isSubmitting={isLoading}
          variant="danger"
        />
      </div>
    </div>
  );
};

export default LogoutDialog;
