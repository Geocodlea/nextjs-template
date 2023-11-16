import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

const fs = require("fs-extra");

export async function PATCH(request, { params }) {
  const formData = await request.formData();
  const data = {};

  // Get all keys and values from the FormData object
  for (const [key, value] of formData.entries()) {
    if (value) data[key] = value;
  }

  console.log("TEST NETLIFY !!!!!!!!!!!!!!!!!");

  if (data.image) {
    console.log("File upload started");

    try {
      const bytes = await data.image.arrayBuffer();
      console.log("File bytes received");

      const buffer = Buffer.from(bytes);
      const path = `public/uploads/events/${data.image.name}`;

      await writeFile(path, buffer);
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
