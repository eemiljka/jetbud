"use client";

import Sidebar from "@/components/Sidebar";
import Divider from "@/components/Divider";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useGetUserInfo } from "@/hoooks/apiHooks";
import { User } from "@/types/DBTypes";
import UpdateUsernameForm from "../username/page";
import UpdatePasswordForm from "../password/page";
import UpdateEmailForm from "../email/page";

const Profile: React.FC = () => {
  const { profileInfo, profileIsLoading, profileError, refetchUserInfo } =
    useGetUserInfo();

  const [changeUsernameModalIsOpen, setChangeUsernameModalIsOpen] =
    React.useState(false);

  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] =
    React.useState(false);

  const [changeEmailModalIsOpen, setChangeEmailModalIsOpen] =
    React.useState(false);

  function openChangeUsernameModal() {
    setChangeUsernameModalIsOpen(true);
  }

  function closeChangeUsernameModal() {
    setChangeUsernameModalIsOpen(false);
  }

  function openChangePasswordModal() {
    setChangePasswordModalIsOpen(true);
  }

  function closeChangePasswordModal() {
    setChangePasswordModalIsOpen(false);
  }

  function openChangeEmailModal() {
    setChangeEmailModalIsOpen(true);
  }

  function closeChangeEmailModal() {
    setChangeEmailModalIsOpen(false);
  }

  useEffect(() => {
    refetchUserInfo();
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translate(-50%, 0)",
      width: "500px",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "20px",
      borderRadius: "8px",
    },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        {/* profile content goes here */}
        <div className="flex justify-center">
          <div
            className="bg-white rounded-lg shadow-md p-8"
            style={{ width: "500px", height: "500px" }}
          >
            <h2 className="text-2xl font-semibold mb-10 flex justify-center">
              Profile
            </h2>
            <p>Username</p>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">
                {" "}
                {/*Loading state*/}
                {profileIsLoading && <p>Loading username...</p>}
                {/*Error state*/}
                {profileError && (
                  <p className="text-red-500">Error: {profileError}</p>
                )}
                {!profileIsLoading &&
                  !profileError &&
                  profileInfo.map((user: User) => (
                    <div key={user.user_id}>{user.username}</div>
                  ))}
              </h3>
              <button
                onClick={openChangeUsernameModal}
                className="hover:bg-zinc-100 rounded-md p-1"
              >
                <PencilIcon className="w-5 h-5 text-zinc-600" />
              </button>
              <Modal
                className={"bg-white rounded-lg shadow-md p-8"}
                style={customStyles}
                isOpen={changeUsernameModalIsOpen}
                onRequestClose={closeChangeUsernameModal}
                contentLabel="Change Username"
              >
                <UpdateUsernameForm
                  closeChangeUsernameModal={closeChangeUsernameModal}
                />
              </Modal>
            </div>
            <Divider />
            <p className="mt-10">Email</p>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">
                {" "}
                {/*Loading state*/}
                {profileIsLoading && <p>Loading email...</p>}
                {/*Error state*/}
                {profileError && (
                  <p className="text-red-500">Error: {profileError}</p>
                )}
                {!profileIsLoading &&
                  !profileError &&
                  profileInfo.map((user: User) => (
                    <div key={user.user_id}>{user.email}</div>
                  ))}
              </h3>
              <button
                onClick={openChangeEmailModal}
                className="hover:bg-zinc-100 rounded-md p-1"
              >
                <PencilIcon className="w-5 h-5 text-zinc-600" />
              </button>
              <Modal
                className={"bg-white rounded-lg shadow-md p-8"}
                style={customStyles}
                isOpen={changeEmailModalIsOpen}
                onRequestClose={closeChangeEmailModal}
                contentLabel="Change Email"
              >
                <UpdateEmailForm
                  closeChangeEmailModal={closeChangeEmailModal}
                />
              </Modal>
            </div>
            <Divider />
            <p className="mt-10">Password</p>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">******************</h3>
              <button
                onClick={openChangePasswordModal}
                className="hover:bg-zinc-100 rounded-md p-1"
              >
                <PencilIcon className="w-5 h-5 text-zinc-600" />
              </button>
              <Modal
                className={"bg-white rounded-lg shadow-md p-8"}
                style={customStyles}
                isOpen={changePasswordModalIsOpen}
                onRequestClose={closeChangePasswordModal}
                contentLabel="Change Password"
              >
                <UpdatePasswordForm
                  closeChangePasswordModal={closeChangePasswordModal}
                />
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
