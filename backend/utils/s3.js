import { S3Client} from "@aws-sdk/client-s3";

const s3Obj = new S3Client({
    region: process.env.AWS_REGION,
  
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
  
      secretAccessKey: process.env.SECREAT_ACCESS_KEY,
    },
  });

  export default s3Obj