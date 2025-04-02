"use client";

import { useGetUserInfo, useUpdateUsername } from "@/hoooks/apiHooks";
import { PencilIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const UpdateUsernameForm = () => {
  const [newUsername, setNewUsername] = useState("");
  const { updateUsername, usernameIsLoading, usernameError, successMessage } =
    useUpdateUsername();

  const { profileInfo, profileError, profileIsLoading, refetchUserInfo } =
    useGetUserInfo();

  const [changeUsernameModalIsOpen, setChangeUsernameModalIsOpen] =
    useState(false);

  function closeChangeUsernameModal() {
    setChangeUsernameModalIsOpen(false);
    resetForm();
  }

  function resetForm() {
    setNewUsername("");
  }

  const handleSubmit = async () => {
    if (!newUsername) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await updateUsername(newUsername);
      refetchUserInfo();
      resetForm();
      closeChangeUsernameModal();
    } catch (err) {
      console.error("Error changing username");
    }
  };

  return (
    <div>
      <h2 className="w-full">Change Username</h2>
      <form>
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
            style={{ width: "112px" }}
            className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
            onClick={closeChangeUsernameModal}
          >
            <XCircleIcon className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
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
  );
};

export default UpdateUsernameForm;
