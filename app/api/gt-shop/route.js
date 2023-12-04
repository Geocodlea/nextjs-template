import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  console.log(data);

  try {
    const response = await fetch(
      `https://api.xperiencify.io/api/public/student/customfield/?api_key=${process.env.GT_SHOP_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false });
  }
}
