// Central utility to fetch data from db.json
// In production you'd replace this with API calls
import { API_ENDPOINTS } from "../config/api";

export async function getData(endpoint) {

  const res = await fetch(endpoint, { cache: "no-store" });
  console.log("API URL:", endpoint);
  if (!res.ok) throw new Error("Failed to load data GFJNGHJGHJH");
  return res.json();
}

// slug function
export async function getBySlug(endpoint, slug) {
  try {
    if (typeof endpoint !== "function") {
      throw new Error("getBySlug: endpoint must be a function");
    }
    if (!slug) {
      throw new Error("getBySlug: slug is required");
    }
    console.log(slug)
    const url = endpoint(slug);
    console.log(url);
    const res = await fetch(url, {
      cache: "no-store",
    });

    console.log("======", res)

    console.log("SLUG STATUS:", res.status);

    if (!res.ok) {
      throw new Error(`Slug API failed ${res.status}`);
    }

    const data = await res.json();

    // console.log("SLUG RESPONSE:", data);

    return data;

  } catch (error) {
    // console.error("getBySlug error:", error);
    throw error;
  }
}

// state wise slug function
export async function getByState(endpoint, serviceSlug, stateSlug) {
  try {
    if (typeof endpoint !== "function") {
      throw new Error("getByState: endpoint must be a function");
    }

    if (!serviceSlug || !stateSlug) {
      throw new Error("serviceSlug and stateSlug are required");
    }

    const url = endpoint(serviceSlug, stateSlug);

    console.log("STATE URL:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`State API failed ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("getByState error:", error);
    throw error;
  }
}


// City-level slug function
export async function getByCity(endpoint, serviceSlug, stateSlug, citySlug) {
  try {
    if (typeof endpoint !== "function") {
      throw new Error("getByCity: endpoint must be a function");
    }

    if (!serviceSlug || !stateSlug || !citySlug) {
      throw new Error("serviceSlug, stateSlug, and citySlug are required");
    }

    const url = endpoint(serviceSlug, stateSlug, citySlug);
    console.log("CITY URL:", url);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`City API failed ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("getByCity error:", error);
    throw error;
  }
}

export async function getServerData() {
  const { readFileSync } = await import("fs");
  const { join } = await import("path");
  const filePath = join(process.cwd(), "public", "db.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}
