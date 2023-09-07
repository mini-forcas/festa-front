import { createClient } from "@supabase/supabase-js";
import { io } from "socket.io-client";

const host = "http://localhost";
const port = 5000;
export const socket = io(`${host}:${port}`);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);
