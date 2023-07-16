"use client";
import React, { useState,useLayoutEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from 'next/dynamic';
import { Carousel } from '@mantine/carousel';
// import { Image } from '@mantine/core';
const MapSection = dynamic(() => import('../../revetment/Ledger/MapSection'),{
  ssr: false,
}
);
const ViewLedger = ({ close,title,ledgerData }) => {
  const todayDate = new Date().toISOString().split("T")[0];
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

const imageSlide = ledgerData?.uploadImage.length&&ledgerData?.uploadImage.map((url) => (
  <Carousel.Slide key={url}>
    <img src={url} 
    className="w-full rounded-lg  bg-center bg-no-repeat "
     alt="custome image"
     />
  </Carousel.Slide>
));
const skatchSlide = ledgerData?.sketch.length>0&&ledgerData?.sketch.map((url) => (
  <Carousel.Slide key={url}>
    <img src={url} 
    className="w-full rounded-lg  bg-center bg-no-repeat "
     alt="custome image"
     />
  </Carousel.Slide>
));


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
  return (
    <>
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
            <form className="w-full  my-8" >
              <div className="flex gap-3 my-3 flex-wrap w-full">
                <div className="w-[49%]">
                  <h3 id="date">Date</h3>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    readOnly={true}
                    disabled
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
                    name="sheetnumber"
                    value={sheetnumber}
                    readOnly={true}
                    disabled
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
                    readOnly={true}
                    disabled
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
                    value={structureName}
                    readOnly={true}
                    disabled
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
                    value={chainage}
                    readOnly={true}
                    disabled
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
                    readOnly={true}
                    disabled
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
                      readOnly={true}
                      disabled
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
                      readOnly={true}
                      disabled
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
                    readOnly={true}
                    disabled
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
                    readOnly={true}
                    disabled
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
                    readOnly={true}
                    disabled
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
                      <MapSection handleLatLng={()=>{}}/>
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
                  value={damageHistory}
                  readOnly={true}
                    disabled
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write damage/history here..."></textarea>
              </div>

              <div className="w-full flex gap-3 items-center">
                <div className=" w-full">
                  <h3 className="w-full text-center my-3"> Picture</h3>
<div className="w-full  rounded-lg">
{ledgerData?.uploadImage.length>0?<Carousel withIndicators  height={200}>
      {imageSlide}
    </Carousel>:<h3 className="text-center">No images have been uploaded yet !</h3>}
</div>
</div>
              </div>
              <div className="w-full flex gap-3 items-center">
    <div className=" w-full">
                  <h3 className="w-full text-center my-3"> Sketch </h3>
                  <div className="w-full  rounded-lg">
                  {ledgerData?.sketch.length>0?<Carousel withIndicators  height={200}>
      {skatchSlide}
    </Carousel>:<h3 className="text-center">No sketch have been uploaded yet !</h3>}
</div>
                </div>
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
                    readOnly={true}
                    disabled
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
                    readOnly={true}
                    disabled
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

export default ViewLedger;
