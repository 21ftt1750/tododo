"use client";
import React, { useEffect, useState } from "react";

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
      <div>
        <button onClick={() => setIsDialogVisible(true)}>Add Item</button>
      </div>

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
    </>
  );
};

export default Page;
