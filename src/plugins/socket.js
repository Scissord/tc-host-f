import { io } from "socket.io-client";
const URL = process.env.NODE_ENV === "production"
  ? "https://api.talkcall-crm.com"
  : "http://localhost:8080";

export const socket = io(URL, {
  autoConnect: false,
  query: {
    user_id: null,
  }
});
