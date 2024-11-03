import {
  IAgv,
  IAgvResponse,
  ILoginResponse,
  IOrder,
  IOrderResponse,
  IRegisterResponse,
} from "@/types/types";
import axios from "../utils/axiosCustomize";

const postCreateOrder = async (order: IOrder): Promise<IOrderResponse> => {
  try {
    return await axios.post("/orders/", order); // Awaiting the axios call
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const getAllOrders = async (): Promise<IOrderResponse[]> => {
  try {
    return await axios.get("/orders/"); // Awaiting the axios call
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const putUpdateOrder = async (order: IOrder): Promise<IOrderResponse> => {
  try {
    return await axios.put(`/orders/${order.order_id}/`, order); // Awaiting the axios call
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await axios.delete(`/orders/${orderId}/`); // Awaiting the axios call
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

const postLogin = async (
  email: string,
  password: string,
): Promise<ILoginResponse> => {
  try {
    return await axios.post("/login", { email, password }); // Awaiting the axios call
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const postRegister = async (
  email: string,
  password: string,
  name: string,
): Promise<IRegisterResponse> => {
  try {
    return await axios.post("/register", { email, password, name }); // Awaiting the axios call
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const postLogout = async (
  email: string,
  refresh_token: string,
): Promise<void> => {
  try {
    await axios.post("/logout", { email, refresh_token }); // Awaiting the axios call
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const getAllSchedules = async (): Promise<unknown> => {
  // Adding a return type
  try {
    return await axios.get("/schedules/"); // Awaiting the axios call
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

const getAllAGVs = async (): Promise<IAgvResponse[]> => {
  try {
    return await axios.get("/agvs/"); // Awaiting the axios call
  } catch (error) {
    console.error("Error fetching AGVs:", error);
    throw error;
  }
};

const postCreateAGV = async (agv: IAgv): Promise<IAgvResponse> => {
  try {
    return await axios.post("/agvs/", agv); // Awaiting the axios call
  } catch (error) {
    console.error("Error creating AGV:", error);
    throw error;
  }
};

const deleteAGV = async (agvId: number): Promise<void> => {
  try {
    await axios.delete(`/agvs/${agvId}/`); // Awaiting the axios call
  } catch (error) {
    console.error("Error deleting AGV:", error);
    throw error;
  }
};

export {
  deleteAGV,
  getAllAGVs,
  deleteOrder,
  getAllOrders,
  postCreateAGV,
  postCreateOrder,
  putUpdateOrder,
  getAllSchedules,
  postLogin,
  postLogout,
  postRegister,
};
