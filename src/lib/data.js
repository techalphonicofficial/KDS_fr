// Central utility to fetch data from db.json
// In production you'd replace this with API calls
import { API_ENDPOINTS } from "../config/api";

const memoryCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function fetchWithCache(url) {
  const now = Date.now();
  if (memoryCache.has(url)) {
    const cached = memoryCache.get(url);
    if (now - cached.timestamp < CACHE_TTL) {
      // console.log("CACHE HIT:", url);
      return cached.data;
    } else {
      memoryCache.delete(url);
    }
  }

  // console.log("FETCHING NEW DATA:", url);
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`API failed ${res.status}`);
  const data = await res.json();
  memoryCache.set(url, { data, timestamp: now });
  return data;
}

export async function getData(endpoint) {
  return await fetchWithCache(endpoint);
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
    return await fetchWithCache(url);

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

    return await fetchWithCache(url);

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

    return await fetchWithCache(url);
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
