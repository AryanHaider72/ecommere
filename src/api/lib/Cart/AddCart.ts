"use server";

import { CartData } from "@/api/types/Cart/CartData";
import { cookies } from "next/headers";

export async function addToServerCart(item: CartData[]) {
  const cookieStore = await cookies();
  cookieStore.set("cart", JSON.stringify(item), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { success: true };
}

export async function getServerCart() {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart")?.value;
  return cart ? JSON.parse(cart) : [];
}

export async function clearServerCart() {
  const cookieStore = await cookies();
  cookieStore.set("cart", "", {
    path: "/",
    maxAge: 0,
  });
  return [];
}
