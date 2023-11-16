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

  if (data.image) {
    const bytes = await data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `public/uploads/events/${data.image.name}`;

    // Ensure the directory exists
    await fs.ensureDir("public/uploads/events/");

    console.log("File path:", path);

    await writeFile(path, buffer);

    data.image = data.image.name;
  }

  await dbConnect();
  await Event.updateOne({ _id: params.id }, data);

  return NextResponse.json({ success: true });
}
