import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

import path from "path";

export async function PATCH(request, { params }) {
  const formData = await request.formData();
  const data = {};

  // Get all keys and values from the FormData object
  for (const [key, value] of formData.entries()) {
    if (value) data[key] = value;
  }

  const filePath = path.join(process.cwd(), "secrets/google-cloud-key.json");
  console.log(filePath);

  if (data.image) {
    const bytes = await data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename using uuid
    const filename = `${uuidv4()}-${data.image.name}`;

    // Set up Google Cloud Storage client
    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE_PATH,
    });

    // Specify your Google Cloud Storage bucket name
    const bucketName = "geo_bucket_1"; // Replace with your actual bucket name
    const bucket = storage.bucket(bucketName);

    // Specify the GCS object (path) where the file will be stored
    const gcsObject = bucket.file(`uploads/events/${filename}`);

    // Create a write stream and upload the file to Google Cloud Storage
    const writeStream = gcsObject.createWriteStream({
      metadata: { contentType: data.image.type },
    });
    writeStream.end(buffer);

    // Update the data with the Google Cloud Storage URL or other relevant information
    data.image = `https://storage.googleapis.com/${bucketName}/uploads/events/${filename}`;
  }

  await dbConnect();
  await Event.updateOne({ _id: params.id }, data);

  return NextResponse.json({ success: true });
}
