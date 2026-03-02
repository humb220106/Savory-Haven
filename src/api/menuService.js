// src/api/menuService.js
// Matches: GET /api/categories | GET /api/dishes | GET /api/dishes/featured
import { apiGet } from "./apiClient";

export async function getCategories() {
  return await apiGet("/categories");
}

export async function getDishesByCategory(categorySlug) {
  return await apiGet(`/dishes?categorySlug=${categorySlug}`);
}

export async function getFeaturedDishes() {
  return await apiGet("/dishes/featured");
}

export async function getDishById(id) {
  return await apiGet(`/dishes/${id}`);
}
