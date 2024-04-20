"use client";
import { useAppContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Signup = (): React.ReactNode => {
  const { user, saveUser } = useAppContext();

  const [form, setForm] = useState({ email: "", password: "", cPassword: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (user?.email && user?.password) {
      redirect("/");
    }
  }, [user]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.password != form.cPassword) {
      return toast.error("Passwords does not match!");
    }
    saveUser(form);
    toast.success("You are now registered!");
  }
  return (
    <div className="h-[100vh] flex items-center flex-col w-full">
      <h2 className="my-10 text-blue-400 font-semibold text-xl">
        Register New account
      </h2>
      <form
        className="mx-auto border w-[90%] sm:w-90 md:w-1/2 lg:w-1/3 border-1 border-blue-400 p-10 rounded-xl shadow-md shadow-blue-400"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            name="email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 "
            placeholder="john@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter unique password"
            onChange={handleChange}
            name="password"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            required
            minLength={8}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium "
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            onChange={handleChange}
            placeholder="Enter password again"
            name="cPassword"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            required
          />
        </div>

        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default Signup;
