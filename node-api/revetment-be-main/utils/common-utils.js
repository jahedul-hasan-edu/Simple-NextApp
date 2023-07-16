const _ = require("lodash");
const AWS = require('aws-sdk');

const sendErrorResp = (error, req, resp) => {
  console.error(error);
  if (!_.isUndefined(error.response)) {
    const { status } = error.response;
    const { message } = error.response.data;
    resp.status(status).send({ message, status });
  } else {
    if (!_.isUndefined(error.status) && !_.isUndefined(error.message)) {
      return resp.status(error.status).send(error);
    } else if (!_.isUndefined(error.message)) {
      return resp.status(500).send(error.message);
    }
    resp.status(error.status).send({
      message: "Some Internal Server Error Occurred.",
      status: error.status,
      error,
    });
  }
};

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


// A generic method to get presigned url for put/get object to/from s3
const getPresignedUrl = async (body) => {
  try {
      // These parameters will be coming from frontend
      const { bucket, fileKey, expireTime, signedMethod } = body;

      const url = s3.getSignedUrl(signedMethod, {
          Bucket: bucket,
          Key: fileKey.replace(/\+/g, ' '),
          Expires: expireTime
      });
      return {
          status: 200,
          signedUrl: url
      };
  } catch (error) {
      return {
          status: 400,
          message: 'Something Went Wrong.',
          error: error
      };
  }
};

// A generic method to get presigned url for put/get object to/from s3
const getPreSignedUrlFromS3Url = async (data) => {
  /* ------------------------------------------------------------------------------------ */
  /*        right now we will fetch and return signed url for only KML type Layers        */
  /* ------------------------------------------------------------------------------------ */
  if (data) {
    data = data.replace(/['"]+/g, '');
    let url = new URL(data);
    console.log("url",url)
    let bucket = url.hostname.split('.')[0];

    let fileKey = url.pathname.substring(1);
    fileKey = fileKey.replace(/%20/g, ' ');
    //get presigned url
    let signedUrl = await getPresignedUrl({
      bucket: bucket,
      fileKey: fileKey,
      expireTime: 1800,
      signedMethod: 'getObject'
    });
    if ((signedUrl.status = 200)) {
      return signedUrl.signedUrl;
    }
  } else {
    return null;
  }
};

module.exports = { sendErrorResp, getPreSignedUrlFromS3Url };
