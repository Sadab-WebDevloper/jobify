let BASEURI = import.meta.env.VITE_BASEURI || "http://localhost:8000/api/v1/";

// Auto-fix the URL if it's missing the protocol or /api/v1/
if (!BASEURI.startsWith("http")) {
  BASEURI = `https://${BASEURI}`;
}
if (!BASEURI.endsWith("/")) {
  BASEURI = `${BASEURI}/`;
}
if (!BASEURI.includes("/api/v1/")) {
  BASEURI = `${BASEURI}api/v1/`;
}

export const USER_API_END_POINT = `${BASEURI}user`;
export const JOB_API_END_POINT = `${BASEURI}job`;
export const COMPANY_API_END_POINT = `${BASEURI}company`;
export const APPLICATION_API_END_POINT = `${BASEURI}application`;
