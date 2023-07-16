"use client";
import React, { useState, useEffect } from "react";
import { emailRegex } from "../../utils/utilityFunction";
import { editUser, createUser } from "../../../../API/index";
import { findUserRoleId } from "../../utils/utilityFunction";
import { toast } from "react-toastify";

const AddUser = ({ close, userData, getAllUserSData }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "0123456789",
    userRole: "",
    designation:""
  });

  useEffect(() => {
    if (userData !== null) {
      setFormState((state) => ({
        ...state,
        firstName: userData?.firstname,
        lastName: userData?.lastname,
        email: userData?.email,
        phoneNumber: userData?.phone,
        userRole: userData?.role,
        designation:userData?.designation
     
      }));
    }
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const roleId = findUserRoleId(formState.userRole);
    let apiBody = {
      firstname: formState.firstName,
      lastname: formState.lastName,
      email: formState.email,
      role: formState.userRole,
      roleId: roleId?.id,
      phone: formState.phoneNumber,
      designation:formState.designation
    };
    if (userData !== null) {
      const apiData = {
        userid: userData.id,
        body: apiBody,
      };
      editUser(apiData)
        .then(() => {
          toast("Update successful");
          getAllUserSData();
          close();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      createUser(apiBody)
        .then(() => {
          toast("A new user has been successfully created.");
          getAllUserSData();
          close();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const { firstName, lastName, email, phoneNumber, userRole, isverified,designation } =
    formState;

  return (
    <>
      <div>
        <div className="flex   my-5  w-full">
          <span className="border-t-2 border-t-[#C1C1C1] w-full" />
        </div>
        <div className="w-full">
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="flex items-center gap-3 my-1">
              <div className="w-[50%]">
                <h3>First Name</h3>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300
                 
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                  placeholder="first name"
                />
              </div>
              <div className="w-[50%]">
                <h3>Last Name</h3>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300
                 
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ">
              <div className="w-[50%]">
                <h3>Email</h3>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  pattern={emailRegex.source}
                  required
                  className="bg-gray-50 border border-gray-300
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                  placeholder="Email"
                />
              </div>
              <div className="w-[50%]">
                <h3>Phone Number</h3>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300
       
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 my-1">
              <div className="w-[50%]">
                <h3>Role</h3>
                <select
                  id="userRole"
                  name="userRole"
                  value={userRole}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300
                  
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select User Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="super admin">Super Admin</option>
                  <option value="viewer">Viewer</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="w-[50%]">
                <h3>Designation</h3>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={designation}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                  placeholder="designation"
                />
              </div>
            </div>
            
            <div className="w-full flex justify-center gap-8">
              <button
                className="  
      
       bg-[#1B8ADD] 
       text-white
       mt-1 px-5
       rounded-md
       w-28  p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
                type="submit"
              >
                Save
</button>
              <button
                className="  
                bg-[#f8f9f9] 
       text-[#393737]
       mt-1 px-5
       rounded-md
       w-28  p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
onClick={close}
                type="button"
>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
