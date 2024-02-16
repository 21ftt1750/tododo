"use client";
import { useState, useEffect } from "react";

const ExampleComponent = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [itemInput, setItemInput] = useState<string>("");
  const [storedUsernames, setStoredUsernames] = useState<
    { username: string; items: string[] }[]
  >([]);
  const [queryUsername, setQueryUsername] = useState<string>("");
  const [user2, setUser] = useState<string>("");
  const [queriedItems, setQueriedItems] = useState<string[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userFromParams = queryParams.get("user");
    if (userFromParams !== null) {
      setUser(userFromParams);
    }
  }, []);

  // Load data from localStorage on component mount
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("usernames");
    if (dataFromLocalStorage) {
      setStoredUsernames(JSON.parse(dataFromLocalStorage));
    }

    // Query the user from the stored usernames
    const queriedUser = storedUsernames.find((user) => user.username === user2);

    setQueriedItems(queriedUser?.items ?? []);

    if (!queriedUser) {
      setQueriedItems(["User not found"]);
    }
  }, [storedUsernames, user2]);

  const handleSaveUsername = () => {
    const existingUserIndex = storedUsernames.findIndex(
      (user) => user.username === user2
    );

    if (existingUserIndex !== -1) {
      // If the username already exists, append the new item
      const updatedUsernames = [...storedUsernames];
      updatedUsernames[existingUserIndex].items.push(itemInput);
      localStorage.setItem("usernames", JSON.stringify(updatedUsernames));
      setStoredUsernames(updatedUsernames);
    } else {
      // If the username is new, create a new entry
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

  const handleClearUsernames = () => {
    localStorage.removeItem("usernames");
    setStoredUsernames([]);
  };

  return (
    <div>
      <p>Stored items:</p>
      <ul>
        {storedUsernames.map((user, index) => (
          <li key={index}>
            {user.username} - {user.items.join(", ")}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Enter username..."
        />
        <input
          type="text"
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
          placeholder="Enter item..."
        />
        <button onClick={handleSaveUsername}>Save Username</button>
        <button onClick={handleClearUsernames}>Clear Usernames</button>
      </div>

      <div>
        <p>Queried Items: {queriedItems}</p>
      </div>
    </div>
  );
};

export default ExampleComponent;
