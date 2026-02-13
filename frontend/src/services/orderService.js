import api from "./api";

export const getOrdersApi = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const createOrderApi = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};
