import { env } from "@/env";
import { Helius } from "helius-sdk";

export const helius = new Helius(env.NEXT_PUBLIC_RPC_KEY);
