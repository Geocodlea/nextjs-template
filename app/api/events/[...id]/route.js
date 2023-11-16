import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const formData = await request.formData();
  const data = {};

  // Get all keys and values from the FormData object
  for (const [key, value] of formData.entries()) {
    if (value) data[key] = value;
  }

  console.log(data);

  if (data.image) {
    const bytes = await data.image.arrayBuffer();

    console.log(bytes);

    const buffer = Buffer.from(bytes);

    console.log(bytes);

    const path = `public/uploads/events/${data.image.name}`;
    await writeFile(path, buffer);

    data.image = data.image.name;
  }

  await dbConnect();
  await Event.updateOne({ _id: params.id }, data);

  return NextResponse.json({ success: true });
}
