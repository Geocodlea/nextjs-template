import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  await dbConnect();

  //const body = await request.json();

  const formData = await request.text();

  //const data = await body.body;

  console.log(formData);

  // const event = new Event(body);
  // await event.save();

  return new Response(); //.json(event);
}
