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
  DialogClose,
} from "@/components/ui/dialog";

const Page = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const userFromParams = queryParams.get("user") || "";
  const projectNameParam = queryParams.get("project") || "";

  const [user, setUser] = useState<string>(userFromParams);
  const [projectName, setProjectName] = useState<string>(projectNameParam);
  const [projectListItems, setProjectListItems] = useState<
    { text: string; user: string; projectName: string; isChecked: boolean }[]
  >([]);
  const [newItem, setNewItem] = useState<string>("");
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editItemText, setEditItemText] = useState<string>("");

  useEffect(() => {
    const storedListItems = localStorage.getItem("listItems");
    if (storedListItems) {
      const allListItems = JSON.parse(storedListItems);
      const filteredProjectItems = allListItems.filter(
        (item: any) => item.user === user && item.projectName === projectName
      );
      setProjectListItems(filteredProjectItems);
    } else {
      setProjectListItems([]);
    }
  }, [user, projectName]);

  useEffect(() => {
    setUser((prevUser) => userFromParams || prevUser);
    setProjectName((prevProjectName) => projectNameParam || prevProjectName);
  }, [userFromParams, projectNameParam]);

  const handleAddListItem = (newItemText: string) => {
    const storedListItems = localStorage.getItem("listItems");
    const existingData = storedListItems ? JSON.parse(storedListItems) : [];

    const newItem = {
      text: newItemText,
      user: user,
      projectName: projectName,
      isChecked: false,
    };

    const updatedProjectListItems = [...existingData, newItem];

    localStorage.setItem("listItems", JSON.stringify(updatedProjectListItems));

    const latestStoredItems = localStorage.getItem("listItems");
    if (latestStoredItems) {
      const latestData = JSON.parse(latestStoredItems);
      const filteredProjectItems = latestData.filter(
        (item: any) => item.user === user && item.projectName === projectName
      );

      setProjectListItems(filteredProjectItems);
    }
    setNewItem("");
    setIsDialogVisible(false);
  };

  const handleCheckboxToggle = (index: number) => {
    const updatedProjectListItems = [...projectListItems];
    updatedProjectListItems[index].isChecked =
      !updatedProjectListItems[index].isChecked;
    setProjectListItems(updatedProjectListItems);

    const storedListItems = localStorage.getItem("listItems");
    const existingData = storedListItems ? JSON.parse(storedListItems) : [];

    const updatedData = existingData.map((item: any) => {
      if (
        item.user === user &&
        item.projectName === projectName &&
        item.text === updatedProjectListItems[index].text
      ) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });

    localStorage.setItem("listItems", JSON.stringify(updatedData));
  };

  const handleEditItem = (index: number) => {
    if (editIndex !== null) {
      const storedListItems = localStorage.getItem("listItems");
      const existingData = storedListItems ? JSON.parse(storedListItems) : [];

      const updatedData = existingData.map((item: any) => {
        if (
          item.user === user &&
          item.projectName === projectName &&
          item.text === projectListItems[editIndex].text
        ) {
          return { ...item, text: editItemText };
        }
        return item;
      });

      localStorage.setItem("listItems", JSON.stringify(updatedData));

      // Update the state with filtered items
      const filteredItems = updatedData.filter(
        (item: any) => item.user === user && item.projectName === projectName
      );
      setProjectListItems(filteredItems);

      setEditIndex(null);
      setEditItemText("");
    }
  };

  const handleDeleteItem = (index: number) => {
    const storedListItems = localStorage.getItem("listItems");
    if (storedListItems) {
      const prevItems = JSON.parse(storedListItems);
      const updatedProjectListItems = prevItems.filter(
        (item: any) => item.user === user && item.projectName === projectName
      );

      if (index >= 0 && index < updatedProjectListItems.length) {
        updatedProjectListItems.splice(index, 1);

        const allItems = JSON.parse(localStorage.getItem("listItems") || "[]");
        const updatedItems = allItems.filter(
          (item: any) => item.user !== user || item.projectName !== projectName
        );
        updatedItems.push(...updatedProjectListItems);
        localStorage.setItem("listItems", JSON.stringify(updatedItems));

        setProjectListItems(updatedProjectListItems);
      }
    }
  };

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
          <div className="custom-input-container flex flex-col">
            <button
              onClick={() => setIsDialogVisible(true)}
              className={`bg-black size-10 rounded-md ${
                isDialogVisible ? "hidden" : ""
              }`}
            >
              +
            </button>
            {isDialogVisible && (
              <Dialog open={isDialogVisible}>
                <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
                  <div>
                    <DialogTitle className=" justify-center flex ">
                      Add new item:
                    </DialogTitle>
                    <input
                      type="text"
                      placeholder=""
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      className="custom-input bg-black border-white border w-80 mt-2  rounded-sm"
                    />
                    <div className="w-full flex justify-center mt-4">
                      <DialogClose
                        onClick={() => {
                          setIsDialogVisible(false);
                          handleAddListItem(newItem);
                          setNewItem("");
                        }}
                        className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4"
                      >
                        Ok
                      </DialogClose>
                      <DialogClose
                        onClick={() => {
                          setIsDialogVisible(false);
                        }}
                        className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4"
                      >
                        Cancel
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="text-black absolute top-0 left-0 w-full h-full flex mt-36 justify-center">
          {projectListItems.filter((item) => item.isChecked).length} <p>/</p>{" "}
          {projectListItems.length} <p className="ml-1 font-semibold">Done</p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="list h-96 w-4/12 flex justify-center  mt-80 pt-3 overflow-y-auto ">
            <ul className="w-96">
              {projectListItems.map((item, index) => (
                <li className="flex items-center  my-3 text-lg" key={index}>
                  <span className="mr-2">{index + 1}.</span>
                  {item.text}
                  <div className="flex justify-end w-full">
                    <input
                      type="checkbox"
                      className="ml-6 size-5"
                      checked={item.isChecked}
                      onChange={() => handleCheckboxToggle(index)}
                    />

                    <Dialog>
                      <DialogTrigger>
                        <Pen
                          className="size-5 ml-2"
                          onClick={() => {
                            setEditIndex(index);
                            setEditItemText(item.text);
                          }}
                        />
                      </DialogTrigger>

                      <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
                        <div>
                          <DialogTitle className="justify-center flex ">
                            Edit item:
                          </DialogTitle>

                          <input
                            type="text"
                            placeholder=""
                            value={editItemText}
                            onChange={(e) => setEditItemText(e.target.value)}
                            className="custom-input bg-black border-white border w-80 mt-2  rounded-sm"
                          />

                          <div className="w-full flex justify-center mt-4">
                            <DialogClose
                              className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4"
                              onClick={() => handleEditItem(index)}
                            >
                              Ok
                            </DialogClose>
                            <DialogClose
                              onClick={() => {}}
                              className="bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4"
                            >
                              Cancel
                            </DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger>
                        <Trash className="size-5 ml-2" />
                      </DialogTrigger>
                      <DialogContent className="bg-[#070019] text-white font-mono h-40 flex items-center justify-center">
                        <div>
                          <DialogTitle className="text-center mb-2">
                            Confirm Deletion
                          </DialogTitle>
                          <p className="text-center text-sm mb-4">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="w-full flex justify-center">
                            <DialogClose
                              onClick={() => handleDeleteItem(index)}
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
