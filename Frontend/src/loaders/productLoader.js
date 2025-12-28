import apiClient from "../api/apiClient";

export async function allProductsLoader() {
  const res = await apiClient.get("/products");
  return res.data;
}

export async function categoryLoader({ params }) {
  const res = await apiClient.get(`/products/category/${params.category}`);
  return res.data;
}
