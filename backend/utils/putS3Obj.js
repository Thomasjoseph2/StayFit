import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Obj from "../utils/s3.js";

  const putS3Obj=async(key,type,buffer)=>{
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: type,
      };
    
      const command = new PutObjectCommand(params);
    
      await s3Obj.send(command);
  }

  export default putS3Obj