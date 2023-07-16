"use client";
import React, { useState } from "react";
import { handleUploadSingleFile } from "../../utils/utilityFunction";
import { toast } from "react-toastify";
import { createDocument } from "../../../../API"
const AddDocuments = ({ closeDocument, getAllDocument, setLoader }) => {

  const [imageFile, setImageFile] = useState(null);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    closeDocument()
    setLoader(true)
    const folderName = process.env.NEXT_PUBLIC_AWS_DOCUMENTS;

    if (imageFile === null) {
      return toast.error("Please first select an image");
    }

    let uploadfile = await handleUploadSingleFile(imageFile, folderName);
    const body = {
      name: imageFile.name,
      url: uploadfile.Location
    }

    createDocument(body).then(() => {
      toast("A new document has been successfully added.")
      getAllDocument()
      closeDocument()
    })
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const originalFilename = file.name;
    const processedFilename = originalFilename.replace(/[\(\)]/g,'');
    const modifiedFile = new File([file], processedFilename, { type: file.type });
    setImageFile(modifiedFile);
  };
  return (
    <>
      <div className="w-full">
        <form className="w-full  my-8" onSubmit={handleSubmitForm}>
          <div className="flex w-full py-8 items-center justify-center bg-grey-lighter">
            <label
              className="w-64 flex flex-col items-center px-4 py-6 
            bg-white text-blue rounded-lg shadow-lg tracking-wide 
            uppercase border border-blue cursor-pointer
             hover:bg-[#1B8ADD] hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input type="file" className="hidden" onChange={handleUpload} accept=".doc, .docx, .pdf, .xlsx" />
            </label>
          </div>

          <div className="w-full flex justify-center gap-8">
            <button
      className="  
       bg-[#f8f9f9] 
       text-[#393737]
       mt-1 px-5
       rounded-md
       w-auto block p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "type="submit"
            >
              Upload
            </button>
            <button
              className="  
       bg-[#f8f9f9] 
       text-[#393737]
       mt-1 px-5
       rounded-md
       w-auto block p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
              onClick={closeDocument}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDocuments;
