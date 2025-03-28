"use client";

import { useUpdateUsername } from "@/hoooks/apiHooks";
import { useState } from "react";

const UpdateUsernameForm = () => {
  const [newUsername, setNewUsername] = useState("");
  const { updateUsername, usernameIsLoading, usernameError, successMessage } =
    useUpdateUsername();

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    await updateUsername(newUsername);
  };

  return (
    <div>
      <h2>Change username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter new username"
          required
        />
        <button type="submit" disabled={usernameIsLoading}>
          {usernameIsLoading ? "Updating..." : "Update Username"}
        </button>
      </form>
      {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default UpdateUsernameForm;
