"use client";

import { useGetUserInfo, useUpdateUsername } from "@/hoooks/apiHooks";
import { PencilIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

interface UpdateUsernameFormProps {
  closeChangeUsernameModal: () => void;
}

const UpdateUsernameForm: React.FC<UpdateUsernameFormProps> = ({
  closeChangeUsernameModal,
}) => {
  const [newUsername, setNewUsername] = useState("");
  const { updateUsername, usernameIsLoading, usernameError, successMessage } =
    useUpdateUsername();

  const { profileInfo, profileError, profileIsLoading, refetchUserInfo } =
    useGetUserInfo();

  function resetForm() {
    setNewUsername("");
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (event: HandleSubmitEvent): Promise<void> => {
    event?.preventDefault();
    if (!newUsername) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await updateUsername(newUsername);
      refetchUserInfo();
      resetForm();
    } catch (err) {
      console.error("Error changing username");
    }
  };

  return (
    <>
      <div>
        <h2 className="w-full">Change Username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="New Username"
            required
            className="border border-gray300 rounded-md w-full p-2 mb-4 mt-4"
          />
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={closeChangeUsernameModal}
              className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
            >
              <XCircleIcon className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button
              className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-900"
              type="submit"
              disabled={usernameIsLoading}
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              {usernameIsLoading ? "Updating..." : "Update Username"}
            </button>
          </div>
        </form>
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </>
  );
};

export default UpdateUsernameForm;
