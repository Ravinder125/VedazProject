import { io } from "socket.io-client";
import { baseURL } from "../api/axios";

export const socket = io(baseURL);