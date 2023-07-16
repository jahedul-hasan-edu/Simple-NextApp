"use client";
import React, { useState,useLayoutEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createLedger,updateLedger } from "../../../../API";
import { toast } from "react-toastify";
import { handleUploadMultipleFile } from "../../utils/utilityFunction";
import dynamic from 'next/dynamic';
import {  LoaderSection } from "../../Common";
const MapSection = dynamic(() => import('../../revetment/Ledger/MapSection'),{
  ssr: false,
}
);
const AddLedger = ({ close, getAllLedger,title,ledgerData }) => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [loader, setLoader] = useState(true);
  const [formState, setFormState] = useState({
    date: todayDate,
    sheetnumber: "",
    schemeName: "",
    structureName: "",
    chainage: "",
    constructionYear: todayDate,
    lat: "",
    long: "",
    damageHistory: "",
    pictureFile: [],
    sketchFile: [],
    vistedDate: todayDate,
    vistedPerson: "",
    designation: "",
    comment: "",
    signature: "",
  });
  useLayoutEffect(()=>{
if(ledgerData!==null){
  setFormState(state=>({
    ...state,
    date: ledgerData.date,
    sheetnumber: ledgerData.sheetNo,
    schemeName: ledgerData.schemeName,
    structureName: ledgerData.structureName,
    chainage: ledgerData.chainage,
    // constructionYear: ledgerData,
    lat: ledgerData.lat,
    long: ledgerData.lon,
    damageHistory: ledgerData.damageHistory,
    pictureFile: ledgerData.uploadImage,
    sketchFile: ledgerData.sketch,
    vistedDate: ledgerData.visitedDate,
    vistedPerson: ledgerData.visitedPerson,
    designation: ledgerData.designation,
    comment: ledgerData.comment,
    signature: ledgerData.signature,
  }))
}
},[])
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // ======================when ledger exist then call edit api otherwize create api=================
  const handleSubmitForm = async (event) => {
    event.preventDefault();

if(formState.lat===""&&formState.long===""){
  return toast.error("Please enter the latitude and longitude first")
}
if(!formState.pictureFile.length>0||!formState.sketchFile>0){
  return toast.error(" Please upload the necessary image first, and then proceed.")
}
        setLoader(true)
        
    const folderName = process.env.NEXT_PUBLIC_AWS_IMAGES;
    const uploadImage = await handleUploadMultipleFile(
      formState.pictureFile,
      folderName
    );
    const uploadSkatch = await handleUploadMultipleFile(
      formState.sketchFile,
      folderName
    );
    const imageLocation = uploadImage.map((image) => image.Location);
    const imageSkatch = uploadSkatch.map((image) => image.Location);

    let apimodel = {
      date: formState.date,
      sheetNo: formState.sheetnumber,
      schemeName: formState.schemeName,
      structureName: formState.structureName,
      chainage: formState.chainage,
      lat: formState.lat,
      lon: formState.long,
      sketch: imageSkatch,
      damageHistory: formState.damageHistory,
      uploadImage: imageLocation,
      designation: formState.designation,
      visitedDate: formState.vistedDate,
      visitedPerson: formState.vistedPerson,
      signature: "",
      comment: formState.comment,
    };
    if(ledgerData!==null){
      updateLedger(apimodel,ledgerData.id).then(()=>{
        setLoader(false)
        toast("The ledger has been successfully updated");
        close();
      }).catch((error)=>{
        setLoader(false)
        console.log( error.message);
      })
    }
    else{
      createLedger(apimodel)
      .then(() => {
        setLoader(false)
        toast("A new ledger has been successfully created.");
        close();
        getAllLedger();
      })
      .catch((error) => {
        setLoader(false)
        console.log(error.message);
      });
  };
    }

  const handleUploadPicture = async (e) => {
    e.preventDefault();
    setFormState((state) => ({
      ...state,
      pictureFile: e.target.files,
    }));
  };

  const handleUploadSkatch = async (e) => {
    e.preventDefault();

    setFormState((state) => ({
      ...state,
      sketchFile: e.target.files,
    }));
  };
