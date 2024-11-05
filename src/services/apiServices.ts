import { AGV, CreateAGVDto } from "@/types/AGV.types";
import { Schedule } from "@/types/Schedule.types";
import {
  CreateLoginDto,
  CreateLogoutDto,
  CreateRegisterDto,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
} from "../types/Auth.types";
import { CreateOrderDto, Order } from "../types/Order.types";
import api from "../utils/axiosCustomize";

const ORDERS_URL = "/orders/";
const LOGIN_URL = "/login";
const REGISTER_URL = "/register";
const LOGOUT_URL = "/logout";
const SCHEDULES_URL = "/schedules/";
const AGVS_URL = "/agvs/";

const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await api.get(ORDERS_URL);
    return data;
  } catch (error) {
    console.error(">>> Error fetching orders:", error);
    throw new Error(">>> Failed to fetch orders");
  }
};

const createOrder = async (order: CreateOrderDto): Promise<Order> => {
  try {
    const { data } = await api.post(ORDERS_URL, order);
    return data;
  } catch (error) {
    console.error(">>> Error creating order:", error);
    throw new Error(">>> Failed to create order");
  }
};

const updateOrder = async (
  order_id: number,
  order: CreateOrderDto,
): Promise<Order> => {
  try {
    const { data } = await api.put(`${ORDERS_URL}${order_id}/`, order);
    return data;
  } catch (error) {
    console.error(">>> Error updating order:", error);
    throw new Error(">>> Failed to update order");
  }
};

const deleteOrder = async (order_id: number) => {
  try {
    await api.delete(`${ORDERS_URL}${order_id}/`);
  } catch (error) {
    console.error(">>> Error deleting order:", error);
    throw new Error(">>> Failed to delete order");
  }
};

const postLogin = async (loginInfo: CreateLoginDto): Promise<LoginResponse> => {
  try {
    const { data } = await api.post(LOGIN_URL, loginInfo);
    return data;
  } catch (error) {
    console.error(">>> Error logging in:", error);
    throw new Error(">>> Failed to log in");
  }
};

const postRegister = async (
  registerInfo: CreateRegisterDto,
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post(REGISTER_URL, registerInfo);
    return data;
  } catch (error) {
    console.error(">>> Error registering:", error);
    throw new Error(">>> Failed to register");
  }
};

const postLogout = async (
  logoutInfo: CreateLogoutDto,
): Promise<LogoutResponse> => {
  try {
    const { data } = await api.post(LOGOUT_URL, logoutInfo);
    return data;
  } catch (error) {
    console.error(">>> Error logging out:", error);
    throw new Error(">>> Failed to log out");
  }
};

const getSchedules = async (): Promise<Schedule> => {
  try {
    const { data } = await api.get(SCHEDULES_URL);
    return data;
  } catch (error) {
    console.error(">>> Error fetching schedules:", error);
    throw new Error(">>> Failed to fetch schedules");
  }
};

const getAGVs = async (): Promise<AGV[]> => {
  try {
    const { data } = await api.get(AGVS_URL);
    return data;
  } catch (error) {
    console.error(">>> Error fetching AGVs:", error);
    throw new Error(">>> Failed to fetch AGVs");
  }
};

const postCreateAGV = async (agv: CreateAGVDto): Promise<AGV> => {
  try {
    const { data } = await api.post(AGVS_URL, agv);
    return data;
  } catch (error) {
    console.error(">>> Error creating AGV:", error);
    throw new Error(">>> Failed to create AGV");
  }
};

const deleteAGV = async (agv_id: number): Promise<void> => {
  try {
    await api.delete(`${AGVS_URL}${agv_id}/`);
  } catch (error) {
    console.error(">>> Error deleting AGV:", error);
    throw new Error(">>> Failed to delete AGV");
  }
};

export {
  createOrder,
  deleteAGV,
  deleteOrder,
  getAGVs,
  getOrders,
  getSchedules,
  postCreateAGV,
  postLogin,
  postLogout,
  postRegister,
  updateOrder
};

