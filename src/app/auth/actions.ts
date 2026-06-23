"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInWithKakao(formData: FormData) {
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";
  await signIn("kakao", { redirectTo: callbackUrl });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}
