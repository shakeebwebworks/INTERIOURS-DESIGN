// In development this is "/api" (proxied to Django by Vite).
// In production, set VITE_API_BASE_URL to the deployed API address.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, { status = 0, fieldErrors = {} } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors; // e.g. { email: "Enter a valid email address." }
  }
}

function parseErrorPayload(status, data) {
  if (status === 429) {
    return new ApiError("Too many requests. Please wait a while and try again.", { status });
  }

  if (status === 400 && data && typeof data === "object") {
    const fieldErrors = {};
    let formMessage = "";

    for (const [key, value] of Object.entries(data)) {
      const text = Array.isArray(value) ? value[0] : String(value);
      if (key === "non_field_errors" || key === "detail") {
        formMessage = text;
      } else {
        fieldErrors[key] = text;
      }
    }

    return new ApiError(formMessage || "Please check the highlighted fields and try again.", {
      status,
      fieldErrors,
    });
  }

  return new ApiError("Something went wrong on our side. Please try again shortly.", { status });
}

async function request(path, { method = "GET", body, signal } = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      signal,
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error; // component unmounted, not a real failure
    throw new ApiError("Unable to reach the server. Please check your connection and try again.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw parseErrorPayload(response.status, data);
  }

  return data;
}

// ---------- Public API functions ----------

export const getServices = ({ signal } = {}) => request("/services/", { signal });

export const getProjects = ({ featured = false, signal } = {}) =>
  request(`/projects/${featured ? "?featured=true" : ""}`, { signal });

export const getProject = (slug, { signal } = {}) =>
  request(`/projects/${encodeURIComponent(slug)}/`, { signal });

export const submitConsultation = (payload) =>
  request("/consultations/", { method: "POST", body: payload });