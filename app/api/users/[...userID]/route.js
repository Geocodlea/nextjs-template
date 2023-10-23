import dbConnect from "/utils/dbConnect";
import User from "/models/User";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const data = await request.json();

  await dbConnect();
  await User.updateOne({ userID: params.userID }, data);

  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await User.deleteOne({ userID: params.userID });

  return NextResponse.json({ success: true });
}
