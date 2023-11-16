import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";

export async function PATCH(request, { params }) {
  const formData = await request.formData();
  const data = {};

  // Get all keys and values from the FormData object
  for (const [key, value] of formData.entries()) {
    if (value) data[key] = value;
  }

  console.log("TEST NETLIFY");

  if (data.image) {
    console.log("File upload started");

    const bytes = await data.image.arrayBuffer();
    console.log("File bytes received");

    const buffer = Buffer.from(bytes);

    // Adjust the directory path based on the actual structure on Netlify
    const directoryPath = path.join(process.cwd(), ".next/uploads/events/");
    const filePath = path.join(directoryPath, data.image.name);

    try {
      // Ensure the directory exists
      await fs.ensureDir(directoryPath);

      // Write the file
      await writeFile(filePath, buffer);
      console.log("File written successfully");

      data.image = data.image.name;
    } catch (error) {
      console.error("Error during file upload:", error);
      return NextResponse.error("Internal Server Error", 500);
    }
  }

  await dbConnect();
  await Event.updateOne({ _id: params.id }, data);

  console.log("Update operation completed");

  return NextResponse.json({ success: true });
}
