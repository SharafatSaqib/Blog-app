// utils/constants.js

export const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
    : process.env.API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  POSTS: `${BASE_URL}/api/posts`,
  USERS: `${BASE_URL}/api/users`,
  AUTH: `${BASE_URL}/api/auth`,
};
