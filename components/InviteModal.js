import GenericModal from "./GenericModal";
import axios from "axios";
import React, { useState } from "react";
import UIButton from "./UI/UIButton";
import { MdOutlineContentCopy } from "react-icons/md";
import { BeatLoader } from "react-spinners";

export default function InviteModal({ isOpen, hide, teamid }) {
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchLink = async () => {
    setError(null);
    setLoading(true);
    const res = await axios.get(
      `/api/teams/${teamid}/invite-link`,
      {},
      {
        withCredentials: true,
      }
    );
    if (!res.data || !res.data.success) {
      setError("Something Went Wrong");
      setLoading(false);
    } else {
      setLink(res.data.link);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <GenericModal
      closeButtonShown
      isOpen={isOpen}
      hide={hide}
      onAfterOpen={fetchLink}
    >
      <div className="flex w-full flex-col justify-between p-5 pt-8 pb-4">
        <div className="flex flex-col mb-6">
          <p className="text-left text-white/[0.7] my-2">
            Share this link with others to invite them to join your team
          </p>
          <></>
          <div className="flex flex-row items-center justify-between bg-dark-200 p-1 rounded-md ring-2 ring-dark-400">
            {loading ? (
              <div className="mx-4 mr-8 flex flex-row items-center opacity-30">
                <p>Generating Link</p>
                <BeatLoader size={6} color="#fff" />
              </div>
            ) : (
              <p className="mx-4 mr-8">{link}</p>
            )}
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
              className="px-3 py-1 bg-dark-400 hover:bg-dark-500 rounded-md flex flex-row items-center"
            >
              Copy <MdOutlineContentCopy className="ml-1" />
            </button>
          </div>
          <p className="text-left text-white/[0.5] my-2 text-sm ml-4">
            This link will expire after 7 days.
          </p>
        </div>
        <UIButton variant="neutral" size="sm" className="w-fit " onClick={hide}>
          Close
        </UIButton>
      </div>
    </GenericModal>
  );
}
