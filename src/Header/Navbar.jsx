import React, { useState } from "react";
import search from "../assets/search.svg";
import help from "../assets/help.svg";
import message from "../assets/message.svg";
import set from "../assets/set.svg";
import pic from "../assets/pic.png";

import notification from "../assets/notification.svg";
import logo from "../assets/logo.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../Redux/sidebarSlice";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="bg-gray-50">
      <div className="flex justify-between items-center px-2 py-1 md:p-4 gap-1">

        <img src={logo} alt="Logo" className="md:hidden mr-2 w-14 h-14" />

        <div className="flex items-center w-1/2  md:w-[55%] bg-white rounded-md px-4 py-2 gap-2">
          <img src={search} alt="Search Icon" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search your course"
            className=" overflow-hidden border-none focus:outline-none text-gray-600"
          />
        </div>

        <div className="flex items-center md:gap-10 gap-2">
          <div className="hidden md:flex items-center gap-10">
            <button>
              <img src={help} alt="Help Icon" />
            </button>
            <button className="relative">
              <img src={message} alt="Message Icon" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <button>
              <img src={set} alt="Settings Icon" />
            </button>
            <button>
              <img src={notification} alt="Notification Icon" />
            </button>
          </div>

          {/* Dropdown Menu for Mobile view*/}
          <div className="relative md:hidden">
            <button
              className="text-3xl text-gray-500 hover:text-gray-700"
              onClick={toggleDropdown}
            >
              <RiArrowDropDownLine />
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <img src={help} alt="Help Icon" className="w-5 h-5" />
                    <span>Help</span>
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <img src={message} alt="Message Icon" className="w-5 h-5" />
                    <span>Messages</span>
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <img src={set} alt="Settings Icon" className="w-5 h-5" />
                    <span>Settings</span>
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <img
                      src={notification}
                      alt="Notification Icon"
                      className="w-5 h-5"
                    />
                    <span>Notifications</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <img
              src={pic}
              alt="User Profile"
              className="w-8 h-8 rounded-md border border-gray-300"
            />
            <p className="font-medium text-gray-700 hidden md:block">
              Adeline H. Dancy
            </p>
          </div>

          <button
            className="md:hidden text-2xl text-gray-500 hover:text-gray-700"
            onClick={handleToggleSidebar}
          >
            <HiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
