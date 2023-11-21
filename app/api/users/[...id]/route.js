import dbConnect from "/utils/dbConnect";
import User from "/models/User";
import Account from "/models/Account";

import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const formData = await request.formData();
  const data = {};

  // Get all keys and values from the FormData object
  for (const [key, value] of formData.entries()) {
    if (value) data[key] = value;
  }

  if (data.image) {
    const bytes = await data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename using uuid
    const filename = `${uuidv4()}-${data.image.name}`;

    // Set up Google Cloud Storage client
    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
    });

    // Specify your Google Cloud Storage bucket name
    const bucketName = "geo_bucket_1"; // Replace with your actual bucket name
    const bucket = storage.bucket(bucketName);

    // Specify the GCS object (path) where the file will be stored
    const gcsObject = bucket.file(`uploads/users/${filename}`);

    // Create a write stream and upload the file to Google Cloud Storage
    const writeStream = gcsObject.createWriteStream({
      metadata: { contentType: data.image.type },
    });
    writeStream.end(buffer);

    // Update the data with the Google Cloud Storage URL or other relevant information
    data.image = `https://storage.googleapis.com/${bucketName}/uploads/users/${filename}`;
  }

  await dbConnect();
  await User.updateOne({ _id: params.id }, data);

  return NextResponse.json({ success: true });
}

export async function PUT(request, { params }) {
  const data = await request.json();

  await dbConnect();
  await User.updateOne({ _id: params.id }, data);

  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await User.deleteOne({ _id: params.id });

  await Account.deleteOne({ userId: params.id });

  return NextResponse.json({ success: true });
}
