import { supabase } from "./supabase";

export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  price_suffix: string | null;
  beds: number;
  baths: number;
  area: string;
  image_url: string;
  image_alt: string;
  tag: string | null;
  featured: boolean;
  created_at: string;
  slug?: string;
  images?: string[];
};

const DEFAULT_PAGE_SIZE = 6;

/**
 * Fetch a paginated list of non-featured properties.
 */
export async function getProperties(
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<{ data: Property[]; total: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("featured", false)
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching properties:", error.message);
    return { data: [], total: 0 };
  }

  return { data: data ?? [], total: count ?? 0 };
}

/**
 * Fetch all featured properties (small fixed set).
 */
export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching featured properties:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Fetch a single property by its unique slug.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching property by slug:", error.message);
    return null;
  }

  return data;
}
