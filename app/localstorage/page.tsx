"use client";
import { useState, useEffect } from "react";

const ExampleComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [storedData, setStoredData] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("username");
    if (dataFromLocalStorage) {
      setStoredData(dataFromLocalStorage);
    }
  }, []);

  const handleSaveData = () => {
    localStorage.setItem("username", userInput);
    setStoredData(userInput);
  };

  const handleClearData = () => {
    localStorage.removeItem("username");
    setStoredData("");
  };

  return (
    <div>
      <p>Stored Data: {storedData}</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter data..."
      />
      <button onClick={handleSaveData}>Save Data</button>
      <button onClick={handleClearData}>Clear Data</button>
    </div>
  );
};

export default ExampleComponent;
