import {
  Agv,
  AgvResponse,
  LoginResponse,
  Order,
  OrderResponse,
  RegisterResponse,
} from "@/types/types";
import axios from "../utils/axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng

const postCreateOrder = async (order: Order): Promise<OrderResponse> => {
  return await axios.post("/orders/", order);
  // return axios.post("/orders", { order: order }); // ! cách này thêm key là order trước object
};

const getAllOrders = () => {
  return axios.get("/orders/");
};

const putUpdateOrder = (order: Order) => {
  return axios.put(`/orders/${order.order_id}/`, order);
};

const deleteOrder = (orderId: number) => {
  return axios.delete(`/orders/${orderId}/`, { data: { order_id: orderId } });
};

const postLogin = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  return await axios.post("/login", { email, password });
};

const postRegister = async (
  email: string,
  password: string,
  name: string,
): Promise<RegisterResponse> => {
  return axios.post("/register", {
    email,
    password,
    name,
  });
};

const postLogout = (email: string, refresh_token: string) => {
  return axios.post("/logout", { email, refresh_token });
};

const getAllSchedules = () => {
  return axios.get("/schedules/");
};

const getAllAGVs = () => {
  return axios.get("/agvs/");
};

const postCreateAGV = async (agv: Agv): Promise<AgvResponse> => {
  return await axios.post("/agvs/", agv);
};

const deleteAGV = (agvId: number) => {
  return axios.delete(`/agvs/${agvId}/`, { data: { agv_id: agvId } });
};

export {
  // AGVs
  deleteAGV,
  getAllAGVs,
  // orders
  deleteOrder,
  getAllOrders,
  postCreateAGV,
  postCreateOrder,
  putUpdateOrder,
  // schedules
  getAllSchedules,
  // users
  postLogin,
  postLogout,
  postRegister,
};
