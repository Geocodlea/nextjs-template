import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const data = {};

  // Get all keys and values from the FormData object
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  const bytes = await data.image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/events/${data.image.name}`;
  await writeFile(path, buffer);

  await dbConnect();
  const event = new Event({
    ...data,
    image: data.image.name,
  });
  await event.save();

  return NextResponse.json({ success: true });
}
