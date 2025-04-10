"use client";

import { useGetUserInfo, useUpdatePassword } from "@/hoooks/apiHooks";
import { PencilIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

interface UpdatePasswordFormProps {
  closeChangePasswordModal: () => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  closeChangePasswordModal,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const { updatePassword, passwordIsLoading, passwordError, successMessage } =
    useUpdatePassword();

  const { refetchUserInfo } = useGetUserInfo();

  function resetForm() {
    setNewPassword("");
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (event: HandleSubmitEvent): Promise<void> => {
    event.preventDefault();
    if (!newPassword) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await updatePassword(newPassword);
      refetchUserInfo();
      resetForm();
    } catch (err) {
      console.error("Error changing password");
    }
  };

  return (
    <>
      <div>
        <h2 className="w-full">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
            className="border border-gray300 rounded-md w-full p-2 mb-4 mt-4"
          />
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={closeChangePasswordModal}
              className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
            >
              <XCircleIcon className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button
              className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-900"
              type="submit"
              disabled={passwordIsLoading}
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              {passwordIsLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </>
  );
};

export default UpdatePasswordForm;
