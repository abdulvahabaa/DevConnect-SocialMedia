import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/s3config.mjs";

dotenv.config();

const BucketName = process.env.BUCKET_NAME;

const randomImagName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const uploadTos3 = async (req) => {
  const imageName = randomImagName();
  const buffer = await sharp(req.buffer).toBuffer();
  const params = {
    Bucket: BucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);
  return imageName;
};

export const getFromS3 = async (image) => {
  try {
    const getObjectParams = {
      Bucket: BucketName,
      Key: image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 10000 });
    return url;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteFromS3 = async (imageName) => {
  try {
    const params = {
      Bucket: BucketName,
      Key: imageName,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    return { status: true, msg: "successfully deleted" };
  } catch (err) {
    return { status: false, msg: err.message };
  }
};
