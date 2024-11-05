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
  const { data } = await api.get(ORDERS_URL);
  return data;
};

const createOrder = async (order: CreateOrderDto): Promise<Order> => {
  // const response = await api.post(URL, order);
  // const { data } = response;
  const { data } = await api.post(ORDERS_URL, order); // 2 dòng bên trên tương đương với dòng này
  return data;
};

const updateOrder = async (
  order_id: number,
  order: CreateOrderDto,
): Promise<Order> => {
  const { data } = await api.put(`${ORDERS_URL}${order_id}/`, order);
  return data;
};

const deleteOrder = async (order_id: number) => {
  await api.delete(`${ORDERS_URL}${order_id}/`); // vì URL là /orders/ đã có dấu gạch ở cuối nên trong này ko để dấu gạch vào giữa như là `${URL}/${order_id}`
};

const postLogin = async (loginInfo: CreateLoginDto): Promise<LoginResponse> => {
  const { data } = await api.post(LOGIN_URL, loginInfo);
  return data;
};

const postRegister = async (
  registerInfo: CreateRegisterDto,
): Promise<RegisterResponse> => {
  const { data } = await api.post(REGISTER_URL, registerInfo);
  return data;
};

const postLogout = async (
  logoutInfo: CreateLogoutDto,
): Promise<LogoutResponse> => {
  const { data } = await api.post(LOGOUT_URL, logoutInfo);
  return data;
};

const getSchedules = async (): Promise<Schedule> => {
  const { data } = await api.get(SCHEDULES_URL);
  return data;
};

const getAGVs = async (): Promise<AGV[]> => {
  const { data } = await api.get(AGVS_URL);
  return data;
};

const postCreateAGV = async (agv: CreateAGVDto): Promise<AGV> => {
  const { data } = await api.post(AGVS_URL, agv);
  return data;
};

const deleteAGV = async (agv_id: number): Promise<void> => {
  await api.delete(`${AGVS_URL}${agv_id}/`);
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
  updateOrder,
};
