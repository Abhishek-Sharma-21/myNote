export const cookieOptions = {
  httpOnly: true,
  secure: true, // REQUIRED on HTTPS
  sameSite: "none", // REQUIRED for cross-domain
  maxAge: 10 * 24 * 60 * 60 * 1000,
};
