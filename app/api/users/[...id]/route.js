import dbConnect from "/utils/dbConnect";
import User from "/models/User";
import { writeFile } from "fs/promises";
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
    const path = `public/uploads/users/${data.image.name}`;
    await writeFile(path, buffer);

    data.image = data.image.name;
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

  return NextResponse.json({ success: true });
}
