"use client";
import React, { useLayoutEffect, useState } from "react";
import { AddLedger, Modal, ViewLedger, DeleteUser } from "../components/Modal";
import { Header, LoaderSection } from "../components/Common";
import { Tooltip } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getAllLedgers, deleteLedger } from "../../API";
import DataTable from "react-data-table-component";
const page = () => {
  const [openAddLedgerModel, setOpenLedgerModel] = useState(false);
  const [allLedger, setAllLedger] = useState([]);
  const [loader, setLoader] = useState(true);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [singLeger, setSingleLedger] = useState(null);
  const [openEditLedgerModal, setOpenEditLedgerModal] = useState(false);
  const [openVewLedger, setOpenVewLedger] = useState(false);

  useLayoutEffect(() => {
    getAllLedger();
  }, []);
  const getAllLedger = () => {
    const pageInfo = {
      value: "",
      page: 1,
      limit: 8,
    };
    setLoader(true);
    getAllLedgers(pageInfo)
      .then((res) => {
        setLoader(false);
        setAllLedger(res.ledger);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error);
      });
  };
  const handleDeleteUser = (ledger) => {
    setSingleLedger(ledger);
    setOpenDeleteModal(true);
  };
  const handleUpdateLedger = (ledger) => {
    setSingleLedger(ledger);
    setOpenEditLedgerModal(true);
  };
  const handleVewLedger = (ledger) => {
    setSingleLedger(ledger);
    setOpenVewLedger(true);
  };
  const column = [
    {
      name: "Date",
      selector: (row) => row?.date,
      sortable: true,
    },
    {
      name: "Sheet Number",
      selector: (row) => row?.sheetNo,
      sortable: true,
      width: "auto",
    },
    {
      name: "Scheme Name",
      selector: (row) => row?.schemeName,
      sortable: true,
      width: "auto",
    },
    {
      name: "Construction Year",
      selector: (row) => row?.date,
      sortable: true,
      width: "auto",
    },
    {
      name: "Detail",
      width: "150px",
      cell: (row) => (
        <button
          type="button"
          className="p-1.5 px-3 w-[80%] 
           bg-[#1B8ADD]  rounded-lg text-white font-semibold 
           shadow-[#717171] shadow-sm
      transition-all
      hover:shadow-md hover:shadow-[rgb(113,113,113)] border-0 hover:scale-105"
          onClick={() => handleVewLedger(row)}
        >
          {" "}
          View Detail
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
              onClick={(e) => handleUpdateLedger(row, e)}
            >
              <FaRegEdit size={22} color="gray" />
            </span>
          </Tooltip>
          <Tooltip label="Delete" color="#1B8ADD" withArrow>
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => handleDeleteUser(row, e)}
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
      <div className="w-full py-5 min-h-[88vh] px-5 bg-[#f2f2f2] ">
        {/*   ==========================  header  =====================  */}
        <Header
          buttonTittle="Add Ledger"
          title="Ledger"
          openModal={() => {
            setOpenLedgerModel(true);
          }}
        />
        {/*   ==========================  Body  =====================  */}
        {allLedger.length > 0 ? (
          <DataTable
            columns={column}
            pagination
            customStyles={customStyles}
            // selectableRows
            data={allLedger}
          />
        ) : (
          <div className="bg-white w-full h-[70px] flex justify-center items-center">
            <h1 className="text-base text-[#5A5A5A]">No ledger Found</h1>
          </div>
        )}
      </div>
      {/*  ==========================  Modal  Section =====================  */}
      {/* //====================this is common for edit and create Ledger =================== */}
      {(openAddLedgerModel || openEditLedgerModal) && (
        <AddLedger
          close={() => {
            openAddLedgerModel
              ? setOpenLedgerModel(false)
              : setOpenEditLedgerModal(false);
            setSingleLedger(null);
          }}
          ledgerData={singLeger}
          title={openAddLedgerModel ? "Create Ledger" : "Edit Ledger "}
          getAllLedger={getAllLedger}
        />
      )}
      {/* ===================VewLedger  ======================= */}
      {openVewLedger && (
        <ViewLedger
          close={() => {
            setOpenVewLedger(false);
            setSingleLedger(null);
          }}
          ledgerData={singLeger}
          title="View Ledger"
        />
      )}

      {/* ===========================Delete Ledger=========================== */}
      {OpenDeleteModal && (
        <Modal
          modalStyle="bg-white w-[25%] pb-3 rounded-md"
          modalTitle="Delete Ledger"
        >
          <DeleteUser
            close={() => setOpenDeleteModal(false)}
            userData={singLeger}
            apiMethod={deleteLedger}
            getAllUserSData={getAllLedger}
            title="Ledger"
          />
        </Modal>
      )}
    </>
  );
};
export default page;
