"use client";
import React, { useState, useLayoutEffect } from "react";
import DataTable from "react-data-table-component";
import { getAllUsers, deleteUser } from "../../API";
import { AddUser, Modal, DeleteUser, IsVerified } from "../components/Modal";
import { FaRegEdit } from "react-icons/fa";
import { Tooltip } from "@mantine/core";
import { MdDelete } from "react-icons/md";
import { Header, LoaderSection } from "../components/Common";

const page = () => {
  const [usersData, setUserData] = useState([]);
  const [OpenModal, setOpenModal] = useState(false);
  const [openVerifiedModal, setopenVerifiedModal] = useState(false);
  const [singleUser, setSingleUser] = useState(null);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [loader, setLoader] = useState(true);

  useLayoutEffect(() => {
    getAllUserSData();
  }, []);

  const handleVerifiedUser = (user) => {
    setSingleUser(user);
    setopenVerifiedModal(true);
  };
  const getAllUserSData = () => {
    setLoader(true);
    getAllUsers()
      .then((res) => {
        setUserData(res.users);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error");
        console.log(error.message);
      });
  };

  const handleEditeUser = (user) => {
    setSingleUser(user);
    setOpenModal(true);
  };

  const handleDeleteUser = (user) => {
    setSingleUser(user);
    setOpenDeleteModal(true);
  };

  const column = [
    {
      name: "First Name",
      selector: (row) => row?.firstname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      width: "220px",
      sortable: true,
    },
    {
      name: "Phone Number ",
      selector: (row) => row?.phone,
      sortable: true,
    },
    {
      name: "Roles",
      selector: (row) => row?.role,
      sortable: true,
    },
    {
      name: "Status",
      width: "150px",
      cell: (row) => (
        <button
          type="button"
          className={`p-1.5 px-3 w-[80%] ${
            row?.isVerified ? "bg-green-600" : "bg-red-600"
          }  rounded-lg text-white font-semibold shadow-[#717171] shadow-sm
      transition-all
      hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105 `}
          onClick={() => handleVerifiedUser(row)}
        >
          {" "}
          {row?.isVerified ? "Verified" : "Unverified"}
        </button>
      ),
    },
    {
      name: "Edit/Delete",
      cell: (row) => (
        <div className="flex gap-3  ">
          <Tooltip label="Edit" color="#1B8ADD" withArrow>
            <span
              className="flex items-center gap-1
           cursor-pointer"
              data-tooltip-target="tooltip-default"
              onClick={() => handleEditeUser(row)}
            >
              <FaRegEdit size={22} color="gray" />
            </span>
          </Tooltip>
          <Tooltip label="Delete" color="#1B8ADD" withArrow>
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleDeleteUser(row)}
            >
              <MdDelete size={24} color="gray" />
            </span>
          </Tooltip>

          <span></span>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#f2f2f2", // Set the desired background color for the table rows
      },
    },

    headCells: {
      style: {
        backgroundColor: "#f2f2f2", // Set the desired background color for the table header cells
      },
    },
  };
  return (
    <>
      <LoaderSection state={loader} />
      <div className="w-full py-5 px-2  min-h-[88vh] bg-[#f2f2f2]">
        {/*   ==========================  header  =====================  */}
        <Header
          mainStyle="flex justify-between items-center  pb-5 px-5"
          buttonTittle="Add User"
          title="Users"
          openModal={() => {
            setOpenModal(!OpenModal);
            setSingleUser(null);
          }}
        />
        {}
        {/*   ==========================  Body  =====================  */}
        {usersData.length > 0 ? (
          <DataTable
            columns={column}
            pagination
            customStyles={customStyles}
            // selectableRows
            data={usersData}
          />
        ) : (
          <div className="bg-white w-full h-[70px] flex justify-center items-center">
            <h1 className="text-base text-[#5A5A5A]">No user Found</h1>
          </div>
        )}
      </div>
      {/*   ==========================  Modal  =====================  */}
      {OpenModal && (
        <Modal
          modalStyle="bg-white  w-[50%] pb-3  rounded-md"
          modalTitle={singleUser !== null ? "Edit User" : "Add User"}
        >
          <AddUser
            close={() => setOpenModal(false)}
            userData={singleUser}
            getAllUserSData={getAllUserSData}
          />
        </Modal>
      )}

      {OpenDeleteModal && (
        <Modal
          modalStyle="bg-white w-[25%] pb-3 rounded-md"
          modalTitle="Delete User"
        >
          <DeleteUser
            close={() => setOpenDeleteModal(false)}
            userData={singleUser}
            apiMethod={deleteUser}
            getAllUserSData={getAllUserSData}
          />
        </Modal>
      )}
      {openVerifiedModal && (
        <Modal
          modalStyle="bg-white  pb-3   rounded-md"
          modalTitle={singleUser.isVerified ? "Un Verify" : "Verify"}
        >
          <IsVerified
            close={() => setopenVerifiedModal(false)}
            userData={singleUser}
            getAllUserSData={getAllUserSData}
          />
        </Modal>
      )}
    </>
  );
};

export default page;
