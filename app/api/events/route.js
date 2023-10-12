import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  const event = new Event(body);
  await event.save();

  return Response.json(event);
}
