import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function encode(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function decode(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.log("Jwt Decode Error : ", error)
    return null;
  }
}
