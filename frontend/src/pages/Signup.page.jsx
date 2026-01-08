import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = function () {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "User registered successfully");
        navigate("/login");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gray-100 dark:bg-gray-900"
    >
      <div
        className="w-full max-w-md bg-white dark:bg-gray-800 
        p-6 rounded-lg shadow-md"
      >
        <h2
          className="text-2xl font-semibold text-center 
          text-gray-800 dark:text-white mb-6"
        >
          Create Account
        </h2>

        <form className=" flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm mb-1 
              text-gray-600 dark:text-gray-300"
            >
              Bio
            </label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
