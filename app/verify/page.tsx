"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const checkLocalStorage = (username: string) => {
  const storedUsernames =
    JSON.parse(localStorage.getItem("usernames") as string) || [];

  return storedUsernames.some(
    (user: { username: string }) => user.username === username
  );
};

const Page = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const userFromParams = queryParams.get("user") || "";

  const [userExists, setUserExists] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const exists = checkLocalStorage(userFromParams);
    setUserExists(exists);

    if (!exists) {
      setShowDialog(true);
    } else {
      window.location.href = `/homepage?user=${userFromParams}`;
    }
  }, [userFromParams]);

  const handleDialogClose = () => {
    setShowDialog(false);
    window.location.href = "/login";
  };

  return (
    <>
      <div className="bg-[#00040D] w-screen h-screen relative flex flex-col justify-center items-center text-white">
        {showDialog && (
          <Dialog open={true}>
            <DialogContent className="bg-[#070019] text-white font-mono h-40 flex items-center justify-center">
              <div>
                <DialogTitle className="text-center mb-2">
                  Username does not exist
                </DialogTitle>
                <p className="w-full text-center pb-2">{`${userFromParams} does not exist, please sign up first. Redirecting to login...`}</p>
                <div className="w-full flex justify-center">
                  <button
                    onClick={handleDialogClose}
                    className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4"
                  >
                    OK
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Page;