//===============================get lat long from mapbox  when user select a location========================
  
  const {
    date,
    sheetnumber,
    schemeName,
    structureName,
    chainage,
    constructionYear,
    lat,
    long,
    damageHistory,
    vistedDate,
    vistedPerson,
    designation,
    comment,
    signature,
  } = formState;

  const handleLatLng = (latlng) => {
    const updatedFormState = {
      ...formState,
      lat: latlng.lat,
      long: latlng.lng
    };
    setFormState(updatedFormState);
  };

  return (
    <>
          <LoaderSection state={loader} />
      <div
        className="justify-center items-center flex fixed inset-0 z-50  
    outline-none focus:outline-none  h-[95vh]  mt-5   ">
        <div className="bg-white w-[70%] h-[100%]  overflow-y-scroll rounded-md px-10">
          <div className="w-full my-5  ">
            <div className="flex justify-end">
              <span onClick={close} className="cursor-pointer">
                <AiOutlineClose size={22} />
              </span>
            </div>
            <h2 className="w-full text-center font-bold text-lg">
       {title}
            </h2>
            <form className="w-full  my-8" onSubmit={handleSubmitForm}>
              <div className="flex gap-3 my-3 flex-wrap w-full">
                <div className="w-[49%]">
                  <h3 id="date">Date</h3>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    required
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
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
                  />
                </div>
                <div className="w-[49%]">
                  <h3 id="sheetnumber">Sheet Number</h3>
                  <input
                    type="text"
                    id="sheetnumber"
                    required
                    name="sheetnumber"
                    value={sheetnumber}
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
                    placeholder="sheet number"
                  />
                </div>
              </div>
              <div className="flex gap-3 my-3 flex-wrap w-full">
                <div className="w-[49%]">
                  <h3 id="schemeName">Scheme Name</h3>
                  <input
                    type="text"
                    id="schemeName"
                    name="schemeName"
                    value={schemeName}
                    required
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                    placeholder="scheme name"
                  />
                </div>
                <div className="w-[49%]">
                  <h3 id="structureName">Structure Name</h3>
                  <input
                    type="text"
                    id="structureName"
                    name="structureName"
                    required
                    value={structureName}
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
                    placeholder="structure name"
                  />
                </div>
              </div>
              <div className="flex gap-3 my-3 flex-wrap w-full">
                <div className="w-[49%]">
                  <h3 id="chainage">Chainage(KMs)</h3>
                  <input
                    type="text"
                    id="chainage"
                    name="chainage"
                    required
                    value={chainage}
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
                    placeholder="chainage(KMs)"
                  />
                </div>
                <div className="w-[49%]">
                  <h3 id="constructionYear">Construction Year</h3>
                  <input
                    id="constructionYear"
                    name="constructionYear"
                    value={constructionYear}
                    required
                    onChange={handleChange}
                    type="date"
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
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="w-[49%]">
                  <h3 id="lat">Location Coordinates</h3>
                  <p className="text-xs">(Click on Map using Marker to enter coordinates)</p>
                  <div className="flex flex-wrap gap-2 items-center w-full">
                    <input
                      type="text"
                      id="lat"
                      name="lat"
                      value={lat}
                      readOnly
                      className="bg-gray-50 border border-gray-300
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-[48.9%]
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                      placeholder="Latitude"
                    />
                    <input
                      type="text"
                      id="long"
                      name="long"
                      value={long}
                      readOnly
                      className="bg-gray-50 border border-gray-300
                  my-3
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-[48%]
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
                      placeholder="Longitude"
                    />
                  </div>
                  <h3 id="vistedPerson">Visited Person</h3>
                  <input
                    type="text"
                    id="vistedPerson"
                    name="vistedPerson"
                    value={vistedPerson}
                    required
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
                    placeholder="Enter Name"
                  />
                  <h3 id="vistedDate">Visited Date</h3>
                  <input
                    id="vistedDate"
                    name="vistedDate"
                    value={vistedDate}
                    required
                    onChange={handleChange}
                    type="date"
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
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <h3 id="designation">Designation</h3>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={designation}
                    required
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
                    placeholder="Person Designation"
                  />
                </div>
                <div className="w-[49%] border-2 border-black rounded-lg shadow-md">
                    <div className="w-full h-[345px] rounded-lg overflow-hidden">
                      <MapSection handleLatLng={handleLatLng}/>
                    </div>
                  </div>
              </div>

              <div className="w-full my-3">
                <label
                  id="damageHistory"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Damage/History
                </label>
                <textarea
                  id="damageHistory"
                  name="damageHistory"
                  required
                  value={damageHistory}
                  onChange={handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write damage/history here..."></textarea>
              </div>

              <div className="w-full flex gap-3 items-center">
                <div className=" w-[49%]">
                  <h3 className="w-full text-center my-3">Upload Picture</h3>
                  <div className="flex items-center justify-center w-full gap-3">
                    {" "}
                    <label
                      id="pictureFile"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="pictureFile"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleUploadPicture}
                      />
                    </label>
                  </div>
                </div>
                <div className=" w-[49%]">
                  <h3 className="w-full text-center my-3">Upload Sketch </h3>
                  <div className="flex items-center justify-center w-full gap-3">
                    {" "}
                    <label
                      // for="dropzone-file"
                      id="sketchFile"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                      
                        className="hidden"
                        multiple
                        onChange={handleUploadSkatch}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center my-3 flex-wrap w-full">
                {/* <div className="w-[32%]">
                  <h3 id="vistedPerson">Visited Person</h3>
                  <input
                    type="text"
                    id="vistedPerson"
                    name="vistedPerson"
                    value={vistedPerson}
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
                    placeholder="person designation"
                  />
                </div> */}
                {/* <div className="w-[32%]">
                  <h3 id="vistedDate">Visited Date</h3>
                  <input
                    id="vistedDate"
                    name="vistedDate"
                    value={vistedDate}
                    onChange={handleChange}
                    type="date"
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
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div> */}
                {/* <div className="w-[32%]">
                  <h3 id="designation">Designation</h3>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={designation}
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
                    placeholder="person designation"
                  />
                </div> */}
              </div>
              <div className="flex flex-wrap my-3 gap-3 ">
                <div className="w-[64%] ">
                  <label
                    id="comment"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={comment}
                    required
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className="w-[32%]">
                  <label
                    id="signature"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Signature
                  </label>
                  <input
                    type="text"
                    id="signature"
                    name="signature"
                    
                    value={signature}
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
                    placeholder="signature"
                  />
                </div>
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
        "
                  type="submit">
                  Save
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
                  onClick={close}
                  type="button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddLedger;
