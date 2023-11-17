import * as fs from "node:fs/promises";

const base64EncodedString = process.env.GOOGLE_CLOUD_KEY_FILE_ENCODED;
const decodedBuffer = Buffer.from(base64EncodedString, "base64");
const decodedString = decodedBuffer.toString("utf-8");

fs.writeFileSync("secrets/google-cloud-key.json", decodedString);
