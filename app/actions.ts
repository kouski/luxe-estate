"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function togglePropertyFeatured(id: string, currentFeatured: boolean) {
  const { error } = await supabase
    .from("properties")
    .update({ featured: !currentFeatured })
    .eq("id", id);

  if (error) {
    console.error("Error toggling property featured state:", error.message);
    throw new Error("Failed to toggle featured state");
  }

  revalidatePath("/");
}
