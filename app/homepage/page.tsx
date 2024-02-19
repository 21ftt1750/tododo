"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { ChevronLeft, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import paper from "../../public/images/paper.png";

interface Project {
  id: number;
  project: string;
}

const LandingPage = () => {
  const [storedUsernames, setStoredUsernames] = useState<
    { username: string; items: string[] }[]
  >([]);
  const [queryUsername, setQueryUsername] = useState<string>("");
  const [queriedItems, setQueriedItems] = useState<string[]>([]);

  const [projectName, setProjectName] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editProjectIndex, setEditProjectIndex] = useState<number>(-1);
  const [user2, setUser] = useState<string>("");
  const [usernameInput, setUsernameInput] = useState<string>(user2);
  const [itemInput, setItemInput] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userFromParams = queryParams.get("user");
    if (userFromParams !== null) {
      setUser(userFromParams);
    }
  }, []);

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("usernames");
    if (dataFromLocalStorage) {
      setStoredUsernames(JSON.parse(dataFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    const queriedUser = storedUsernames.find((user) => user.username === user2);

    setQueriedItems(queriedUser?.items ?? []);

    if (!queriedUser) {
    }
  }, [storedUsernames, user2]);

  const handleSaveUsername = () => {
    const existingUserIndex = storedUsernames.findIndex(
      (user) => user.username === user2
    );

    if (existingUserIndex !== -1) {
      // username already exists
      const updatedUsernames = [...storedUsernames];
      updatedUsernames[existingUserIndex].items.push(itemInput);
      localStorage.setItem("usernames", JSON.stringify(updatedUsernames));
      setStoredUsernames(updatedUsernames);
    } else {
      // username is new
      const updatedUsernames = [
        ...storedUsernames,
        { username: user2, items: [itemInput] },
      ];
      localStorage.setItem("usernames", JSON.stringify(updatedUsernames));
      setStoredUsernames(updatedUsernames);
    }

    setUsernameInput("");
    setItemInput("");
  };

  const handleClearProject = (username: string, itemIndex: number) => {
    const updatedUsernames = storedUsernames.map((user) => ({ ...user }));
    const userIndex = updatedUsernames.findIndex(
      (user) => user.username === username
    );

    if (
      userIndex !== -1 &&
      itemIndex >= 0 &&
      itemIndex < updatedUsernames[userIndex].items.length
    ) {
      updatedUsernames[userIndex].items.splice(itemIndex, 1);

      localStorage.setItem("usernames", JSON.stringify(updatedUsernames));
      setStoredUsernames(updatedUsernames);
    }

    setIsDialogOpen(false);
  };

  const handleEditProjectName = (username: string, itemIndex: number) => {
    if (itemIndex !== -1) {
      const updatedUsernames = [...storedUsernames];
      const userIndex = updatedUsernames.findIndex(
        (user) => user.username === username
      );

      if (
        userIndex !== -1 &&
        itemIndex >= 0 &&
        itemIndex < updatedUsernames[userIndex].items.length
      ) {
        updatedUsernames[userIndex].items[itemIndex] = projectName;

        localStorage.setItem("usernames", JSON.stringify(updatedUsernames));
        setStoredUsernames(updatedUsernames);
        setIsEditDialogOpen(false);
      }
    }
  };
  return (
    <div className="bg-[#00040D] w-screen h-screen relative  pt-8 text-white">
      <div className="  flex justify-center items-center pb-28">
        <div className="flex items-center w-1/3">
          <Image src={logo} alt="" className="size-16" />
        </div>
        <p className="text-3xl w-1/4">
          Welcome to Todo
          <a href="" className="text-[#D298FF]">
            do
          </a>
          !
        </p>
        <div className="w-1/4 flex justify-end">
          <p className="mr-2 flex items-end">
            Hello,{" "}
            <a href="" className=" ml-1 font-bold uppercase  ">
              {user2}
            </a>
            !
          </p>
          <Dialog>
            <DialogTrigger className=" border rounded-md flex justify-center w-28 h-8 items-center">
              <p className="text-sm font-mono">Sign Out</p>
            </DialogTrigger>
            <DialogContent className="bg-[#070019] text-white font-mono h-40 flex items-center justify-center">
              <div>
                <DialogTitle className="text-center mb-2">
                  Confirm Sign Out
                </DialogTitle>
                <p className="text-center text-sm mb-4">
                  Are you sure you want to Sign Out of{" "}
                  <a href="" className=" font-bold uppercase">
                    {user2}
                  </a>
                  ?
                </p>
                <div className="w-full flex justify-center">
                  <DialogClose
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    type="button"
                    className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4"
                  >
                    Yes
                  </DialogClose>
                  <DialogClose
                    type="button"
                    className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm"
                  >
                    No
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* ----------------------------------------- */}
      <div className="w-9/12 flex items-start ml-32">
        <div className="flex">
          {queriedItems.map((item, index) => (
            <div
              key={index}
              className="project border rounded-2xl w-48 h-44 items-center justify-center bg-[#070019] mx-4"
            >
              <div className="flex flex-col justify-center items-center">
                <Link
                  href={`/project?project=${encodeURIComponent(
                    item
                  )}&user=${encodeURIComponent(user2)}`}
                  passHref
                >
                  <Image src={paper} alt={"paper"} />
                </Link>
                <p className="flex justify-center text-lg">
                  {item}
                  <Dialog>
                    <DialogTrigger>
                      <div className="ml-2 cursor-pointer">
                        <Pen
                          strokeWidth={1}
                          onClick={() => {
                            setProjectName(queriedItems[index]);
                            setEditProjectIndex(index);
                            setIsEditDialogOpen(true);
                          }}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
                      <div className="w-full">
                        <DialogTitle className="justify-center flex">
                          Edit Project Name:
                        </DialogTitle>
                        <form>
                          <div className="flex justify-center my-6">
                            <Input
                              id="name"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              className="bg-black border rounded-sm h-6 w-10/12"
                            />
                          </div>
                          <div className="flex justify-center">
                            <DialogClose
                              onClick={() =>
                                handleEditProjectName(user2, index)
                              }
                              className="bg-[#10142c] h-6 w-14 text-[#D298FF] text-sm mr-4 "
                            >
                              Ok
                            </DialogClose>
                            <DialogClose
                              type="button"
                              className="bg-[#10142c] h-6 w-14 text-[#D298FF] text-sm"
                            >
                              Cancel
                            </DialogClose>
                          </div>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger>
                      <Trash2 className="ml-2 cursor-pointer" strokeWidth={1} />
                    </DialogTrigger>
                    <DialogContent className="bg-[#070019] text-white font-mono h-40 flex items-center justify-center">
                      <div>
                        <DialogTitle className="text-center">
                          Confirm Deletion
                        </DialogTitle>
                        <p className="text-center text-sm mb-4">
                          Are you sure you want to delete this project?
                        </p>
                        <div className="w-full flex justify-center">
                          <DialogClose
                            type="button"
                            onClick={() => handleClearProject(user2, index)}
                            className="bg-[#10142c] h-6 w-14 rounded-md text-[#D298FF] text-sm mr-4"
                          >
                            Yes
                          </DialogClose>
                          <DialogClose
                            type="button"
                            className="bg-[#10142c] h-6 w-14 rounded-md text-[#D298FF] text-sm"
                          >
                            No
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen}>
          <DialogTrigger>
            <div
              className="border rounded-2xl w-48 h-44 flex items-center justify-center bg-[#070019] mx-4"
              onClick={() => setIsDialogOpen(true)}
            >
              <p className="text-xl font-mono w-4 flex justify-center cursor-pointer">
                New Project
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
            <div className="w-full">
              <DialogTitle className="justify-center flex">
                Project Name:
              </DialogTitle>
              <div className="flex justify-center my-6">
                <Input
                  id="name"
                  value={itemInput}
                  onChange={(e) => setItemInput(e.target.value)}
                  className="bg-black border rounded-sm h-6 w-10/12"
                />
              </div>
              <div className="flex justify-center">
                <DialogClose
                  type="button"
                  onClick={() => {
                    handleSaveUsername();
                    setIsDialogOpen(false);
                  }}
                  className="bg-[#10142c] h-6 w-14 text-[#D298FF] text-sm mr-4 "
                >
                  Ok
                </DialogClose>
                <DialogClose
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-[#10142c] h-6 w-14 text-[#D298FF] text-sm"
                >
                  Cancel
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LandingPage;
