"use client";
import React, { useState, memo } from "react";
import Image from "next/image";
import { Modal, RecoverPassword } from "../components/Modal";
import Link from "next/link";
import { emailRegex } from "../components/utils/utilityFunction";
import { login } from "../../API";
import { AiOutlineEye } from "react-icons/ai";
import { BsUnlock } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    remember: false,
    //=================state for password  input type ==========
    passwordInput: true,
  });
  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    let emailValue = formState.email?.trim();
    let passwordValue = formState.password?.trim();
    let payload = {
      email: emailValue,
      password: passwordValue,
    };
    login(payload)
      .then(async (res) => {
        router.push("/");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  const { email, password, remember, passwordInput } = formState;

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
      rounded-[1.5rem] bg-cover bg-top 
       bg-[url('/Rectangle-BG.png')] "
        >
          <div className="flex justify-end pr-5 pt-4">
            <Image
              src="/login-top-heading.png"
              alt="Alt text"
              width={200}
              height={50}
              style={{ height: "auto" }}
            />
          </div>
          <div className="flex  justify-center   mt-2">
            <div className="w-20 h-18">
              <Image src="/Logo.png" alt="Alt text" width={500} height={500} />
            </div>
          </div>
          <div className="flex w-full justify-center px-14  mt-3 h-9">
            <Image
              src="/banglaa.png"
              alt="Alt text"
              width={280}
              height={400}
              style={{ height: "auto" }}
            />
          </div>
          <div className=" w-[70%] m-auto mt-3">
            <form onSubmit={handleSubmitForm}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Image
                    src="/mail.png"
                    alt="Alt text"
                    id="email"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    style={{ height: "auto" }}
                  />
                </div>
                <input
                  type="text"
                  id="email"
                  value={email}
                  name="email"
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500
                   focus:border-blue-500 block w-full pl-10 p-2
                     dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  pattern={emailRegex.source}
                  autoComplete="email"
                  title="Email are incorrect"
                  required
                />
              </div>
              <div className="relative mt-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  {passwordInput ? (
                    <Image
                      src="/lock.png"
                      id="password"
                      alt="Alt text"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  ) : (
                    <BsUnlock size={22} color="#4f5250" />
                  )}
                </div>
                <input
                  type={`${passwordInput ? "password" : "text"}`}
                  id="password"
                  value={password}
                  name="password"
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
                  autoComplete="current-password"
                  placeholder="Password"
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
              <div className="flex justify-between mt-4 ">
                <div className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value={remember}
                    checked={remember ? true : false}
                    onChange={() =>
                      setFormState((state) => ({
                        ...state,
                        remember: !remember,
                      }))
                    }
                    className="w-4 h-4 text-blue-600 
                   bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                     dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                      dark:border-gray-600"
                  />
                  <label
                    className="ml-2 
                  text-sm
                   font-medium
                   text-[#717171] dark:text-gray-300"
                  >
                    Remember
                  </label>
                </div>
                <button
                  type="button"
                  className="text-[#717171] text-sm
                  font-medium dark:text-gray-300"
                  onClick={handleOpenModal}
                >
                  Forgot Password ?
                </button>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border 
                  border-transparent
                   bg-indigo-600 py-[0.35rem] px-4 text-sm font-medium
                    text-white
                   hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="w-[80%] m-auto text-center">
            <div className="flex items-center justify-center mt-3">
              <div className="text-sm">
                <Link
                  href="/sign-up"
                  className="font-medium text-indigo-600
                 hover:text-indigo-500 cursor-pointer"
                >
                  Don't have an account? Sign Up
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
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </main>
      {openModal && (
        <Modal modalStyle="bg-white w-[25%] pb-5  rounded-md">
          <RecoverPassword close={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default memo(SignIn);
