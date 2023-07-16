"use client";
import React, { useState, memo } from "react";
import Image from "next/image";
import { Modal, VerifyEmail } from "../components/Modal";
import { AiOutlineEye } from "react-icons/ai";
import { BsUnlock } from "react-icons/bs";
import { emailRegex, waitATime } from "../components/utils/utilityFunction";
import { toast, ToastContainer } from "react-toastify";

import { signup } from "../../API";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    userEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    //=================state for password and confirm password input type ==========
    passwordInput: true,
    confirmPasswordInput: true,
  });
  const validation = () => {
    let message = "";
    let stringTest = /^[A-Za-z]+/;
    let phoneFormate = /^[0-9]+$/;
    // let emailFormate=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let firstnamevalue = formState.firstname?.trim();
    let lastnamevalue = formState.lastname?.trim();
    //  let email=formState.email?.trim()
    let phone = formState.phoneNumber?.trim();
    let isFnameValid = stringTest.test(firstnamevalue);
    let isLnameValid = stringTest.test(lastnamevalue);
    let isValidPhone = phoneFormate.test(phone);
    //  let isValidEmail=emailFormate.test(email)
    if (firstnamevalue === "") {
      return (message = "Please enter your first name; it must not be empty.");
    }
    if (!isFnameValid) {
      return (message =
        "Please enter a valid first name. The name you provided is not valid.");
    }
    if (lastnamevalue === "") {
      return (message = "Please enter your last name; it must not be empty.");
    }
    if (!isLnameValid) {
      return (message =
        "Please enter a valid last name. The name you provided is not valid.");
    }
    if (phone.length < 8) {
      return (message = "Please enter a valid  phone number");
    }
    if (!isValidPhone) {
      return (message = "Please enter a valid  phone number");
    }
    if (phone.length > 15) {
      return (message = "Please enter a valid  phone number");
    }
  };
  const router = useRouter();
  const {
    firstname,
    lastname,
    userEmail,
    phoneNumber,
    password,
    confirmPassword,
    passwordInput,
    confirmPasswordInput,
  } = formState;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errorMessage = validation();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    const apiBody = {
      firstname: formState.firstname?.trim(),
      lastname: formState.lastname?.trim(),
      phone: formState.phoneNumber?.trim(),
      email: formState.userEmail?.trim(),
      password: formState.password?.trim(),
    };
    signup(apiBody)
      .then(async () => {
        toast("A new account has been created successfully.");
        await waitATime(1000);
        router.push("sign-in");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <>
      <ToastContainer />
      <main
        className="flex h-screen w-full 
     bg-[url('/loginBackgroundImage.png')] 
    bg-center bg-cover bg-fixed justify-center items-center bg-no-repeat relative"
      >
        <div
          className="w-[90%] pb-5 sm:w-[70%] md:w-[50%] lg:w-[40%] 
      rounded-[1.375rem] bg-cover bg-top 
       bg-[url('/Rectangle-BG.png')] "
        >
          <div className="flex justify-end pr-5 pt-4">
            <Image
              src="/login-top-heading.png"
              alt="Alt text"
              width={180}
              height={50}
              style={{ height: "auto" }}
            />
          </div>
          <div className="flex w-full justify-center ">
            <div className="h-14 w-16">
              <Image
                src="/Logo.png"
                alt="Alt text"
                width={400}
                height={400}
                style={{ height: "auto" }}
              />
            </div>
          </div>
          <div className="flex w-full justify-center px-14 h-10">
            <Image
              src="/banglaa.png"
              alt="Alt text"
              width={200}
              height={400}
              style={{ height: "auto" }}
            />
          </div>
          <div className=" w-[70%] m-auto mt-3">
            <form onSubmit={handleSubmitForm}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Image
                    src="/id-card.png"
                    alt="Alt text"
                    id="firstname"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    style={{ height: "auto" }}
                  />
                </div>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500
                   focus:border-blue-500 block w-full pl-10 p-2 
                     dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500
                        dark:focus:border-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Image
                    src="/id-card.png"
                    alt="Alt text"
                    id="lastname"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2   
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Image
                    src="/mail.png"
                    alt="Alt text"
                    id="userEmail"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </div>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
                  placeholder="Email"
                  pattern={emailRegex.source}
                  required
                />
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Image
                    src="/phone.png"
                    alt="Alt text"
                    id="phoneNumber"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    style={{ height: "auto" }}
                  />
                </div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  {passwordInput ? (
                    <Image
                      src="/lock.png"
                      id="password"
                      alt="Alt text"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <BsUnlock size={21} color="#4f5250" />
                  )}
                </div>
                <input
                  type={`${passwordInput ? "password" : "text"}`}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
                  placeholder="Password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                  {passwordInput ? (
                    <Image
                      src="/private.png"
                      alt="Alt text"
                      id="password"
                      width={20}
                      height={20}
                      style={{ height: "auto" }}
                      className="cursor-pointer"
                      onClick={() =>
                        setFormState((state) => ({
                          ...state,
                          passwordInput: !passwordInput,
                        }))
                      }
                    />
                  ) : (
                    <AiOutlineEye
                      size={24}
                      color="#4f5250"
                      onClick={() =>
                        setFormState((state) => ({
                          ...state,
                          passwordInput: !passwordInput,
                        }))
                      }
                    />
                  )}
                </div>
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  {confirmPasswordInput ? (
                    <Image
                      src="/lock.png"
                      id="password"
                      alt="Alt text"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <BsUnlock size={21} color="#4f5250" />
                  )}
                </div>
                <input
                  type={`${confirmPasswordInput ? "password" : "text"}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  minLength={6}
                  pattern={password}
                  title="Passwords do not match"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                  {confirmPasswordInput ? (
                    <Image
                      src="/private.png"
                      alt="Alt text"
                      id="confirmPassword"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() =>
                        setFormState((state) => ({
                          ...state,
                          confirmPasswordInput: !confirmPasswordInput,
                        }))
                      }
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <AiOutlineEye
                      size={24}
                      color="#4f5250"
                      onClick={() =>
                        setFormState((state) => ({
                          ...state,
                          confirmPasswordInput: !confirmPasswordInput,
                        }))
                      }
                    />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="group relative flex w-full 
                  justify-center rounded-md border border-transparent
                   bg-indigo-600 py-[0.35rem] px-4 text-sm font-medium text-white
                    hover:bg-indigo-700 focus:outline-none focus:ring-2
                     focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="w-[80%] m-auto text-center mt-2">
            <div className="flex items-center justify-center mt-3">
              <div className="text-sm">
                <Link
                  href="/sign-in"
                  className="font-medium text-indigo-600
                 hover:text-indigo-500 cursor-pointer"
                >
                  Already have an account? Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[-1.5rem] right-0 ">
          <div className="w-[350px]">
            <Image
              src="/bangla2.png"
              alt="Alt text"
              width={500}
              height={500}
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </main>
      {openModal && (
        <Modal>
          <VerifyEmail close={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default memo(SignUp);
