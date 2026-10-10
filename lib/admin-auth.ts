
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "embrione_admin_session";
const SESSION_DURATION = 60 * 60 * 8; // 8 hours

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be at least 32 characters long."
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession() {
  const secret = getSessionSecret();

  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(secret);
}

export async function verifyAdminSession(token: string) {
  try {
    const secret = getSessionSecret();
    const { payload } = await jwtVerify(token, secret);

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export { SESSION_COOKIE, SESSION_DURATION };
