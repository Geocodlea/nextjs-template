import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const data = await request.json();

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

    // Create a transporter with your email service provider's details
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: "GT Shop <noreply@gmail.com>",
      to: "geocodlea@yahoo.com",
      subject: "COMANDA REWARD SHOP",
      text: `Comanda trimisa de ${data.student}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false });
  }
}
