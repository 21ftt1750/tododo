"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
const LandingPage = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Save username
    const userObject = { username: usernameInput, items: [] };
    const storedUsernames = JSON.parse(
      localStorage.getItem("usernames") || "[]"
    );
    storedUsernames.push(userObject);
    localStorage.setItem("usernames", JSON.stringify(storedUsernames));

    window.location.href = `/homepage?user=${encodeURIComponent(
      usernameInput
    )}`;
  };
  return (
    <div className="bg-[#00040D] w-screen h-screen relative flex flex-col justify-center items-center text-white">
      <Link
        href="/login"
        className="absolute top-0 left-0 mt-12 ml-16 flex items-center"
      >
        <ChevronLeft className="size-8" />{" "}
        <Image src={logo} alt="" className="size-16" />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-4/12 h-80 rounded-2xl border bg-[#070019] font-mono"
      >
        <p className="mt-5 mb-3">Sign Up</p>
        <div className="w-full  flex justify-center">
          <div>
            <p className="text-sm">Username:</p>
            <input
              className="border h-7 text-xs px-2 w-80 rounded-sm flex items-center bg-[#00040D]"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="w-full  flex justify-center mt-4 ">
          <div>
            <p className="text-sm">Password:</p>
            <input
              type="password"
              className="border h-7 text-xs px-2 w-80 rounded-sm flex items-center bg-[#00040D]"
              required
            />
          </div>
        </div>

        <div className="w-full  flex justify-center mt-4 ">
          <div>
            <p className="text-sm">Confirm Password:</p>
            <input
              type="password"
              className="border h-7 text-xs px-2 w-80 rounded-sm flex items-center bg-[#00040D]"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="border h-10 text-xs px-2 mt-6 w-24 justify-center rounded-md flex items-center"
        >
          <p className="flex justify-center">OK</p>
        </button>
      </form>

      <div className="mt-4 text-4xl">
        Welcome to Todo
        <a className="text-[#D298FF]">do</a>!
      </div>
      <div className="font-mono w-72 text-center flex items-start justify-center mt-6">
        <ul
          className="list-none"
          style={{ listStyle: "inside", color: "#ffffff" }}
        >
          <li>a website where you can write your checklists for free</li>
        </ul>
        <input
          type="checkbox"
          className="size-8 custom-checkbox"
          checked={true}
          readOnly
        />
      </div>
    </div>
  );
};

export default LandingPage;
