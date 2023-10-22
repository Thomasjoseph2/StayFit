import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Obj from '../utils/s3.js';

const generateUrl = async (bucket, key) => {
    const getObjectParams = {
      Bucket: bucket,
      Key: key,
    };
    const command = new GetObjectCommand(getObjectParams);
    return getSignedUrl(s3Obj, command, { expiresIn: { expiresIn: 600 } });
  };

  export default generateUrl;