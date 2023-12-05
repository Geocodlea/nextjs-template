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
      host: process.env.GT_MAIL_HOST,
      port: process.env.GT_MAIL_PORT,
      auth: {
        user: process.env.GT_MAIL_USERNAME,
        pass: process.env.GT_MAIL_PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: "GT Shop <hello@generatiatech.ro>",
      to: data.student,
      subject: "COMANDA REWARD SHOP",
      text: `Comanda trimisa de ${data.student}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false });
  }
}
