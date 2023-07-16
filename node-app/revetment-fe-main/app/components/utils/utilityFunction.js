"use client";
import AWS from "aws-sdk";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$/;
let roles = [
  {
    id: 1,
    roleName: "super admin",
  },
  {
    id: 2,
    roleName: "admin",
  },
  {
    id: 3,
    roleName: "user",
  },
  {
    id: 4,
    roleName: "viewer",
  },
];
const findUserRoleId = (rolename) => {
  return roles.find((item) => {
    return item.roleName === rolename;
  });
};
const findUserRoleName = (roleId) => {
  return roles.find((item) => {
    return item.id === roleId;
  });
};
// AWS  Methods upoad multiple image
const handleUploadMultipleFile = async (files, folderName) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  let images = files;
  let imagesArray = [];
  for (let image of images) {
    let name = Date.now() + image.name;
    let fileName = folderName + name;
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
      Key: fileName,
      Body: image,
    };
    let imageupload = await s3.upload(params).promise();
    imagesArray.push(imageupload);
  }
  return imagesArray;
};

// AWS  Methods upoad msingle file

const handleUploadSingleFile = async (files, folderName) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  let image = files;
  let name = Date.now() + image.name;
  let fileName = folderName + name;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
    Key: fileName,
    Body: image,
  };
  let imageupload = await s3.upload(params).promise();
  return imageupload;
};




function waitATime(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time); // 1000 milliseconds = 1 second
  });
}

export {
  emailRegex,
  waitATime,
  findUserRoleId,
  findUserRoleName,
  handleUploadMultipleFile,
  handleUploadSingleFile,
};
