import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import mylogo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import student from "../assets/student.svg";
import chapter from "../assets/chapter.svg";
import help from "../assets/help.svg";
import reports from "../assets/reports.svg";
import setting from "../assets/setting.svg";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <>
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 fixed md:relative bg-white w-4/5 md:w-1/5 h-screen p-4 z-20`}
      >
        <div className="flex justify-center md:justify-start mb-8">
          <img src={mylogo} alt="logo" className="w-32" />
        </div>

        <nav className="space-y-1 flex flex-col font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-gray-100 flex items-center gap-3 py-2 px-3 rounded-md"
                : "text-gray-600 flex items-center gap-3 py-2 px-3"
            }
          >
            <img src={dashboard} alt="icon" className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-gray-100 flex items-center gap-3 py-2 px-3 rounded-md"
                : "text-gray-600 flex items-center gap-3 py-2 px-3"
            }
          >
            <img src={student} alt="icon" className="w-5 h-5" />
            <span>Students</span>
          </NavLink>

          <NavLink
            to="/chapter"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-gray-100 flex items-center gap-3 py-2 px-3 rounded-md"
                : "text-gray-600 flex items-center gap-3 py-2 px-3"
            }
          >
            <img src={chapter} alt="icon" className="w-5 h-5" />
            <span>Chapter</span>
          </NavLink>

          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-gray-100 flex items-center gap-3 py-2 px-3 rounded-md"
                : "text-gray-600 flex items-center gap-3 py-2 px-3"
            }
          >
            <img src={help} alt="icon" className="w-5 h-5" />
            <span>Help</span>
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-gray-100 flex items-center gap-3 py-2 px-3 rounded-md"
                : "text-gray-600 flex items-center gap-3 py-2 px-3"
            }
          >
            <img src={reports} alt="icon" className="w-5 h-5" />
            <span>Reports</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-gray-100 flex items-center gap-3 py-2 px-3 rounded-md"
                : "text-gray-600 flex items-center gap-3 py-2 px-3"
            }
          >
            <img src={setting} alt="icon" className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
