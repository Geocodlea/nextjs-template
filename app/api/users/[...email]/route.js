import dbConnect from "/utils/dbConnect";
import User from "/models/User";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const data = await request.json();

  await dbConnect();
  await User.updateOne({ email: params.email }, data);

  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await User.deleteOne({ email: params.email });

  return NextResponse.json({ success: true });
}
