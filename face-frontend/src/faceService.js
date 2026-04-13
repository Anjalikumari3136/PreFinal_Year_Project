// ── All API calls to the Python AI Face Service ──────────────
const FACE_API = "http://localhost:5001";

/**
 * Register a student's face
 * @param {string} studentId - The student's ID
 * @param {string[]} images   - Array of base64 image strings (min 3, max 5)
 * @returns {Promise<{success, message, photosUsed, model}>}
 */
export const registerFaceAI = async (studentId, images) => {
  const res = await fetch(`${FACE_API}/register-face`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, images }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
};

/**
 * Login with face
 * @param {string} imageBase64 - Single base64 image
 * @returns {Promise<{success, studentId, confidence, model}>}
 */
export const loginFaceAI = async (imageBase64) => {
  const res = await fetch(`${FACE_API}/login-face`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageBase64 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Face not recognized");
  return data;
};

/**
 * Check if a student has registered their face
 * @param {string} studentId
 * @returns {Promise<boolean>}
 */
export const checkFaceStatus = async (studentId) => {
  const res = await fetch(`${FACE_API}/face-status/${studentId}`);
  const data = await res.json();
  return data.faceRegistered;
};

/**
 * Delete a student's face data
 * @param {string} studentId
 */
export const deleteFaceAI = async (studentId) => {
  const res = await fetch(`${FACE_API}/delete-face/${studentId}`, {
    method: "DELETE",
  });
  return res.json();
};

/**
 * Check if AI server is running
 * @returns {Promise<boolean>}
 */
export const checkServerHealth = async () => {
  try {
    const res = await fetch(`${FACE_API}/health`);
    const data = await res.json();
    return data.status === "running";
  } catch {
    return false;
  }
};
