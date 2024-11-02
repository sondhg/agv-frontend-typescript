export interface Order {
  order_id: number;
  order_date: string;
  start_time: string;
  start_point: number;
  end_point: number;
  load_name: string;
  load_weight: number;
  load_amount: number;
}

export interface Agv {
  agv_id: string;
  max_battery: string;
  max_load: string;
  max_speed: string;
  guidance_type: string;
}

export interface AgvResponse {
  agv_id: number;
  max_battery: number;
  max_load: number;
  max_speed: number;
  guidance_type: string;
  error: string;
}

export interface LoginResponse {
  jwt: string;
  email: string;
  name: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}
