import { useGetUserInfo, useUpdateEmail } from "@/hoooks/apiHooks";
import { PencilIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface UpdateEmailFormProps {
  closeChangeEmailModal: () => void;
}
interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

const UpdateEmailForm: React.FC<UpdateEmailFormProps> = ({
  closeChangeEmailModal,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const { emailIsLoading, emailError, successMessage, updateEmail } =
    useUpdateEmail();

  const { refetchUserInfo } = useGetUserInfo();

  function resetForm() {
    setNewEmail("");
  }

  const handleSubmit = async (event: HandleSubmitEvent): Promise<void> => {
    event.preventDefault();
    if (!newEmail) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await updateEmail(newEmail);
      refetchUserInfo();
      resetForm();
    } catch (err) {
      console.error("Error changing password");
    }
  };

  return (
    <>
      <div>
        <h2 className="w-full">Change Email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email"
            required
            className="border border-gray-300 rounded-md w-full p-2 mb-4 mt-4"
          />
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
              type="button"
              onClick={closeChangeEmailModal}
            >
              <XCircleIcon className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button
              className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-900"
              type="submit"
              disabled={emailIsLoading}
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              {emailIsLoading ? "Updating..." : "Update Email"}
            </button>
          </div>
        </form>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </>
  );
};

export default UpdateEmailForm;
