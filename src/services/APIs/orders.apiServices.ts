import api from "@/utils/axiosCustomize";
import { CreateOrderDto, Order } from "@/types/Order.types";

const ORDERS_URL = "/orders";

const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await api.get(`${ORDERS_URL}/`);
    return data;
  } catch (error) {
    console.error(">>> Error fetching orders:", error);
    throw new Error(">>> Failed to fetch orders");
  }
};

const createOrder = async (order: CreateOrderDto): Promise<Order> => {
  try {
    const { data } = await api.post(`${ORDERS_URL}/`, order);
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
    const { data } = await api.put(`${ORDERS_URL}/${order_id}/`, order);
    return data;
  } catch (error) {
    console.error(">>> Error updating order:", error);
    throw new Error(">>> Failed to update order");
  }
};

const deleteOrder = async (order_id: number) => {
  try {
    await api.delete(`${ORDERS_URL}/${order_id}/`);
  } catch (error) {
    console.error(">>> Error deleting order:", error);
    throw new Error(">>> Failed to delete order");
  }
};

export { createOrder, deleteOrder, getOrders, updateOrder };
