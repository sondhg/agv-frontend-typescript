import axios from "../utils/axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng

interface Order {
  order_id: number;
  order_date: string;
  start_time: string;
  start_point: number;
  end_point: number;
  load_name: string;
  load_weight: number;
  load_amount: number;
}

interface Agv {
  agv_id: number;
  max_battery: number;
  max_load: number;
  max_speed: number;
  guidance_type: string;
}

interface LoginResponse {
  jwt: string;
  email: string;
  name: string;
}

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

const postCreateOrder = (order: Order) => {
  return axios.post("/orders/", order);
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

const postCreateAGV = (agv: Agv) => {
  return axios.post("/agvs/", agv);
};

const deleteAGV = (agvId: number) => {
  return axios.delete(`/agvs/${agvId}/`, { data: { agv_id: agvId } });
};

export {
  // orders
  getAllOrders,
  deleteOrder,
  postCreateOrder,
  putUpdateOrder,

  // users
  postLogin,
  postRegister,
  postLogout,

  // schedules
  getAllSchedules,

  // AGVs
  getAllAGVs,
  postCreateAGV,
  deleteAGV,
};
