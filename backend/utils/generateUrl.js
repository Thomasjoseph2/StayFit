import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Obj from '../utils/s3.js';

const generateUrl = async (key) => {
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3Obj, command, { expiresIn: 600 });
  return url;
};

  export default generateUrl;