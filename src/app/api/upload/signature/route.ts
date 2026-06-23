import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        message: "Cloudinary environment variables are not configured."
      },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "recipehub";
  const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature
  });
}
