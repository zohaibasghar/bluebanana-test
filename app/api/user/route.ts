import { NextApiRequest } from "next";

export function GET(req: NextApiRequest) {
  return Response.json({ message: "Hello from Zohaib!" });
}
