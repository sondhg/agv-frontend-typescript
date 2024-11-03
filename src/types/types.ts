export interface IOrder {
  order_id: string;
  order_date: string;
  start_time: string;
  start_point: string;
  end_point: string;
  load_name: string;
  load_weight: string;
  load_amount: string;
}

export interface IOrderResponse {
  order_id: number;
  order_date: string;
  start_time: string;
  start_point: number;
  end_point: number;
  load_name: string;
  load_weight: number;
  load_amount: number;
  error: string;
}

export interface IAgv {
  agv_id: string;
  max_battery: string;
  max_load: string;
  max_speed: string;
  guidance_type: string;
}

export interface IAgvResponse {
  agv_id: number;
  max_battery: number;
  max_load: number;
  max_speed: number;
  guidance_type: string;
  error: string;
}

export interface ILoginResponse {
  jwt: string;
  email: string;
  name: string;
}

export interface IRegisterResponse {
  id: number;
  name: string;
  email: string;
}

export interface ISchedule {
  schedule_id: number;
  order_id: number;
  order_date: string;
  est_start_time: string;
  est_end_time: string;
  start_point: number;
  end_point: number;
  load_name: string;
  load_amount: number;
  load_weight: number;
}
