import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

// CHECKING FUNCTIONS
export const hasToken = async (req) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return false;
  }
  return true;
};

export const isAdmin = async (req) => {
  const token = await getToken({ req, secret });
  if (!token || token.user.role !== "admin") {
    return false;
  }
  return true;
};

export const getProfile = async (req) => {
  const token = await getToken({ req, secret });
  if (token && token.user) {
    return token.user;
  }
  return false;
};

// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return next(new Error("Not Allowed - Not logged in"));
  }
  next();
};
export const isAdminMiddleware = async (req, res, next) => {
  const token = await getToken({ req, secret });
  if (!token || token.user.role !== "admin") {
    return next(new Error("Not Allowed - Not admin"));
  }
  next();
};
