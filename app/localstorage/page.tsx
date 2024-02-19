"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import background from "../../public/images/project.png";
import Link from "next/link";
import { ChevronLeft, Pen, Trash } from "lucide-react";
import logo from "../../public/images/logo.png";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const Page = () => {
  const [listItems, setListItems] = useState<
    { text: string; user: string; projectName: string }[]
  >([]);
  const [newItem, setNewItem] = useState<string>("");
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userFromParams = queryParams.get("user");
    if (userFromParams !== null) {
      setUser(userFromParams);
    }

    const projectNameParam = queryParams.get("project");
    if (projectNameParam !== null) {
      setProjectName(projectNameParam);
    }
  }, [projectName]);

  const handleAddListItem = (newItemText: string) => {
    // Retrieve the existing data from localStorage
    const storedData = localStorage.getItem("listItems");

    // Parse the existing data or initialize an empty array
    const existingData = storedData ? JSON.parse(storedData) : [];

    // Add the new item to the array with user and projectName
    existingData.push({
      text: newItemText,
      user: user,
      projectName: projectName,
    });

    // Save the updated data back to localStorage
    localStorage.setItem("listItems", JSON.stringify(existingData));

    // Update the state with the new data
    setListItems(existingData);
  };

  useEffect(() => {
    // Load listItems from localStorage on component mount
    const storedListItems = localStorage.getItem("listItems");
    if (storedListItems) {
      setListItems(JSON.parse(storedListItems));
    }
  }, []);

  const filteredItems = listItems.filter(
    (item) => item.user === user && item.projectName === projectName
  );

  return (
    <>
      <div className="relative w-full h-24 flex bg-[#00040D] text-white font-mono">
        <div className="w-1/3 flex items-center justify-start">
          <Link
            href={`/homepage?user=${encodeURIComponent(user)}`}
            className="ml-8 flex items-center"
          >
            <ChevronLeft className="size-8" />
            <Image src={logo} alt="" className="size-16" />
          </Link>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <p className="text-2xl">{projectName}</p>
        </div>
        <div className="w-1/3 mr-4 flex items-center justify-end">
          <p className="mr-2 flex items-end">
            Hello,{" "}
            <a href="" className=" ml-1 font-bold uppercase  ">
              {user}
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
                    {user}
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

      <div className="relative bg-[#f5f5f5] h-96">
        <Image src={background} alt={"background"} />

        <div className="absolute top-0 left-0 ml-96 mt-32 text-white flex flex-col z-10 ">
          <div className="custom-input-container flex flex-col text-black">
            <button onClick={() => setIsDialogVisible(true)}>Add Item</button>

            <div>
              {filteredItems.map((item, index) => (
                <div key={index}>{item.text}</div>
              ))}
            </div>

            {isDialogVisible && (
              <div>
                <input
                  type="text"
                  placeholder="Enter new item"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleAddListItem(newItem);
                    setIsDialogVisible(false);
                    setNewItem("");
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
