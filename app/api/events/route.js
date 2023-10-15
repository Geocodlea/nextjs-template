// import dbConnect from "/utils/dbConnect";
// import Event from "/models/Event";
// import formidable from "formidable";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request) {
//   await dbConnect();

//   //const body = await request.json();

//   const formData = await request.formData();
//   //const data = await body.body;

//   console.log(formData.get("image"));

//   // const event = new Event(body);
//   // await event.save();

//   return new Response(); //.json(event);
// }

import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("image");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `public/uploads/events/${file.name}`;
  await writeFile(path, buffer);

  return NextResponse.json({ success: true });
}
