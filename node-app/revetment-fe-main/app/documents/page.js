"use client";
import React, { useState, useLayoutEffect } from "react";
import { Header, LoaderSection } from "../components/Common";
import DocumentCard from "../components/revetment/document/DocumentCard";
import { Modal, AddDocuments } from "../components/Modal";
import { getAllDocuemt } from "../../API";
import { Pagination } from "@mantine/core";

const page = () => {
  const [openAddDocument, setOpenDocument] = useState(false);
  const [allDocument, setAllDocument] = useState([]);
  const [loader, setLoader] = useState(true);

  const [activePage, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    value: "",
    limit: 8,
    totalPages: 1,
  });

  const fetchAllDocument = () => {
    getAllDocuemt(paginationInfo, activePage)
      .then((res) => {
        setAllDocument(res.documents);
        setPaginationInfo({
          ...paginationInfo,
          totalPages: res.total,
        });
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.message);
      });
  };

  useLayoutEffect(() => {
    setLoader(true);
    fetchAllDocument();
  }, [activePage]);

  return (
    <>
      <LoaderSection state={loader} />
      <div className="w-full py-5 min-h-[88vh] px-5 bg-[#f2f2f2] ">
        {/*   ==========================  header  =====================  */}
        <Header
          buttonTittle="Upload Document"
          title="Documents"
          openModal={() => {
            setOpenDocument(true);
          }}
          paginationInfo={paginationInfo}
          setPaginationInfo={setPaginationInfo}
          fetchAllDocument={fetchAllDocument}
          setLoader={setLoader}
        />
        {/*   ==========================  Body  =====================  */}
        <>
          <div className="flex w-full flex-wrap gap-3 mb-4">
            {allDocument.length > 0 ? (
              allDocument.map((item, index) => (
                <DocumentCard
                  key={index}
                  documents={item}
                  getAllDocument={fetchAllDocument}
                  setLoader={setLoader}
                />
              ))
            ) : (
              <div className="bg-white w-full h-[70px] flex justify-center items-center">
                <h1 className="text-base text-[#5A5A5A]">No Document Found</h1>
              </div>
            )}
          </div>

          <div className="w-full flex justify-center">
            <Pagination
              value={activePage}
              onChange={setPage}
              total={paginationInfo.totalPages}
            />
          </div>
        </>
      </div>
      {/*             ==================================Modal=============================== */}
      {openAddDocument && (
        <Modal
          modalStyle="bg-white w-[35%]  pb-3 rounded-md"
          modalTitle="Add Document"
        >
          <AddDocuments
            closeDocument={() => setOpenDocument(false)}
            getAllDocument={fetchAllDocument}
            setLoader={setLoader}
          />
        </Modal>
      )}
    </>
  );
};

export default page;
