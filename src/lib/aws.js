import AWS from 'aws-sdk';
import { AWS_REGION, AWS_S3_BUCKET } from './config';

AWS.config.update({ region: AWS_REGION });

export const s3 = new AWS.S3({
  params: {
    Bucket: AWS_S3_BUCKET,
  },
});
