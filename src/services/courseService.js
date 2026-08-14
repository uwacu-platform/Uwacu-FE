/**
 * UWACU Course Service
 * Wraps all /api/courses/* endpoints from the Postman collection.
 */

import { api } from "./api.js";

/**
 * Get all courses.
 * GET /api/courses/
 */
export async function getAllCourses() {
  return api.get("/courses/");
}

/**
 * Get a single course by ID.
 * GET /api/courses/:id
 * @param {string|number} courseId
 */
export async function getCourse(courseId) {
  return api.get(`/courses/${courseId}`);
}

/**
 * Create a new course (instructor only).
 * POST /api/courses/
 * Sends multipart/form-data because the API accepts a thumbnail file.
 * @param {{ title: string, description: string, price: string|number, thumbnail?: File }} courseData
 */
export async function createCourse({ title, description, price, thumbnail }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", String(price));
  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }
  return api.post("/courses/", formData);
}

/**
 * Enroll the authenticated user in a course.
 * POST /api/courses/:id/enroll
 * @param {string|number} courseId
 */
export async function enrollInCourseAPI(courseId) {
  return api.post(`/courses/${courseId}/enroll`, {});
}
