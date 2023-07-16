"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { Tooltip } from "@mantine/core";
import { deleteDocument } from "../../../../API";
import { toast } from "react-toastify";

const DocumentCard = ({ documents, getAllDocument, setLoader }) => {
  const handleDownloadDocument = () => {
    console.log("documents", documents);
    setLoader(true);
    const fileUrl = documents.url;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", documents.name);
    link.click();
    setTimeout(() => {
      setLoader(false);
    }, 600);
  };
  const handleDeleteDocument = async () => {
    setLoader(true);
    await deleteDocument(documents.id);
    toast("The document has been successfully deleted");
    getAllDocument();
  };
  return (
    <div
      className="lg:w-[24%] 
       md:w-[48%]
       w-[98%] 
    p-3 rounded-md bg-[#FFFFFF]   
    shadow-[#717171] shadow-sm
    transition-all
    hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105"
    >
      <div className="w-full   py-3">
        <div className="flex justify-center items-center">
          {" "}
          <div className="w-[25%]">
            <Image
              src={
                documents.name.includes(".pdf")
                  ? "/pdf.png"
                  : documents.name.includes(".doc")
                  ? "/word.png"
                  : "/excel.png"
              }
              alt="pdf"
              width={500}
              height={500}
              style={{ height: "auto" }}
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="mt-2 text-[#000000] font-bold  w-full overflow-hidden">
            {documents.name}
          </h2>
        </div>

        <div className="flex justify-between items-center mt-2 ">
          <p className="text-right mt-3 text-[#5A5A5A]">Date: 22-5-2022</p>
          <div className="flex">
            <div className="flex gap-2">
              <Tooltip label="Delete" color="indigo" withArrow>
                <span
                  className=" cursor-pointer"
                  onClick={handleDeleteDocument}
                >
                  <MdDelete size={24} color="gray" />
                </span>
              </Tooltip>
              <Tooltip label="Download" color="indigo" withArrow>
                <span
                  className=" cursor-pointer"
                  onClick={handleDownloadDocument}
                >
                  <HiOutlineDownload size={24} color="gray" />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
