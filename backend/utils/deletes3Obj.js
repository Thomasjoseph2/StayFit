import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Obj from "../utils/s3.js";



const deletes3Obj=async(key)=>{

    const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
    
      await s3Obj.send(deleteCommand);

}

export default deletes3Obj;